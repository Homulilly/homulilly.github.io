# Wireguard Setup

## 安装

```sh
apt install wireguard
```

## 开启系统转发

```
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1
```

若需要重启后仍然生效记得将上述配置保存到 `/etc/sysctl.conf`

```
net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
```

## 配置
首先生成密钥对，每个客户端需要生产一对
```
wg genkey | tee peer_A.key | wg pubkey > peer_A.pub
```

服务端创建并编辑 `/etc/wireguard/wg0.conf` ，内容如下： 

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

## 启动服务端

```
wg-quick up wg0
```

设置开机自启
```
systemctl enable wg-quick@wg0
```

查看状态
```
wg
```

## 客户端配置
```
[Interface]
PrivateKey = <Client PrivateKey>
Address = 10.1.1.100/32

[Peer]
PublicKey = <Server PublicKey>
Endpoint = <Server IP>:<Port>
AllowedIPs = 0.0.0.0/0
```