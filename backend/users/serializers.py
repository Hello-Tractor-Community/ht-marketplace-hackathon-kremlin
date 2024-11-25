import logging

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from users.selectors import get_user
from users.services import GoogleRawLoginFlowService
from users.types import GenericToken

from .models import Profile

logger = logging.getLogger(__name__)


class TokenSerializer(serializers.Serializer):
    access = serializers.CharField(required=False, read_only=True)
    refresh = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        token = RefreshToken(data["refresh"])
        data["access"] = str(token.access_token)
        return data


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(required=True, write_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        user = authenticate(username=username, email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        self.user = user
        return data

    def save(self, **kwargs):
        return self.user

    def get_token(self, obj) -> GenericToken:
        token = RefreshToken.for_user(self.user)
        return GenericToken(access=str(token.access_token), refresh=str(token))


class UserRegisterSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    token = serializers.SerializerMethodField(read_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        username = data.get("username")
        email = data.get("email")

        if _ := get_user(email, username=username):
            raise serializers.ValidationError("User with this email already exists")
        with transaction.atomic():
            self.user = User.objects.create_user(**data)
            Profile.objects.create(
                user=self.user,
            )
        return data

    def save(self, **kwargs: dict):
        return self.user

    def get_token(self, obj) -> GenericToken:
        token = RefreshToken.for_user(self.user)
        return GenericToken(access=str(token.access_token), refresh=str(token))


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "pk",
            "username",
            "email",
            "first_name",
            "last_name",
            "profile_picture",
        ]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile_picture = serializers.SerializerMethodField()

    def get_profile_picture(self, obj):
        return obj.profile_picture

    class Meta:
        model = Profile
        fields = ["uid", "user", "profile_picture", "metadata", "created", "modified"]


class GoogleCallbackSerializer(serializers.Serializer):
    code = serializers.CharField(required=False, write_only=True)
    error = serializers.CharField(required=False, write_only=True)
    state = serializers.CharField(required=False, write_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)

        if error := data.get("error"):
            raise serializers.ValidationError(error)

        code = data.get("code")
        state = data.get("state")

        if not code or not state:
            raise serializers.ValidationError("code and state are required")

        session_state = self.context["request"].session.get("google_oauth2_state")
        if not session_state:
            raise serializers.ValidationError("CSRF check failed")
        del self.context["request"].session["google_oauth2_state"]

        if state != session_state:
            raise serializers.ValidationError("CSRF check failed")

        self.code = code
        return data

    @transaction.atomic
    def save(self, **kwargs):
        flow = GoogleRawLoginFlowService()
        auth_tokens = flow.get_tokens(code=self.code)

        id_token_decoded = auth_tokens.decode_id_token()
        user_info = flow.get_user_info(auth_token=auth_tokens)

        user_email = id_token_decoded["email"]
        user = get_user(email=user_email)
        if not user:
            first_name = user_info["given_name"]
            last_name = user_info["family_name"]
            user = User.objects.create_user(
                email=user_email,
                username=user_email.split("@")[0],
                first_name=first_name,
                last_name=last_name,
                password=User.objects.make_random_password(),
            )
            Profile.objects.create(user=user, metadata=user_info)
            return user
        if not hasattr(user, "profile"):
            Profile.objects.create(user=user, metadata=user_info)
        if not user.profile.metadata:
            user.profile.metadata = user_info
            user.profile.save()
        return user
