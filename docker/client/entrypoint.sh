#!/bin/sh

set -e

echo "$APP_NAME - NextJS CONTAINER STARTING..."
echo "APP_NAME: $APP_NAME"

# Display Build Date/Time if available
if [ -f /app/build_timestamp.txt ]; then
    echo "Image Build Date/Time: $(cat /app/build_timestamp.txt) UTC"
fi

echo "-----------------------------------------------------------"
echo "APP_ENV: ${APP_ENV}"

# Check for required env vars
if [ -z "${APP_ENV}" ]; then
    echo "█████████████████████████████████████████████████████████████████████████████████████████████████████████████"
    echo "█ CRITICAL ERROR: Missing 'APP_ENV' environment variable."
    echo "█████████████████████████████████████████████████████████████████████████████████████████████████████████████"
    echo "APP_ENV=${APP_ENV}"
    exit 1
fi

# Start the application based on APP_ENV
if [ "${APP_ENV}" = "PRODUCTION" ]; then
    echo "Starting Next.js application in production mode"
    # Build and run for prod
    npm install
    npm run build
    npm start
elif [ "${APP_ENV}" = "DEVELOPMENT" ]; then
    echo "Starting Next.js application in development mode"
    npm install
    exec npm run dev
else
    echo "Unknown APP_ENV: ${APP_ENV}"
    exit 1
fi
