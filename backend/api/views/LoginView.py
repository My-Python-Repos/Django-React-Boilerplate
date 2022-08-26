from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from ..authentication import (
    AuthTokenObtainPairSerializer,
    DevelopmentDRFAuthentication,
    LdapDRFAuthentication,
)


class LoginView(APIView):
    permission_classes = [AllowAny]

    if getattr(settings, "ENVIRONMENT") == "DEVELOPMENT":
        authentication_classes = [DevelopmentDRFAuthentication, LdapDRFAuthentication]
    else:
        authentication_classes = [LdapDRFAuthentication]

    def post(self, request, format=None):
        if request.user.is_authenticated:
            refresh = AuthTokenObtainPairSerializer.get_token(request.user)
            return Response(
                {"refresh": str(refresh), "access": str(refresh.access_token)}
            )
        else:
            return Response(status=401)
