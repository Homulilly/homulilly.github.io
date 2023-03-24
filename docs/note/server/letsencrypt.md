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
