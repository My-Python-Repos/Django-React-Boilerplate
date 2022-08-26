from rest_framework import serializers

from ..models.Feedback import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Feedback
        fields = ["id", "text", "rating", "user", "created"]
