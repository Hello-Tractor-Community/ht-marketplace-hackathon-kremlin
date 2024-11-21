import json
import logging

import pika
from celery import shared_task
from celery.exceptions import Reject
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from pika.exchange_type import ExchangeType

from users.types import EmailData, MessagePayload

logger = logging.getLogger(__name__)


@shared_task(name="Send Emails", priority=2, max_retries=3)
def send_mail(email_data: EmailData, **kwargs):
    """Mails get handled by celery"""
    try:
        msg = EmailMultiAlternatives(
            subject=email_data["subject"],
            from_email=email_data.get("from_email", settings.DEFAULT_FROM_EMAIL),
            to=email_data["recipient_list"],
            body=email_data["message"],
            cc=email_data.get("cc"),
            bcc=email_data.get("bcc"),
        )
        msg.attach_alternative(email_data["message"], "text/html")
        msg.send()
        logger.info(f"Email Sent to {email_data.get('recipient_list')}")
    except Exception as e:
        logger.error(str(e))
        raise Reject(e, requeue=False)


@shared_task(name="Publish Message to Queue", max_retries=3)
def publish_message(topic: str, exchange: str, routing_key: str, data: dict):
    payload = MessagePayload(
        topic=topic,
        exchange=exchange,
        routing_key=routing_key,
        message=json.dumps(data),
    )

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
        channel.exchange_declare(
            exchange=payload.exchange, exchange_type=ExchangeType.topic
        )
        channel.basic_publish(
            exchange=payload.exchange,
            routing_key=payload.routing_key,
            body=payload.message.encode("utf-8"),
            properties=pika.BasicProperties(
                delivery_mode=2,
            ),
        )
        logger.info(
            f"Message published to exchange {payload.exchange} | topic {payload.topic}"
        )
    except Exception as e:
        logger.error(f"Publish Message Error : {e}")
    finally:
        connection.close()
