from pathlib import Path

from get_docker_secret import get_docker_secret

from .common import *

ENVIRONMENT = "PRODUCTION"
DEBUG = False

SECRET_KEY = get_docker_secret("django_secret_key")

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# * Both database entries point to the same database, they just use different users.
#  We would prefer to use django's multiple-database for this,
#  but unfortunately rest_framework_api_key does not properly support it, which causes migrations to fail.
# search_path=django instructs django to use the django_data schema, rather than the default public schema.
if os.getenv("MIGRATION") == "true":
    # Used for applying migrations and must use a DML+DDL database account.
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "OPTIONS": {"options": "-c search_path=django_data"},
            "NAME": os.getenv("POSTGRES_DB_NAME"),
            "USER": os.getenv("POSTGRES_ADMIN_USER"),
            "PASSWORD": get_docker_secret("postgres_admin_password"),
            "HOST": os.getenv("POSTGRES_HOST"),
            "PORT": os.getenv("POSTGRES_PORT"),
        },
    }
else:
    DATABASES = {
        # Used for application activity and should use a DML-only database account.
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "OPTIONS": {"options": "-c search_path=django_data"},
            "NAME": os.getenv("POSTGRES_DB_NAME"),
            "USER": os.getenv("POSTGRES_USER"),
            "PASSWORD": get_docker_secret("postgres_password"),
            "HOST": os.getenv("POSTGRES_HOST"),
            "PORT": os.getenv("POSTGRES_PORT"),
        },
    }

ALLOWED_HOSTS = ["django"]

# Prevent sending cookies over unsecured HTTP
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# Server Error Email Recipients
ADMINS = [
    ("Kevin Strouzas", "kevin.strouzas@.com"),
]

# Logging
Path("/logs/django").mkdir(exist_ok=True, parents=True)
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
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
        "file": {
            "level": LOG_LEVEL,
            "class": "logging.FileHandler",
            "filename": "/logs/django/django.log",
            "formatter": "verbose",
        },
        "mail_admins": {
            "level": "ERROR",  # ERROR level log events will trigger an immediate email alert to ADMINS
            "class": "django.utils.log.AdminEmailHandler",
            "include_html": True,
        },
    },
    "loggers": {
        "django": {
            "handlers": ["file", "mail_admins"],
            "level": LOG_LEVEL,
        },
        "api": {
            "handlers": ["file", "mail_admins"],
            "level": LOG_LEVEL,
        },
    },
}

BASE_URL = os.getenv("BASE_URL")

# SMTP
SERVER_EMAIL = f"no-reply@{BASE_URL}".rstrip("/")

# LDAP
LDAP_CACERTFILE = "_Root_CA.pem"
