import logging
import logging.config
import os
import time
from pathlib import Path

from get_docker_secret import get_docker_secret

from .api import Api

log = logging.getLogger(__name__)


def main():
    log.info("Starting")

    api = Api(API_BASE_URL, API_KEY)

    while True:
        # Add logic for cron-like job here
        log.info("Sleeping for 60 seconds")
        time.sleep(60)


if __name__ == "__main__":

    if os.getenv("SYNC_ENVIRONMENT") == "SERVER":
        # * Production config
        Path("/logs/sync").mkdir(exist_ok=True, parents=True)
        LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
        logging.basicConfig(
            level=LOG_LEVEL,
            format="[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            handlers=[
                logging.FileHandler("/logs/sync/sync.log"),
                logging.StreamHandler(),
            ],
        )
        log.info("Logging configured")
        log.info("Running with Production config")

        API_BASE_URL = os.getenv("API_BASE_URL")
        API_KEY = get_docker_secret("sync_api_key")
    else:
        # * Development config
        logging.basicConfig(
            format="[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            level="DEBUG",
        )
        log.info("Logging configured")
        log.info("Running with Development config")

        API_BASE_URL = "http://localhost:8000/api"

        with open("local/sync_api_key.txt") as f:
            API_KEY = f.readline()

    main()
