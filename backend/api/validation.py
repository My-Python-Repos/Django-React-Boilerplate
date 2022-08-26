import logging
from typing import List

from django.core.validators import RegexValidator
from rest_framework.serializers import ValidationError

log = logging.getLogger(__name__)

# Model Validators
def AlphanumericUppercaseValidator(max_length, allow_dash=False):

    if allow_dash:
        regex = rf"^[0-9A-Z%-]{{1,{max_length}}}$"
    else:
        regex = rf"^[0-9A-Z%]{{1,{max_length}}}$"

    return RegexValidator(
        regex=regex,
        message=f"Must be alphanumeric, all uppercase, 1-{max_length} characters.",
    )


def ContainsNonWildcardValidator():
    return RegexValidator(
        regex=r"(?=.*\w)",
        message="Must contain at least one non-wildcard character.",
    )


def RatingValidator(value):
    if value < 1 or value > 10:
        raise ValidationError("Must be between 1 and 10")


# Serializer Validators
def _get_value(field, data, serializer=None):
    """
    DRF calls validators with the request body as data.
    That works for POST/PUT, but with PATCH (partial update), many fields are missing from data.
    We can work around this by accessing the serializer instance which contains all of the resource's existing data.
    This helper function will attempt to get the value of the field from data,
    but if it is not present it will then attempt to get the value from the serializer instance.
    More info: https://your_gtihub /encode/django-rest-framework/issues/3070
    """
    if value := data.get(field):
        return value

    if serializer and serializer.instance:
        return getattr(serializer.instance, field)

