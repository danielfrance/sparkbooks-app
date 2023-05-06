#!/bin/sh

echo "Application environment: $APP_ENV"

echo "🚀 Clearing Cache/Views/Configs"
php artisan view:clear
php artisan config:clear
php artisan cache:clear

echo "🚀 Running migrations"
php artisan migrate --force


if [ "$APP_ENV" = "local" ] || [ "$APP_ENV" = "demo" ]; then
    echo "🔥 Running Seeder"
    php artisan db:seed --class=DatabaseSeeder
    echo "🔥 Dump Autoloader & Install Dependencies"
fi

if [ "$APP_ENV" = "prod" ]; then
    echo "🔥 Running Production Seeder"
    php artisan db:seed --class=ProductionSeeder --force
    echo "🔥 Dump Autoloader & Install Dependencies"
fi

echo "🔥 starting supervisord"
/usr/bin/supervisord -c /etc/supervisord.conf