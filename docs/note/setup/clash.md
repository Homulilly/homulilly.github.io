# Clash Setup

- Clash.Meta
- Debian 12

### 下载 Clash.Meta

Github 下载地址: [https://github.com/MetaCubeX/Clash.Meta/releases](https://github.com/MetaCubeX/Clash.Meta/releases)

### 安装

```bash
gzip -d clash.meta-linux-amd64-cgo-v1.16.0.gz

mv clash.meta-linux-amd64-cgo-v1.16.0 /opt/clash
```

创建配置文件目录

```bash
mkdir /etc/clash
```

### 创建配置文件
创建配置文件 `/etc/clash/config.yaml`, 并在配置文件中输入以下内容 

用于旁路由要开启 TUN 模式

```yaml
mixed-port: 7890 # HTTP(S) 和 SOCKS 代理混合端口
# port: 7890 # HTTP(S) 代理服务器端口
# socks-port: 7891 # SOCKS5 代理端口
# redir-port: 7892 # 透明代理端口，用于 Linux 和 MacOS

# Linux 透明代理服务器端口（TProxy TCP 和 TProxy UDP）
tproxy-port: 7893

allow-lan: true 
bind-address: "*" 

log-level: info

# 开启 IPv6 总开关，关闭阻断所有 IPv6 链接和屏蔽 DNS 请求 AAAA 记录
ipv6: true

# RESTful API 监听地址
external-controller: 0.0.0.0:9090
# API 的访问密钥
secret: '<SecurityKey>'
# TCP 并发连接所有 IP, 将使用最快握手的 TCP
tcp-concurrent: true
# 配置 WEB UI 目录，使用 http://{{external-controller}}/ui 访问
external-ui: "/etc/clash/ui"

# 全局 TLS 指纹，优先低于 proxy 内的 client-fingerprint
# 可选： "chrome","firefox","safari","ios","random","none" options.
# Utls is currently support TLS transport in TCP/grpc/WS/HTTP for VLESS/Vmess and trojan.
global-client-fingerprint: chrome

# 为 Linux 下的出站连接提供默认流量标记
routing-mark: 2233

# 统一延迟, 更换延迟计算方式,去除握手等额外延迟
unified-delay: false

tun:
  enable: true                          # 是否启用 tun 模式来路由全局流量。
  stack: system                         # tun 模式堆栈,如无使用问题,建议使用 system 栈;MacOS 用户推荐 gvisor栈
  dns-hijack:                           # dns 劫持,一般设置为 any:53 即可, 即劫持所有 53 端口的 udp 流量
    - any:53
    - tcp://any:53
  auto-route: true                      # 自动设置全局路由,可以自动将全局流量路由进入 tun 网卡。
  auto-detect-interface: true           # 自动选择流量出口接口,多出口网卡同时连接的设备建议手动指定出口网卡

# 使用系统的dns, 也就是dhcp服务器下发的dns服务地址(使用我自建的dns服务来分流)
dns:
  enable: true                          # 关闭将使用系统 DNS
  prefer-h3: true                       # 开启 DoH 支持 HTTP/3，将并发尝试
  listen: ':53'                         # 开启 DNS 服务器监听
  ipv6: true                            # false 将返回 AAAA 的空结果    
  ipv6-timeout: 300                     # 单位：ms，内部双栈并发时，向上游查询 AAAA 时，等待 AAAA 的时间，默认 100ms
  enhanced-mode: fake-ip                # fake-ip or redir-host
  fake-ip-range: 28.0.0.1/8             # fake-ip 池设置
  fake-ip-filter:
    - '*'
    - '+.lan'
    - '+.local'
  default-nameserver: 
    - 223.5.5.5
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.0.0.1/dns-query
    - tls://dns.google
  fallback-filter:
    geoip: true
    geoip-code: CN
    ipcidr:
      - 240.0.0.0/4

# 代理
proxies:
  
# 代理组  
proxy-groups:

# 规则
rules:
```

### 下载 Web UI 面板

- 面板开源地址: [https://github.com/MetaCubeX/Yacd-meta](https://github.com/MetaCubeX/Yacd-meta)
- 在线体验地址: [https://yacd.metacubex.one/](https://yacd.metacubex.one/)

```bash
# 下载
wget https://github.com/MetaCubeX/yacd/archive/gh-pages.zip
# 解压
unzip gh-pages.zip
# 重命名
mv gh-pages /etc/clash/ui
```

### 测试配置文件

输入 `/opt/clash -d /etc/clash` 启动 clash, 显示内容无报错即配置文件测试通过

按 Ctrl+C 关闭进程

### 创建 systemd 配置文件

创建 `/etc/systemd/system/Clash-Meta.service` 输入以下内容
```bash
[Unit]
Description=Clash-Meta Daemon, Another Clash Kernel.
After=network.target NetworkManager.service systemd-networkd.service iwd.service

[Service]
Type=simple
LimitNPROC=500
LimitNOFILE=1000000
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
AmbientCapabilities=CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
Restart=always
ExecStartPre=/usr/bin/sleep 1s
ExecStart=/opt/clash -d /etc/clash

[Install]
WantedBy=multi-user.target
```

### 设置开机自启

```bash
# 开机启动
systemctl enable clash

systemctl start clash
```

### 问题

- `fake-ip` 模式下 ping 不到正确的解析

Ref: [pve lxc 环境下 安装配置 Clash Meta 作为透明网关](https://blog.fillpit.cn/pve-lxc-huan-jing-xia-an-zhuang-pei-zhi-clash-meta/)