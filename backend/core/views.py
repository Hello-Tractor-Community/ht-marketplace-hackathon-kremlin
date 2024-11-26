from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Conversation
from .serializers import ConversationSerializer
from django.http import JsonResponse
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from core.models import TractorListing
from django.db import models


@staff_member_required
def tractor_analytics_data(request):
    end_date = timezone.now()
    start_date = end_date - timedelta(days=365)

    # Monthly listings count
    monthly_data = (
        TractorListing.objects.filter(created_at__range=(start_date, end_date))
        .annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(count=Count("id"))
        .order_by("month")
    )

    price_ranges = {
        "0-500k": (0, 500000),
        "500k-1M": (500000, 1000000),
        "1M-2M": (1000000, 2000000),
        "2M+": (2000000, float("inf")),
    }

    price_distribution = {}
    for range_name, (min_price, max_price) in price_ranges.items():
        count = TractorListing.objects.filter(
            price__gte=min_price,
            price__lt=max_price if max_price != float("inf") else None,
        ).count()
        price_distribution[range_name] = count

    condition_data = TractorListing.objects.values("condition").annotate(
        count=Count("id")
    )

    brand_data = (
        TractorListing.objects.values("brand")
        .annotate(count=Count("id"))
        .order_by("-count")[:5]
    )

    # Calculate general statistics
    total_listings = TractorListing.objects.count()
    active_listings = TractorListing.objects.filter(is_active=True).count()
    avg_price = (
        TractorListing.objects.filter(is_active=True).aggregate(
            avg_price=models.Avg("price")
        )["avg_price"]
        or 0
    )

    return JsonResponse(
        {
            "monthly_data": list(monthly_data),
            "price_distribution": price_distribution,
            "condition_data": list(condition_data),
            "brand_data": list(brand_data),
            "statistics": {
                "total_listings": total_listings,
                "active_listings": active_listings,
                "avg_price": float(avg_price),
            },
        }
    )


class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        conversations = Conversation.objects.filter(
            sender__user=request.user, receiver__user=request.user
        )
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)
