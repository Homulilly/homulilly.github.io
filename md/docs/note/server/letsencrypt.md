# Let's Encrypt

### 证书文件  
`/etc/letsencrypt/live/$domain`:
- `privkey.pem` : 证书的私钥
- `cert.pem` : 服务端证书
- `chain.pem`：浏览器需要的所有证书
- `fullchain.pem`：包括了 `cert.pem` 与 `chain.pem`

### 获取证书
- 安装   
  Ubuntu & Debian
  ```sh
  sudo apt-get install letsencrypt
  ```

- 获取证书
  ```sh
  letsencrypt certonly --webroot -w /var/www/html -d www.example.com -d example.com
  ```
  证书保存路径 `/etc/letsencrypt/live/www.example.com/`

  泛域名证书
  ```sh
  letsencrypt --server https://acme-v02.api.letsencrypt.org/directory -d example.com -d "*.example.com" --manual --preferred-challenges dns-01 certonly
  ```

- 续期
  ```sh
  #renew certificates that expire in less than 30 days
  letsencrypt renew --pre-hook "service nginx stop" --post-hook "service nginx start"
  ```


### 使用 acme.sh

[acme.sh - Github](https://github.com/acmesh-official/acme.sh)

安装  
```sh
curl https://get.acme.sh | sh -s email=my@example.com

# 修改默认 CA 为 Letsencrypt
acme.sh --set-default-ca --server letsencrypt
```

签发  
```sh
acme.sh --issue -d mydomain.com --nginx
```

使用 CloudFlare DNS 验证  
```sh
export CF_Token="[Token]"
export CF_Account_ID="[Account_ID]"
export CF_Zone_ID="[Zone_ID]"

acme.sh --issue -d example.com  -d '*.example.com'  --dns dns_cf \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd "service nginx force-reload"
```


# 单独安装证书
```sh
acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
```