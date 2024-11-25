from django.contrib import admin

from .models import (AgriImplement, Conversation, Message, OperatorProfile,
                     TractorImage, TractorListing)


@admin.register(TractorListing)
class TractorListingAdmin(admin.ModelAdmin):
    list_display = (
        "brand",
        "model",
        "year",
        "price",
        "condition",
        "horsepower",
        "location",
        "is_active",
        "created_at",
    )
    list_filter = ("condition", "location", "is_active", "year")
    search_fields = ("brand", "model", "location")
    ordering = ("-created_at",)


@admin.register(TractorImage)
class TractorImageAdmin(admin.ModelAdmin):
    list_display = ("tractor", "is_primary", "image")
    list_filter = ("is_primary",)
    search_fields = ("tractor__brand", "tractor__model")
    raw_id_fields = ("tractor",)


@admin.register(AgriImplement)
class AgriImplementAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "implement_type",
        "brand",
        "price",
        "condition",
        "location",
        "is_active",
        "created_at",
    )
    list_filter = ("implement_type", "condition", "location", "is_active")
    search_fields = ("name", "brand", "location")
    ordering = ("-created_at",)


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
    list_filter = ("is_verified", "experience_years", "location")
    search_fields = ("user__username", "phone_number", "location")


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("sender", "receiver", "listing", "created_at")
    list_filter = ("created_at",)
    search_fields = (
        "sender__username",
        "receiver__username",
        "listing__brand",
        "listing__model",
    )
    raw_id_fields = ("sender", "receiver", "listing")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("conversation", "sender", "content", "timestamp", "is_read")
    list_filter = ("is_read", "timestamp")
    search_fields = ("sender__username", "conversation__id", "content")
    raw_id_fields = ("conversation", "sender")
