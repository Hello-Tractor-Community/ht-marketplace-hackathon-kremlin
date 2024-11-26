from rest_framework import serializers
from .models import (
    TractorListing,
    TractorImage,
    AgriImplement,
    OperatorProfile,
    Conversation,
    Message,
)

from users.serializers import ProfileSerializer



class TractorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TractorImage
        fields = ["id", "image_1", "image_2", "image_3", "is_primary"]


class TractorListingSerializer(serializers.ModelSerializer):
    seller = ProfileSerializer(read_only=True)
    images = TractorImageSerializer(many=True)

    class Meta:
        model = TractorListing
        fields = [
            "id",
            "seller",
            "brand",
            "model",
            "year",
            "price",
            "condition",
            "horsepower",
            "location",
            "description",
            "working_hours",
            "is_active",
            "created_at",
            "updated_at",
            "images",
        ]

    def create(self, validated_data):
        images_data = validated_data.pop("images")
        tractor_listing = TractorListing.objects.create(**validated_data)
        for image_data in images_data:
            TractorImage.objects.create(tractor=tractor_listing, **image_data)
        return tractor_listing

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images")
        instance.brand = validated_data.get("brand", instance.brand)
        instance.model = validated_data.get("model", instance.model)
        instance.year = validated_data.get("year", instance.year)
        instance.price = validated_data.get("price", instance.price)
        instance.condition = validated_data.get("condition", instance.condition)
        instance.horsepower = validated_data.get("horsepower", instance.horsepower)
        instance.location = validated_data.get("location", instance.location)
        instance.description = validated_data.get("description", instance.description)
        instance.working_hours = validated_data.get(
            "working_hours", instance.working_hours
        )
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()

        for image_data in images_data:
            image_id = image_data.get("id")
            if image_id:
                image = TractorImage.objects.get(id=image_id, tractor=instance)
                image.image_1 = image_data.get("image_1", image.image_1)
                image.image_2 = image_data.get("image_2", image.image_2)
                image.image_3 = image_data.get("image_3", image.image_3)
                image.is_primary = image_data.get("is_primary", image.is_primary)
                image.save()
            else:
                TractorImage.objects.create(tractor=instance, **image_data)

        return instance


class AgriImplementSerializer(serializers.ModelSerializer):
    seller = ProfileSerializer(read_only=True)

    class Meta:
        model = AgriImplement
        fields = [
            "id",
            "seller",
            "name",
            "implement_type",
            "brand",
            "price",
            "condition",
            "location",
            "description",
            "is_active",
            "created_at",
        ]


class OperatorProfileSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)

    class Meta:
        model = OperatorProfile
        fields = [
            "id",
            "user",
            "phone_number",
            "location",
            "experience_years",
            "certifications",
            "hourly_rate",
            "is_verified",
        ]


class ConversationSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(read_only=True)
    receiver = ProfileSerializer(read_only=True)
    listing = TractorListingSerializer(read_only=True, allow_null=True)

    class Meta:
        model = Conversation
        fields = ["id", "sender", "receiver", "listing", "created_at"]


class MessageSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(read_only=True)
    conversation = ConversationSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "conversation", "sender", "content", "timestamp", "is_read"]
