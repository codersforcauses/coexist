# Use the official Python image
FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && \
    apt-get install --yes --no-install-recommends \
    build-essential \
    libssl-dev \
    libpq-dev \
    postgresql-client && \
    rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /app

# Install Poetry
RUN pip install --upgrade pip && \
    pip install poetry

# Configure Poetry
RUN poetry config virtualenvs.create false

# Copy the application files
COPY ./server/pyproject.toml ./server/poetry.lock ./
RUN poetry install --no-dev --no-interaction --no-ansi

COPY ./server/ ./

# Collect static files
RUN python manage.py collectstatic --noinput --verbosity 2

# Create log directory
RUN mkdir -p /var/log/accesslogs && \
    chmod -R 755 /var/log/accesslogs

# Copy entrypoint script
COPY ./docker/server/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Start the application
ENTRYPOINT ["/entrypoint.sh"]
