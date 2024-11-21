from django.contrib.auth import login
from django.contrib import auth
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, viewsets, mixins, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


from .models import Profile
from .serializers import (
    TokenSerializer,
    UserLoginSerializer,
    UserRegisterSerializer,
    UserSerializer,
    ProfileSerializer,
)
from .services import GoogleRawLoginFlowService
from .utils import send_invite_email


class UserViewSet(
    viewsets.GenericViewSet, mixins.RetrieveModelMixin, mixins.UpdateModelMixin
):
    """
    ViewSet for handling user-related operations.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == "login":
            return UserLoginSerializer
        elif self.action == "register":
            return UserRegisterSerializer
        elif self.action == "token":
            return TokenSerializer
        return super().get_serializer_class()

    def get_permissions(self):
        if self.action in ["login", "register", "token", "google_callback"]:
            return [permissions.AllowAny()]
        return super().get_permissions()

    @swagger_auto_schema(
        operation_description="Refresh access token using refresh token",
        request_body=TokenSerializer,
        responses={
            200: TokenSerializer,
            400: "Invalid refresh token",
            401: "Token has expired or is invalid",
        },
    )
    @action(detail=False, methods=["post"])
    def token(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Login user and return access and refresh tokens",
        request_body=UserLoginSerializer,
        responses={
            200: UserLoginSerializer,
            400: "Invalid credentials",
            401: "Authentication failed",
        },
    )
    @action(detail=False, methods=["post"])
    def login(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Register a new user",
        request_body=UserRegisterSerializer,
        responses={
            201: UserRegisterSerializer,
            400: "Invalid data or user already exists",
        },
    )
    @action(detail=False, methods=["post"])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            with transaction.atomic():
                user = serializer.save()
                user.send_invite_email()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        operation_description="Get current user profile",
        responses={
            200: UserSerializer,
            401: "Authentication credentials were not provided",
        },
    )
    @action(detail=False, methods=["get"])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="google/redirect")
    def google_redirect(self, request, **kwargs):
        flow = GoogleRawLoginFlowService()
        authorization_url, state = flow.get_authorization_url()
        request.session["google_oauth2_state"] = state
        return redirect(authorization_url)

    @action(detail=False, methods=["get"])
    def google_login(self, request, **kwargs):
        data = request.GET.dict() or request.data
        serializer = self.get_serializer_class()(
            data=data, context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        auth.login(request, user)
        token = RefreshToken.for_user(user)
        return redirect(f"{serializer.validated_data['redirect_uri']}?token={token}")

class ProfileViewSet(
    viewsets.GenericViewSet,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.ListModelMixin,
):
    """
    ViewSet for handling profile-related operations.
    """

    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # If action is 'list', only return the user's profile
        if self.action == "list":
            return self.queryset.filter(user=self.request.user)
        return self.queryset

    @swagger_auto_schema(
        operation_description="Get current user's profile",
        responses={
            200: ProfileSerializer,
            401: "Authentication credentials were not provided",
            404: "Profile not found",
        },
    )
    @action(detail=False, methods=["get"])
    def me(self, request):
        try:
            profile = self.queryset.get(user=request.user)
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
            )

    @swagger_auto_schema(
        operation_description="Update current user's profile",
        request_body=ProfileSerializer,
        responses={
            200: ProfileSerializer,
            400: "Invalid data",
            401: "Authentication credentials were not provided",
            404: "Profile not found",
        },
    )
    @action(detail=False, methods=["patch"])
    def update_me(self, request):
        try:
            profile = self.queryset.get(user=request.user)
            serializer = self.get_serializer(profile, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response(
                {"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
