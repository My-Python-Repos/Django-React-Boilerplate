from django.conf import settings
from django.views.debug import SafeExceptionReporterFilter


class RecursiveSafeExceptionReporterFilter(SafeExceptionReporterFilter):
    """In addition to the default SafeExceptionReporterFilter behaviour,
    this also recursively cleanses sensitive values from dictionaries"""

    def _cleanse_dict(self, dictionary):
        for (key, value) in dictionary.items():
            if type(value) is dict:
                dictionary[key] = self._cleanse_dict(value)
            elif key in settings.SENSITIVE_VARIABLES:
                dictionary[key] = SafeExceptionReporterFilter.cleansed_substitute

        return dictionary

    def get_post_parameters(self, *args, **kwargs):
        return self._cleanse_dict(super().get_post_parameters(*args, **kwargs).copy())

    def get_traceback_frame_variables(self, *args, **kwargs):
        return self._cleanse_dict(
            dict(super().get_traceback_frame_variables(*args, **kwargs))
        ).items()
