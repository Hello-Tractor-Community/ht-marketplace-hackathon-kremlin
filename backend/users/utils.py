"""Users utilities."""

import logging

import pika
from django.conf import settings
from django.template.loader import render_to_string

from users.tasks import send_mail
from users.types import EmailData

logger = logging.getLogger(__name__)


def send_invite_email(self, **kwargs):
    subject = "Thank you for registering with us"
    data = EmailData(
        from_email=None,
        cc=None,
        bcc=None,
        subject=subject,
        message=render_to_string(
            template_name="users/emails/invitation.html",
        ),
        recipient_list=[self.email],
    )
    send_mail.delay(data)


@property
def profile_picture(self):
    profile = getattr(self, "profile", None)
    if not profile:
        profile = self.profile.create()
    return profile.profile_picture


def publish_message(message: str, topic: str, exchange="notifications"):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            host=settings.RABBITMQ_HOST,
            port=settings.RABBITMQ_PORT,
            virtual_host=settings.RABBITMQ_VHOST,
            credentials=pika.PlainCredentials(
                username=settings.RABBITMQ_USER, password=settings.RABBITMQ_PASSWORD
            ),
        )
    )
    try:
        channel = connection.channel()
        channel.exchange_declare(exchange=exchange, exchange_type="fanout")
        channel.basic_publish(
            exchange=exchange, routing_key="", body=message.encode("utf-8")
        )
        logger.info(f"Message published to {exchange} with topic {topic}")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    finally:
        connection.close()
