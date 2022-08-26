import logging
import ssl

import ldap3
from django.conf import settings
from django.contrib.auth import user_logged_in
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import Group, User
from django.views.decorators.debug import sensitive_variables
from rest_framework import authentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .utilities import is_admin

log = logging.getLogger(__name__)


def create_user(username, fullname, email, admin=False):
    # * Django's default user model has fields for First and Last name,
    # * But for simplicity's sake we only use the displayName from LDAP and just store it in first_name
    user = User(username=username, first_name=fullname, email=email, is_staff=admin)

    if admin:
        user.groups.add(Group.objects.get(name="admin"))

    user.save()

    return user


def get_user(id=None, username=None):
    """
    Get user by either id or username.
    """
    try:
        if id:
            user = User.objects.get(id=id)
        elif username:
            user = User.objects.get(username=username)
    except User.DoesNotExist:
        user = None

    return user


@sensitive_variables("password")
def fetch_ldap_user(username, password):
    try:
        log.info(f"Authenticating {username} with LDAP")

        tls = ldap3.Tls(
            ca_certs_file=settings.LDAP_CACERTFILE,
            validate=ssl.CERT_REQUIRED,
        )
        server = ldap3.Server(settings.LDAP_HOST, use_ssl=True, tls=tls)
        log.debug("Connecting to LDAP")
        connection = ldap3.Connection(
            server,
            user=f"ms\\{username}",
            password=password,
            auto_bind=True,
        )

        user_obj = ldap3.ObjectDef(["user"], connection)
        user_obj += ldap3.AttrDef("sAMAccountName")
        reader = ldap3.Reader(
            connection,
            user_obj,
            settings.LDAP_BASE,
            f"sAMAccountName: {ldap3.utils.conv.escape_filter_chars(username.upper())}",
            attributes=["sAMAccountName", "displayName", "mail", "memberOf"],
        )

        log.debug("Performing LDAP Search")
        reader.search()
        log.debug(f"LDAP Search found {len(reader.entries)} entries")
        connection.unbind()

        return reader[0]
    except Exception as e:
        log.info(e)
        log.info(f"LDAP Authentication failed for user {username}")
        return None


@sensitive_variables("password")
def common_authentication(username, password):
    """
    Common authentication flow used by both authentication methods
    """
    user_info = fetch_ldap_user(username, password)
    if user_info is None:
        # User credentials failed to authenticate with LDAP
        return None

    if settings.LDAP_USER_GROUP not in user_info.memberOf:
        # User is missing the necessary group membership
        return None

    # LDAP authentication succeeded
    user_is_admin = settings.LDAP_ADMIN_GROUP in user_info.memberOf

    user = get_user(username=username)
    if user is None:
        user = create_user(
            username, user_info.displayName, user_info.mail, user_is_admin
        )

    # Update admin status
    if user_is_admin:
        user.is_staff = True
        user.groups.add(Group.objects.get(name="admin"))
        user.save()
    else:
        user.is_staff = False
        user.groups.remove(Group.objects.get(name="admin"))
        user.save()

    user_logged_in.send(sender=type(user), user=user)

    return user


class LdapDjangoAuthentication(BaseBackend):
    """
    Custom Django authentication backend. This is used by all Django template pages. (Like the Admin site)
    https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#writing-an-authentication-backend
    """

    def get_user(self, user_id):
        """
        Custom Django authentication backends are required to implement get_user(user_id)
        """
        return get_user(id=user_id)

    @sensitive_variables("request", "password")
    def authenticate(self, request, username=None, password=None):
        """
        Django templates call this with username/password.
        """
        return common_authentication(username, password)


class LdapDRFAuthentication(authentication.BaseAuthentication):
    """
    Custom DRF authentication class. This class is applied to the LoginView.
    https://www.django-rest-framework.org/api-guide/authentication/#custom-authentication
    """

    @sensitive_variables("request", "password")
    def authenticate(self, request):
        """
        DRF calls this with a request containing the credentials.
        """
        username = request.data.get("msid")
        password = request.data.get("password")

        user = common_authentication(username, password)

        if user is None:
            return None

        # On successful auth DRF expects a tuple of (user, auth)
        return (user, LdapDRFAuthentication)


class DevelopmentDRFAuthentication(authentication.BaseAuthentication):
    """
    ! This authentication class is only used in development.
    Allows any username to be created and logged in with the password 'password'.
    This allows developers to easily create test accounts as it bypasses LDAP authentication.
    """

    def authenticate(self, request):
        # Environment guard
        if getattr(settings, "ENVIRONMENT") != "DEVELOPMENT":
            return None

        username = request.data.get("msid")
        password = request.data.get("password")

        if password != "password":
            return None

        if user := get_user(username=username):
            if username == "admin":
                user.is_staff = True
                user.groups.add(Group.objects.get(name="admin"))
            user_logged_in.send(sender=type(user), user=user)
            return (user, None)
        else:
            # Create dummy user
            user = create_user(username, "John Doe", "john.doe@example.com")
            user_logged_in.send(sender=type(user), user=user)
            return (user, None)


class AuthTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom serializer to add claims to the JWTs"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # A user_id claim is already included by default
        # Custom claims:
        token["user_name"] = user.first_name
        token["is_admin"] = is_admin(user)

        return token
