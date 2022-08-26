include .env

fe:
	# Launch dev front end 
	cd $(FRONTEND_DIRECTORY) && yarn start
db:
	# Launch dev database and adminer
	docker-compose -f compose-db.yaml up
be:
	# Launch dev back end
	venv/bin/python $(BACKEND_DIRECTORY)/manage.py runserver --settings=$(DEVELOPMENT_SETTINGS)
s:
	# Launch sync
	venv/bin/python -m ${SYNC_DIRECTORY}.app.main
static:
	# Build static django files
	# --noinput flag bypasses the confirmation request
	venv/bin/python $(BACKEND_DIRECTORY)/manage.py collectstatic --noinput --settings=$(DEVELOPMENT_SETTINGS)
	# Build static react files
	cd $(FRONTEND_DIRECTORY) && yarn run build
migrate:
	# Perform django migrations
	venv/bin/python $(BACKEND_DIRECTORY)/manage.py makemigrations --settings=$(DEVELOPMENT_SETTINGS)
	venv/bin/python $(BACKEND_DIRECTORY)/manage.py migrate --settings=$(DEVELOPMENT_SETTINGS)	
reset_db:
	# Deletes local database and all of its data. Then recreates it and applies all migrations.
	docker-compose -f compose-db.yaml down
	docker volume rm $(notdir $(CURDIR))_$(APPNAME)
	docker-compose -f compose-db.yaml up -d
	sleep 5 # Waiting for database to finish starting
	make migrate
	env DJANGO_SUPERUSER_PASSWORD=admin venv/bin/python $(BACKEND_DIRECTORY)/manage.py createsuperuser --noinput --username=admin --email=admin@example.localhost --settings=$(DEVELOPMENT_SETTINGS)
	venv/bin/python $(BACKEND_DIRECTORY)/manage.py createapikey --settings=$(DEVELOPMENT_SETTINGS)
test:
	cd $(FRONTEND_DIRECTORY) && yarn test --silent
