from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, viewsets

from .models import (AgriImplement, Conversation, Message, OperatorProfile,
                     TractorListing)
from .serializers import (AgriImplementSerializer, ConversationSerializer,
                          MessageSerializer, OperatorProfileSerializer,
                          TractorListingSerializer)


class IsSellerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow sellers to edit their own listings
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the seller
        return obj.seller == request.user


class TractorListingViewSet(viewsets.ModelViewSet):
    "Tractor listing viewset"
    queryset = TractorListing.objects.filter(is_active=True)
    serializer_class = TractorListingSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSellerOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = {
        "brand": ["exact", "icontains"],
        "model": ["exact", "icontains"],
        "year": ["exact", "gte", "lte"],
        "price": ["gte", "lte"],
        "condition": ["exact"],
        "location": ["icontains"],
    }
    search_fields = ["brand", "model", "description", "location"]
    ordering_fields = ["price", "year", "created_at"]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class AgriImplementViewSet(viewsets.ModelViewSet):
    queryset = AgriImplement.objects.filter(is_active=True)
    serializer_class = AgriImplementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsSellerOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = {
        "name": ["icontains"],
        "implement_type": ["exact"],
        "brand": ["icontains"],
        "price": ["gte", "lte"],
        "condition": ["exact"],
        "location": ["icontains"],
    }
    search_fields = ["name", "brand", "description", "location"]
    ordering_fields = ["price", "created_at"]

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class OperatorProfileViewSet(viewsets.ModelViewSet):
    queryset = OperatorProfile.objects.filter(is_verified=True)
    serializer_class = OperatorProfileSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = {
        "location": ["icontains"],
        "experience_years": ["gte"],
        "hourly_rate": ["gte", "lte"],
    }
    search_fields = ["location", "certifications"]
    ordering_fields = ["experience_years", "hourly_rate"]


class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Conversation.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        )


class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Message.objects.filter(
            Q(conversation__sender=self.request.user)
            | Q(conversation__receiver=self.request.user)
        )

    def perform_create(self, serializer):
        conversation_id = self.request.data.get("conversation_id")
        conversation = Conversation.objects.get(id=conversation_id)
        serializer.save(sender=self.request.user, conversation=conversation)


class FeaturedListingsView(generics.ListAPIView):
    """
    View to fetch top 10 most recent active tractor listings
    """

    queryset = TractorListing.objects.filter(is_active=True).order_by("-created_at")[
        :10
    ]
    serializer_class = TractorListingSerializer


# Optional: Custom filtering for advanced search
class AdvancedTractorSearchView(generics.ListAPIView):
    """
    Advanced search view with more complex filtering options
    """

    serializer_class = TractorListingSerializer

    def get_queryset(self):
        queryset = TractorListing.objects.filter(is_active=True)

        # Optional parameters for advanced filtering
        brand = self.request.query_params.get("brand", None)
        min_price = self.request.query_params.get("min_price", None)
        max_price = self.request.query_params.get("max_price", None)
        min_year = self.request.query_params.get("min_year", None)
        max_horsepower = self.request.query_params.get("max_horsepower", None)
        location = self.request.query_params.get("location", None)

        if brand:
            queryset = queryset.filter(brand__icontains=brand)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        if min_year:
            queryset = queryset.filter(year__gte=min_year)

        if max_horsepower:
            queryset = queryset.filter(horsepower__lte=max_horsepower)

        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset
