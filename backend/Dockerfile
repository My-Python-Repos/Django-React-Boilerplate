FROM python:3.10.2-slim-buster

WORKDIR /home/backend

RUN apt-get update
# Oracle Client and its dependencies
RUN apt-get update
RUN apt-get install -y curl
RUN curl -o oracleinstantclient.rpm https://download.oracle.com/otn_software/linux/instantclient/211000/oracle-instantclient-basiclite-21.1.0.0.0-1.x86_64.rpm
RUN apt-get install -y libaio1
RUN apt-get install -y alien
RUN alien -i oracleinstantclient.rpm
RUN rm -f oracleinstantclient.rpm
# psycopg2 build dependencies
RUN apt-get install -y python-dev
RUN apt-get install -y libpq-dev
RUN apt-get install -y gcc

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=dependencies.settings.production

# Install python dependencies first for more efficient builds
COPY requirements.txt .
RUN pip install -r requirements.txt
# Copy over source files
COPY . .
RUN chmod +x migrate.sh

EXPOSE 8000

CMD ["gunicorn", "--bind", ":8000", "--workers", "9", "dependencies.wsgi:application"]