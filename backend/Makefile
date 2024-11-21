.PHONY: run migrate celery

# Variables
DJANGO_MANAGE=python manage.py

# Run the Django development server
run:
	$(DJANGO_MANAGE) runserver

# Apply database migrations
migrate:
	$(DJANGO_MANAGE) migrate

# Start Celery worker
celery:
	celery -A project worker --loglevel=info
