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
    curl \
    git \
    jpegoptim optipng pngquant gifsicle \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmemcached-dev \
    libpng-dev \
    locales \
    lua-zlib-dev \
    nginx \
    supervisor \
    unzip \
    zip \
    && apt-get install -y postgresql-client libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && docker-php-ext-install bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .
COPY composer.json composer.lock ./

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

# Copy code to /var/www
COPY --chown=www:www-data . /var/www

# add root to www group
RUN chmod -R ug+w /var/www/storage

# Copy nginx/php/supervisor configs
COPY ./deployments/supervisord.conf /etc/supervisord.conf
COPY ./deployments/php.ini /usr/local/etc/php/conf.d/app.ini
COPY ./deployments/nginx.conf /etc/nginx/sites-enabled/default

# PHP Error Log Files
RUN mkdir /var/log/php && touch /var/log/php/errors.log && chmod 777 /var/log/php/errors.log

# Deployment steps
RUN composer install --optimize-autoloader --no-dev
RUN chmod +x /var/www/deployments/run.sh

EXPOSE 8080
ENTRYPOINT ["/var/www/deployments/run.sh"]