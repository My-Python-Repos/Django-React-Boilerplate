from rest_framework.pagination import LimitOffsetPagination


class CustomPagination(LimitOffsetPagination):
    """
    Enables url params such as limit and offset
    IE:    ?limit=5&offset=25

    Additionally applies other pagination limitations

    Docs: https://www.django-rest-framework.org/api-guide/pagination/
    """

    default_limit = 10
    max_limit = 100
