#!/bin/sh

cat >/etc/nginx/conf.d/default.conf <<EOL
server {
        listen 80;
        index index.php index.html;
        client_max_body_size ${UPLOAD_MAX_FILESIZE:-1G};
        root ${ROOT_DIR:-/app/public};
        location / {
            try_files \$uri \$uri/ /index.php?\$query_string;
        }
        location /index.php {
            include fastcgi_params;
            fastcgi_buffers 256 4k;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            fastcgi_pass unix:/var/run/php-fpm.sock;
        }
}
EOL

cat >/usr/local/etc/php/conf.d/docker-env.ini <<EOL
file_uploads=On
memory_limit=${PHP_MEMORY_LIMIT:-256M}
upload_max_filesize=${UPLOAD_MAX_FILESIZE:-1G}
post_max_size=${POST_MAX_SIZE:-1G}
max_execution_time=${MAX_EXECUTION_TIME:-30}
EOL

for file in /init.d/*; do
  [ -f "$file" ] && [ -x "$file" ] && "$file"
done

if [ ! -n "$DISABLE_SUPERVISOR" ]; then
  /usr/bin/supervisord -n -c /etc/supervisord.conf
fi