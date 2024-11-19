from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"profiles", ProfileViewSet, basename="profile")

urlpatterns = [
    path("", include(router.urls)),
]

# This will create the following URLs:

# Users:
# POST /users/token/ - refresh token
# POST /users/login/ - user login
# POST /users/register/ - user registration
# GET /users/me/ - get current user
# GET /users/google_callback/ - Google OAuth callback

# Profiles:
# GET /profiles/ - list profiles (filtered to user's own)
# GET /profiles/{id}/ - retrieve specific profile
# PATCH /profiles/{id}/ - update specific profile
# GET /profiles/me/ - get current user's profile
# PATCH /profiles/update_me/ - update current user's profile
