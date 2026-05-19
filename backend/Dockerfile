# PHP (Apache) - Image
FROM php:8.3-apache

# Dépendences système + Php extension
RUN apt-get update && apt-get install -y \
    libicu-dev libzip-dev zip unzip git \
    && docker-php-ext-install pdo pdo_mysql intl zip opcache

# Opcache configuré pour le DEV
RUN echo "opcache.enable=1\n\
    opcache.memory_consumption=256\n\
    opcache.max_accelerated_files=20000\n\
    opcache.revalidate_freq=0\n\
    opcache.validate_timestamps=1\n" \
    > /usr/local/etc/php/conf.d/opcache.ini

# Installation APCu (Fast Cache)
RUN pecl install apcu && docker-php-ext-enable apcu
RUN echo "apc.enable_cli=1" > /usr/local/etc/php/conf.d/apcu.ini

# URL Rewrite
RUN a2enmod rewrite

# Changement du DocumentRoot (Apache) par défaut
RUN sed -i 's|/var/www/html|/var/www/html/public|g' \
    /etc/apache2/sites-available/000-default.conf

# Configuration du dossier Public 
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    Require all granted\n\
    </Directory>' >> /etc/apache2/sites-available/000-default.conf

# Déf. ServerName
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Installation Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Déf. du dossier de travail
WORKDIR /var/www/html

# Copie des fichiers Composer
COPY composer.json composer.lock ./
# Installation des Dép. PHP
RUN composer install --no-autoloader --no-scripts

# Entrypoint
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]