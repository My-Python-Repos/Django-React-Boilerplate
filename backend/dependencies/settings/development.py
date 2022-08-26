import json
from datetime import timedelta

from .common import *

ENVIRONMENT = "DEVELOPMENT"
DEBUG = True

SECRET_KEY = "+)*_8&=u!u!-(f5-v+4630fx@a%=11@e^sp^=w$b+_k4cvscf$"

# Expects a localhost database in development
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "OPTIONS": {"options": "-c search_path=django_data"},
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": 5432,
    }
}

ALLOWED_HOSTS = ["django", "localhost", "0.0.0.0", "127.0.0.1"]

LOG_LEVEL = "DEBUG"
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            "datefmt": "%d/%b/%Y %H:%M:%S",
        },
        "simple": {"format": "%(levelname)s %(message)s"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "level": LOG_LEVEL,
            "formatter": "verbose",
        }
    },
    "loggers": {
        "api": {
            "handlers": ["console"],
            "level": LOG_LEVEL,
        },
    },
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=10),
}

BASE_URL = "localhost:3000/"

# SMTP
SERVER_EMAIL = f"no-reply@{BASE_URL[:-6]}"  # Trimmed port

# LDAP
LDAP_CACERTFILE = "backend/_Root_CA.pem"
