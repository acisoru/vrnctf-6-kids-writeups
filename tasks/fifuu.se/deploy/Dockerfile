FROM debian:bookworm as builder
LABEL authors="M41den"

RUN apt update && apt install -y ca-certificates apt-transport-https curl git
RUN echo 'deb [trusted=yes] https://packages.sury.org/php bookworm main contrib non-free' >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y build-essential nginx-full php8.2-fpm php8.2 sqlite3 php8.2-sqlite3 \
    php8.2-curl nodejs npm git php8.2-cli php8.2-lz4 \
    php8.2-mcrypt php8.2-mysql php8.2-pgsql php8.2-xdebug php8.2-zip \
    php8.2-common php8.2-readline php8.2-bcmath php8.2-common php8.2-xml
RUN mkdir -p /var/www/uguu /var/www/db
COPY . /var/www/uguu/
WORKDIR /var/www/uguu
RUN npm install
RUN make && make install
RUN sqlite3 /var/www/db/uguu.sq3 -init /var/www/uguu/src/static/dbSchemas/sqlite_schema.sql ""


FROM nginx:bookworm
COPY --from=builder /var/www/ /var/www/
RUN mkdir /var/www/uguu/dist/public/files/
RUN chown -R nginx:nginx /var/www/ && \
    chmod -R 775 /var/www && chmod -R 555 /var/www/uguu && chmod -R 775 /var/www/uguu/dist/public/files/ # hope that shit works
RUN apt update && apt install -y ca-certificates apt-transport-https curl git
RUN echo 'deb [trusted=yes] https://packages.sury.org/php bookworm main contrib non-free' >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y php8.2-fpm php8.2 sqlite3 php8.2-sqlite3 php8.2-curl php8.2-cli php8.2-lz4 \
            php8.2-mcrypt php8.2-mysql php8.2-pgsql php8.2-xdebug php8.2-zip \
            php8.2-common php8.2-readline php8.2-bcmath php8.2-common php8.2-xml

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d
RUN sed -i 's/www-data/nginx/g' /etc/php/8.2/fpm/pool.d/www.conf
RUN sed -i 's/;security.limit_extensions/security.limit_extensions/g' /etc/php/8.2/fpm/pool.d/www.conf
RUN echo 'log_errors = On' >> /etc/php/8.2/fpm/php.ini
RUN echo 'error_reporting = E_ALL' >> /etc/php/8.2/fpm/php.ini
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 100M/g' /etc/php/8.2/fpm/php.ini

# PLANT FLAG HERE
RUN echo 'vrnctf{BL4CKLIST_1SSUE_I_GUESS}' > /var/www/flag.txt
ENV NOTE="DARK FIF SUMMONING"

# ENFORCE PERMS
RUN chown -R root:root /var/www/uguu && \
    chmod -R 555 /var/www/uguu && \
    chown -R nginx:nginx /var/www/uguu/dist/public/files/ && \
    chmod -R 775 /var/www/uguu/dist/public/files/ && \
    chown root:root /var/www/flag.txt && chmod 555 /var/www/flag.txt

STOPSIGNAL SIGQUIT

CMD service php8.2-fpm start && nginx -g 'daemon off;'
