from rest_framework import serializers

from users.models import Profile

from .models import (AgriImplement, Conversation, Message, OperatorProfile,
                     TractorImage, TractorListing)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "Profilename", "email", "first_name", "last_name"]


class TractorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TractorImage
        fields = ["id", "image", "is_primary"]


class TractorListingSerializer(serializers.ModelSerializer):
    seller = ProfileSerializer(read_only=True)
    images = TractorImageSerializer(many=True, read_only=True)

    class Meta:
        model = TractorListing
        fields = "__all__"

    def create(self, validated_data):
        images_data = self.context.get("request").FILES
        tractor = TractorListing.objects.create(**validated_data)

        for is_primary, image in enumerate(images_data.getlist("images")):
            TractorImage.objects.create(
                tractor=tractor, image=image, is_primary=is_primary == 0
            )
        return tractor


class AgriImplementSerializer(serializers.ModelSerializer):
    seller = ProfileSerializer(read_only=True)

    class Meta:
        model = AgriImplement
        fields = "__all__"


class OperatorProfileSerializer(serializers.ModelSerializer):
    Profile = ProfileSerializer(read_only=True)

    class Meta:
        model = OperatorProfile
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "sender", "content", "timestamp", "is_read"]


class ConversationSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(read_only=True)
    receiver = ProfileSerializer(read_only=True)
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ["id", "sender", "receiver", "listing", "created_at", "messages"]
