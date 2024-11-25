import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message
from .serializers import MessageSerializer
from users.models import Profile #noqa


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.user = self.scope["user"]
        self.conversation = await self.get_conversation(self.conversation_id)

        if self.user.profile not in [
            self.conversation.sender,
            self.conversation.receiver,
        ]:
            # Reject connection if user is not part of the conversation
            await self.close()
            return

        self.room_group_name = f"chat_{self.conversation_id}"

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json["content"]

        # Create new message
        message = await self.create_message(content)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "message": MessageSerializer(message).data},
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": event["message"]}))

    @database_sync_to_async  # Ensure this is an async-safe database call
    def get_conversation(self, conversation_id):
        try:
            return Conversation.objects.get(id=conversation_id)
        except Conversation.DoesNotExist:
            return None

    @database_sync_to_async  # Ensure this is an async-safe database call
    def create_message(self, content):
        message = Message.objects.create(
            conversation=self.conversation, sender=self.user.profile, content=content
        )
        return message
