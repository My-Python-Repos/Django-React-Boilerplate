from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from ..models.Feedback import Feedback
from ..serializers.FeedbackSerializer import FeedbackSerializer


class FeedbackViewSet(ModelViewSet):
    http_method_names = ["post"]
    permission_classes = [IsAuthenticated]

    serializer_class = FeedbackSerializer
    queryset = Feedback.objects.all()
