from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from django.urls import path
from django.template.response import TemplateResponse
from django.contrib.admin.views.decorators import staff_member_required
from django.utils.decorators import method_decorator
from .models import (
    TractorListing,
    TractorImage,
    AgriImplement,
    OperatorProfile,
    Conversation,
    Message,
)


class TractorImageInline(admin.TabularInline):
    model = TractorImage
    extra = 1
    max_num = 3


@admin.register(TractorListing)
class TractorListingAdmin(admin.ModelAdmin):
    list_display = (
        "listing_preview",
        "brand",
        "model",
        "year",
        "formatted_price",
        "condition",
        "location",
        "is_active",
        "created_at",
    )
    list_filter = ("brand", "condition", "is_active", "year")
    search_fields = ("brand", "model", "location")
    readonly_fields = ("created_at", "updated_at")
    inlines = [TractorImageInline]
    list_per_page = 10

    def analytics_view(self, request):
        context = {
            'title': 'Tractor Listings Analytics',
            'app_label': self.model._meta.app_label,
            'opts': self.model._meta,
            'has_permission': True,
        }
        return TemplateResponse(request, 'admin/tractor_analytics.html', context)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                'analytics/',
                self.admin_site.admin_view(self.analytics_view),
                name='tractor-listings-analytics'
            ),
        ]
        return custom_urls + urls
    def listing_preview(self, obj):
        if obj.images.filter(is_primary=True).exists():
            img = obj.images.filter(is_primary=True).first()
            return format_html(
                '<img src="{}" style="width: 100px; height: auto;"/>', img.image_1.url
            )
        return format_html("<span>No image</span>")

    listing_preview.short_description = "Preview"
    def changelist_view(self, request, extra_context=None):
        extra_context = extra_context or {}
        extra_context["show_analytics_button"] = True
        return super().changelist_view(request, extra_context=extra_context)

    def formatted_price(self, obj):
        return f"KSh. {obj.price:,.2f}"

    formatted_price.short_description = "Price"

    class Media:
        css = {"all": ("admin/css/custom_admin.css",)}
        js = ("admin/js/chart.min.js", "admin/js/custom_admin.js")


@admin.register(AgriImplement)
class AgriImplementAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "implement_type",
        "brand",
        "formatted_price",
        "condition",
        "location",
        "is_active",
    )
    list_filter = ("implement_type", "condition", "is_active")
    search_fields = ("name", "brand", "location")

    def formatted_price(self, obj):
        return f"KSh. {obj.price:,.2f}"

    formatted_price.short_description = "Price"


@admin.register(OperatorProfile)
class OperatorProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone_number",
        "location",
        "experience_years",
        "hourly_rate",
        "is_verified",
    )
    list_filter = ("is_verified", "experience_years")
    search_fields = ("user__username", "phone_number", "location")


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("sender", "receiver", "listing", "created_at")
    list_filter = ("created_at",)
    search_fields = ("sender__username", "receiver__username")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("conversation", "sender", "content_preview", "timestamp", "is_read")
    list_filter = ("is_read", "timestamp")
    search_fields = ("content", "sender__username")

    def content_preview(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content

    content_preview.short_description = "Content"
