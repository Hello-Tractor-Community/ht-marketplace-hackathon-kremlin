from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    TractorListing,
    AgriImplement,
    OperatorProfile,
    Conversation,
    Message,
)
from .serializers import (
    TractorListingSerializer,
    AgriImplementSerializer,
    OperatorProfileSerializer,
    ConversationSerializer,
    MessageSerializer,
)


class IsSellerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.seller.user == request.user


class TractorListingViewSet(viewsets.ModelViewSet):
    queryset = TractorListing.objects.all()
    serializer_class = TractorListingSerializer
    permission_classes = [IsSellerOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["brand", "model", "year", "price", "condition", "location"]
    search_fields = ["brand", "model", "description"]
    ordering_fields = ["price", "year", "created_at"]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user.profile)

    def perform_update(self, serializer):
        serializer.save(seller=self.request.user.profile)


class AgriImplementViewSet(viewsets.ModelViewSet):
    queryset = AgriImplement.objects.all()
    serializer_class = AgriImplementSerializer
    permission_classes = [IsSellerOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "name",
        "implement_type",
        "brand",
        "price",
        "condition",
        "location",
    ]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "created_at"]


class OperatorProfileViewSet(viewsets.ModelViewSet):
    queryset = OperatorProfile.objects.all()
    serializer_class = OperatorProfileSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["location", "experience_years", "is_verified"]
    search_fields = ["certifications", "location"]
    ordering_fields = ["hourly_rate", "experience_years"]


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Conversation.objects.filter(
            sender__user=user
        ) | Conversation.objects.filter(receiver__user=user)


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            conversation__sender__user=user
        ) | Message.objects.filter(conversation__receiver__user=user)
