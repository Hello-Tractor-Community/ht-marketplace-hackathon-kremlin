from django.urls import path
from .views import ConversationListView, tractor_analytics_data
from .filters import TractorListingViewSet, AgriImplementViewSet,OperatorProfileViewSet, FeaturedListingsView

urlpatterns = [
    path("conversations/", ConversationListView.as_view(), name="conversation-list"),
    path(
        "tractors/",
        TractorListingViewSet.as_view({"get": "list", "post": "create"}),
        name="tractor-list",
    ),
    path(
        "tractors/<int:pk>/",
        TractorListingViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="tractor-detail",
    ),
    path(
        "implements/",
        AgriImplementViewSet.as_view({"get": "list", "post": "create"}),
        name="implement-list",
    ),
    path(
        "implements/<int:pk>/",
        AgriImplementViewSet.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="implement-detail",
    ),
    path(
        "operators/",
        OperatorProfileViewSet.as_view({"get": "list"}),
        name="operator-list",
    ),
    path(
        "operators/<int:pk>/",
        OperatorProfileViewSet.as_view({"get": "retrieve"}),
        name="operator-detail",
    ),
    path(
        "featured-listings/", FeaturedListingsView.as_view(), name="featured-listings"
    ),
    path(
        "admin/listings/analytics-data/",
        tractor_analytics_data,
        name="tractor-analytics-data",
    ),
]
