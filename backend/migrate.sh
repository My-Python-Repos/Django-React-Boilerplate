#!/bin/sh

export MIGRATION=true
# The MIGRATION variable is used by the django settings to control
# whether the admin or app database user is used.

echo "Applying database migrations"
python manage.py migrate