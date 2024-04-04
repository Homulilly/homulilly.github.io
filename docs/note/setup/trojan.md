
# Trojan Setup

### 设置环境

```sh
apt update && apt upgrade
apt install -y xz-utils wget unzip zip curl nginx

systemctl enable nginx.service 
```

前往 `/var/www/html` 设置静态网页文件
 
### 申请 Let's Encrypt 证书

```sh
letsencrypt certonly --webroot -w /var/www/html/ -d example.com
```

然后设置自动续签

### 设置 Trojan

```sh
cd /usr/src

wget https://github.com/trojan-gfw/trojan/releases/download/v1.16.0/trojan-1.16.0-linux-amd64.tar.xz
tar -xf trojan-1.16.0-linux-amd64.tar.xz

cd trojan
```

编辑配置文件，设置密码与证书路径 
```sh
vim config.json
```

### 启动 

创建 Systemd 文件
```bash
[Unit]  
Description=trojan  
After=network.target  
   
[Service]  
Type=simple  
PIDFile=/usr/src/trojan/trojan/trojan.pid
ExecStart=/usr/src/trojan/trojan -c "/usr/src/trojan/config.json"  
ExecReload=  
ExecStop=/usr/src/trojan/trojan  
PrivateTmp=true  
   
[Install]  
WantedBy=multi-user.target
```

启动
```sh
systemctl start trojan
```