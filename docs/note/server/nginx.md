# Nginx 

## Force with HTTPS and no-www
```bash
# Force with HTTPS
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
# no-www
server {
    listen 443;
    server_name www.example.com;
    return 301 https://example.com$request_uri;
}
```

## Custom Error Pages
save to `server{ }`

```bash
error_page 404 /404.html;
error_page 403 /403.html;
location = /404.html{
        root /var/www/;
        internal;
}
location = /403.html{
        root /var/www/;
        internal;
}
```

## HTTPS Config
```bash
server {
    listen 80;
    listen 443 ssl http2;
    root $web-root-path/;
    server_name example.com;
    index index.html index.htm;
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
        

    ssl_certificate $path-to-fullchain.pem;
    ssl_certificate_key $path-to-private.key;

    #no ssl v3
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    #sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048 or 4096
    ssl_dhparam /etc/ssl/certs/dhparam.pem;
    ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_stapling on;
    ssl_stapling_verify on;
    #Support HSTS
    add_header Strict-Transport-Security max-age=31536000;
    #can be show in frame? DENY - SAMEORIGIN - ALLOW-FROM https://example.com/
    add_header X-Frame-Options DENY;

    location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        try_files $uri $uri/ =404;
    }
    ### Add Custom Error Pages Config
}
```

## PHP
```bash
# pass the PHP scripts to FastCGI server listening on unix socket
location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;

        fastcgi_pass unix:/var/run/php5-fpm.sock;

        fastcgi_param  SCRIPT_FILENAME  $document_root/$fastcgi_script_name;
        include        fastcgi_params;
        fastcgi_index  index.php;
}
```

## Deny to run PHP
```bash
#such as /upload/
location /$path_in_the_url/ {
        location ~ .*\.(php)?$
        {
            deny all;
}
```

## Url with Password
生成密码密钥
```
openssl passwd -apr1
```

编辑认证文件 `/etc/nginx/pma_pass`
格式为 `$username:上一步的字符串`

加入配置文件
```bash
location /path {
    auth_basic "Admin Login";
    auth_basic_user_file /etc/nginx/pma_pass;
}
```