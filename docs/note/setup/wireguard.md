# Wireguard Setup

## Wireguard 
### 安装

```sh
apt install wireguard iptables openresolv
```

### 开启系统转发

```
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1
```

若需要重启后仍然生效记得将上述配置保存到 `/etc/sysctl.conf`

```
net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
```

### 配置
首先生成密钥对，每个客户端需要生产一对，服务器自己也算一个客户端
```
wg genkey | tee peer_A.key | wg pubkey > peer_A.pub
```

服务端创建并编辑 `/etc/wireguard/wg0.conf` ，内容如下：   
可以先执行 `ip` 查看网卡名称  
```
[Interface]
ListenPort = 51820
PrivateKey = <Server PrivateKey>
Address = 10.1.1.1/24
DNS = 223.5.5.5
MTU = 1392
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o enp3s0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o enp3s0 -j MASQUERADE

[Peer]
PublicKey = <Client PublicKey>
AllowedIPs = 10.1.1.100/32
```

### 启动服务端

```
wg-quick up wg0
```

如果提示 `resolvconf: command not found`
```
sudo apt install openresolv
```

设置开机自启
```
systemctl enable wg-quick@wg0
```

查看状态
```
wg
```

### 客户端配置
```
[Interface]
PrivateKey = <Client PrivateKey>
Address = 10.1.1.100/32
MTU = 1392
DNS = 223.5.5.5

[Peer]
PublicKey = <Server PublicKey>
Endpoint = <Server IP>:<Port>
AllowedIPs = 0.0.0.0/0, ::/0
```

## WireGuard UI

### 安装

参考：   
[WireGuard-UI 安装和配置](https://songxwn.com/WireGuard-UI-install/)  
[WireGuard-UI Github](https://github.com/ngoduykhanh/wireguard-ui)

使用二进制文件进行安装。

可以使用 WEB 管理，缺点生成配置文件时没有考虑端口转发是不同端口的情况，需要使用一样的端口

```bash
cd /opt

mkdir wireguard-ui

wget https://github.com/ngoduykhanh/wireguard-ui/releases/download/v0.6.2/wireguard-ui-v0.6.2-linux-amd64.tar.gz

# 解压到指定文件夹
tar -zxvf wireguard-ui-v*.tar.gz -C ./wireguard-ui/
```

### 设置 Systemd

```sh
vim /opt/wireguard-ui/.env
```

```bash
# 配置绑定IP和端口，默认为5000
BIND_ADDRESS=0.0.0.0:5000

# SMTP 邮件发送人地址
EMAIL_FROM_ADDRESS=
# 邮件人名字
EMAIL_FROM_NAME=
# SMTP服务器域名或IP
SMTP_HOSTNAME=
# SMTP服务器端口
SMTP_PORT=465
# 邮箱登录账号
SMTP_USERNAME=
# 邮箱登录密码
SMTP_PASSWORD=
# 登录方式
SMTP_AUTH_TYPE=LOGIN
# 加密方式，一般为SSL
SMTP_ENCRYPTION=SSL

# 配置Web界面网站图标，可不配置。
#WGUI_FAVICON_FILE_PATH=/tmp/1.ico
```
设置 `Systemd` 配置文件

```bash
vim /etc/systemd/system/wireguard-ui.service

[Unit]
Description=WireGuard UI Daemon
Wants=network-online.target
After=network-online.target

[Service]
User=root
Group=root
Type=simple
WorkingDirectory=/opt/wireguard-ui
EnvironmentFile=/opt/wireguard-ui/.env
ExecStart=/opt/wireguard-ui/wireguard-ui

[Install]
WantedBy=multi-user.target
```

### 配置开机启动

```sh
# 重新加载UI服务文件、启动、配置开机、查看状态
systemctl daemon-reload 
systemctl start wireguard-ui.service 
systemctl enable wireguard-ui.service 
systemctl status wireguard-ui.service 

# 配置wg0 接口的wg服务开机启动。
systemctl restart wg-quick@wg0.service

systemctl enable wg-quick@wg0.service
```

### 设置配置文件修改，自动重新加载生效

WireGuard-UI 只负责配置信息生成。可以使用 systemd 来监视更改并重新加载配置，使新客户端配置自动生效。

如下，创建两个服务文件

`vim /etc/systemd/system/wgui.service`
```bash
[Unit]
Description=Restart WireGuard
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/bin/systemctl reload wg-quick@wg0.service

[Install]
RequiredBy=wgui.path
```


`vim /etc/systemd/system/wgui.path`
```bash
[Unit]
Description=Watch /etc/wireguard/wg0.conf for changes

[Path]
PathModified=/etc/wireguard/wg0.conf

[Install]
WantedBy=multi-user.target
```

配置为开机启动
```sh
systemctl daemon-reload
systemctl enable wgui.{path,service}
systemctl start wgui.{path,service}
```