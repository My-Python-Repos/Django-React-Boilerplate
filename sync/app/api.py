import logging

import requests

log = logging.getLogger(__name__)


class RequestNot200Error(Exception):
    def __init__(self, status_code):
        self.message = f"Request responded with non-200 status code: {status_code}"
        super().__init__(self.message)


class Api:
    def __init__(self, base_url, api_key):
        self.base_url = base_url
        self.auth_header = {"Authorization": f"Api-Key {api_key}"}

    def _get(self, url: str) -> dict:
        log.debug(f"GET {url}")

        try:
            response = requests.get(
                url, headers=self.auth_header, params={"sync": "True"}
            )
            if response.status_code != 200:
                raise RequestNot200Error(response.status_code)

            return response.json()
        except Exception as e:
            log.error(e, exc_info=1)

        return {}

    def _patch(self, url, json):
        log.debug(f"PATCH {url}")
        log.debug(json)

        try:
            response = requests.patch(
                url, json=json, headers=self.auth_header, params={"sync": "True"}
            )
            if response.status_code != 200:
                raise RequestNot200Error(response.status_code)
        except Exception as e:
            log.error(e, exc_info=1)

    def _post(self, url):
        log.debug(f"POST {url}")

        try:
            response = requests.post(
                url, headers=self.auth_header, params={"sync": "True"}
            )
            if response.status_code != 200:
                raise RequestNot200Error(response.status_code)
        except Exception as e:
            log.error(e, exc_info=1)
