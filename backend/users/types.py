from argparse import Namespace

from typing_extensions import TypedDict


class EmailData(TypedDict):
    from_email: str | None
    recipient_list: list[str]
    subject: str
    message: str
    cc: str | None
    bcc: str | None


class GenericToken(TypedDict):
    access: str
    refresh: str


class MessagePayload(Namespace):
    topic: str
    message: str
    exchange: str
    routing_key: str = ""
