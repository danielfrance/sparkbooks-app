FROM php:8.1-fpm

# Set working directory
WORKDIR /var/www/html

# Add docker php ext repo
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

# Install php extensions
RUN chmod +x /usr/local/bin/install-php-extensions && sync && \
    install-php-extensions mbstring pdo_mysql zip exif pcntl gd memcached

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    unzip \
    git \
    curl \
    lua-zlib-dev \
    libmemcached-dev \
    nginx \
    && apt-get install -y postgresql-client libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && docker-php-ext-install bcmath 

COPY . .
COPY composer.json composer.lock ./

# Install supervisor
RUN apt-get install -y supervisor

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy code to /var/www
COPY --chown=www:www-data . .

# add root to www group
RUN chown -R www-data:www-data /var/www/html/storage

# Copy nginx/php/supervisor configs
COPY ./deployments/supervisord.conf /etc/supervisord.conf
COPY ./deployments/php.ini /usr/local/etc/php/conf.d/app.ini
COPY ./deployments/nginx.conf /etc/nginx/sites-enabled/default

# Deployment steps
RUN composer install --optimize-autoloader --no-dev
RUN chmod +x ./deployments/run.sh

EXPOSE 80

ENTRYPOINT ["./deployments/run.sh"]
