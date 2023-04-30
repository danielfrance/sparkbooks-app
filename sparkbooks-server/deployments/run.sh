#!/bin/sh

# cd /var/www

echo "🚀 Clearing Cache/Views/Configs"
php artisan view:clear
php artisan config:clear
php artisan cache:clear

php artisan migrate --force

/usr/bin/supervisord -c /etc/supervisord.conf

# php artisan migrate:fresh --seed
# echo "🚀 Dump Autoloader & Install Dependencies"
# composer dumpautoload
# composer install

# echo "🚀 Running migrations & Seeder"
# php artisan migrate:fresh
# php artisan db:seed --class=DatabaseSeeder
