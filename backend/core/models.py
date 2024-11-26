from django.db import models

from users.models import Profile


class TractorListing(models.Model):
    CONDITION_CHOICES = [
        ("NEW", "New"),
        ("EXCELLENT", "Excellent"),
        ("GOOD", "Good"),
        ("FAIR", "Fair"),
        ("POOR", "Poor"),
    ]

    seller = models.ForeignKey(Profile, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    horsepower = models.FloatField()
    location = models.CharField(max_length=200)
    description = models.TextField()
    working_hours = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.model} ({self.year})"


class TractorImage(models.Model):
    tractor = models.ForeignKey(
        TractorListing, related_name="images", on_delete=models.CASCADE
    )
    image_1 = models.ImageField(upload_to="tractor_images/")
    image_2 = models.ImageField(upload_to="tractor_images/", blank=True, null=True)
    image_3 = models.ImageField(upload_to="tractor_images/", blank=True, null=True)
    is_primary = models.BooleanField(default=False)


class AgriImplement(models.Model):
    IMPLEMENT_TYPES = [
        ("PLOUGH", "Plough"),
        ("HARROW", "Harrow"),
        ("SEEDER", "Seeder"),
        ("SPRAYER", "Sprayer"),
        ("OTHER", "Other"),
    ]

    seller = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    implement_type = models.CharField(max_length=20, choices=IMPLEMENT_TYPES)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    condition = models.CharField(
        max_length=20, choices=TractorListing.CONDITION_CHOICES
    )
    location = models.CharField(max_length=200)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


class OperatorProfile(models.Model):
    user = models.OneToOneField(Profile, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    location = models.CharField(max_length=200)
    experience_years = models.IntegerField()
    certifications = models.TextField(blank=True)
    hourly_rate = models.DecimalField(max_digits=6, decimal_places=2)
    is_verified = models.BooleanField(default=False)


class Conversation(models.Model):
    sender = models.ForeignKey(
        Profile, related_name="sent_messages", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        Profile, related_name="received_messages", on_delete=models.CASCADE
    )
    listing = models.ForeignKey(
        TractorListing, on_delete=models.SET_NULL, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, related_name="messages", on_delete=models.CASCADE
    )
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
