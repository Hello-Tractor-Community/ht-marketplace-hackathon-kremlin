import logging
import uuid

from django.contrib.auth.models import User
from django.db import models
from django.db.utils import cached_property

# Additional imports
from .utils import profile_picture, send_invite_email

User.add_to_class(
    "send_invite_email", lambda self, **kwargs: send_invite_email(self, **kwargs)
)
User.add_to_class("profile_picture", profile_picture)


logger = logging.getLogger(__name__)


class BaseModel(models.Model):
    uid = models.UUIDField(
        unique=True, primary_key=True, db_index=True, editable=False, default=uuid.uuid4
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    modified = models.DateTimeField(auto_now=True, db_index=True)
    is_deleted = models.BooleanField(default=False, db_index=True)

    class Meta:
        get_latest_by = "modified"
        abstract = True
        ordering = ("-created",)


class Profile(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    metadata = models.JSONField(default=dict)

    class Role(models.TextChoices):
        SELLER = "SELLER", "Seller"
        BUYER = "BUYER", "Buyer"
        BOTH = "BOTH", "Both"

    role = models.CharField(max_length=6, choices=Role.choices, default=Role.BUYER)
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    

    def __str__(self):
        return f"{self.user.get_full_name()}"

    @cached_property
    def profile_picture(self):
        return self.metadata.get("profile_picture", None)
