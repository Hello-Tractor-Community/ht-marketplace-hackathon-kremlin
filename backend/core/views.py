from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Conversation
from .serializers import ConversationSerializer


class ConversationListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        conversations = Conversation.objects.filter(
            sender__user=request.user, receiver__user=request.user
        )
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)
