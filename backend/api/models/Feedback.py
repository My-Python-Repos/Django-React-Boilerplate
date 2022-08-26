from django.conf import settings
from django.db import models
from unixtimestampfield.fields import UnixTimeStampField

from ..validation import RatingValidator


class Feedback(models.Model):
    text = models.TextField()
    rating = models.IntegerField(validators=[RatingValidator])
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.DO_NOTHING,
    )
    created = UnixTimeStampField(auto_now_add=True, use_numeric=True, blank=True)

    def __str__(self):
        return f"Feedback {self.id}"
