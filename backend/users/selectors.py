from django.contrib.auth.models import User
from django.db.models import Q


def get_user(email: str, **kwargs: dict) -> User | None:
    username = kwargs.get("username")
    return User.objects.filter(Q(email=email) | Q(username=username)).first()
