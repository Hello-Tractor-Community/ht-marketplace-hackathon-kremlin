from django.contrib.auth import login
from django.contrib.auth.models import User
from django.shortcuts import redirect
from django.db import transaction
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
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
    GoogleCallbackSerializer,
)


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

    @swagger_auto_schema(
        operation_description="Handle Google OAuth2 callback",
        manual_parameters=[
            openapi.Parameter(
                "code",
                openapi.IN_QUERY,
                description="Authorization code from Google",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "state",
                openapi.IN_QUERY,
                description="State parameter for CSRF protection",
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "error",
                openapi.IN_QUERY,
                description="Error message from Google",
                type=openapi.TYPE_STRING,
            ),
        ],
        responses={
            200: "Login successful",
            400: "Invalid request or authentication failed",
            401: "CSRF check failed",
        },
    )
    @action(detail=False, methods=["get"])
    def google_callback(self, request):
        serializer = GoogleCallbackSerializer(
            data=request.query_params, context={"request": request}
        )
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            login(request, user)

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            # Redirect to frontend with token
            redirect_url = f"{request.session.get('frontend_redirect_url', '/')}?token={access_token}"
            return redirect(redirect_url)
        except Exception as e:
            error_redirect = (
                f"{request.session.get('frontend_redirect_url', '/')}?error={str(e)}"
            )
            return redirect(error_redirect)


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
