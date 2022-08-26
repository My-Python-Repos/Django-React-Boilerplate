import logging

from django.apps import AppConfig
from django.conf import settings

log = logging.getLogger(__name__)


class ApiConfig(AppConfig):
    name = "api"

    def ready(self):
        pass
