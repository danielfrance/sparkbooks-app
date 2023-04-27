#!/bin/sh

cd /var/www

/usr/bin/supervisord -c /etc/supervisord.conf

# php artisan migrate:fresh --seed
echo "🚀 Dump Autoloader & Install Dependencies"
composer dumpautoload
composer install

echo "🚀 Clearing Cache/Views/Configs"
php artisan view:clear
php artisan config:clear
php artisan cache:clear

echo "🚀 Running migrations & Seeder"
php artisan migrate:fresh
php artisan db:seed --class=DatabaseSeeder
