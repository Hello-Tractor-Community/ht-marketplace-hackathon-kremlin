from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    TractorListingViewSet,
    AgriImplementViewSet,
    OperatorProfileViewSet,
    ConversationViewSet,
    MessageViewSet,
)

router = DefaultRouter()
router.register(r"tractor-listings", TractorListingViewSet)
router.register(r"agri-implements", AgriImplementViewSet)
router.register(r"operator-profiles", OperatorProfileViewSet)
router.register(r"conversations", ConversationViewSet)
router.register(r"messages", MessageViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
