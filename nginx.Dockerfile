# Build container to generate django static files
FROM python:3.10.2-slim-buster as djangostaticbuilder

WORKDIR /app

RUN pip install django djangorestframework djangorestframework-api-key djangorestframework_simplejwt django-unixtimestampfield psycopg2-binary django-filter
COPY backend/ ./

RUN python manage.py collectstatic --noinput --settings=dependencies.settings.common

# Deployable image
FROM nginx:1.19.1-alpine

COPY --from=djangostaticbuilder /app/backend/djangostatic /var/www/djangostatic
COPY frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

RUN mkdir -p /logs/nginx

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]