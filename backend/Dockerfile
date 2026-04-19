FROM php:8.3-apache

RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev zip unzip git \
    && docker-php-ext-install pdo pdo_mysql intl zip opcache

# Opcache configuré pour le DEV : timestamps activés, rechargement à chaque requête
RUN echo "opcache.enable=1\n\
    opcache.memory_consumption=256\n\
    opcache.max_accelerated_files=20000\n\
    opcache.revalidate_freq=0\n\
    opcache.validate_timestamps=1\n" \
    > /usr/local/etc/php/conf.d/opcache.ini

# APCu
RUN pecl install apcu && docker-php-ext-enable apcu
RUN echo "apc.enable_cli=1" > /usr/local/etc/php/conf.d/apcu.ini

RUN a2enmod rewrite

RUN sed -i 's|/var/www/html|/var/www/html/public|g' \
    /etc/apache2/sites-available/000-default.conf

RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>' >> /etc/apache2/sites-available/000-default.conf

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-autoloader --no-scripts

# Entrypoint : le heredoc sans indentation pour éviter les espaces parasites
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]