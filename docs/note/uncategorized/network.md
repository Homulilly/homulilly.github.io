# Network

## 添加静态路由
### ip
  ```
  ip route add 10.5.5.0/24 via x.x.x.x
  ip route del 10.5.5.0/24 via x.x.x.x
  ```
### route
  ```
  route add -net 10.5.5.0/24 gw x.x.x.x
  route del -net 10.5.5.0/24 gw x.x.x.x
  ```

## iptables 
### Forword 80 to 2000
```
iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 2000
```

### Forword port use iptables
```
iptables -t nat -A PREROUTING -p tcp -m tcp --dport <port> -j DNAT --to-destination <host>:<port>
```

### SNAT
```
iptables -t nat -A POSTROUTING -p tcp -s x.x.x.x --sport <port> -d x.x.x.x -j SNAT to x.x.x.x
```

### 限制流量
`eth0` 发送流量到达 100GB 时丢弃 443 端口流量
```sh
apt install vnstat bc
```

```bash
#!/bin/bash

# 以字节为单位设置限制流量，100GB = 100 * 1024 * 1024 * 1024
LIMIT=107374182400
# Test 1GB
# LIMIT=1073741824
INTERFACE="eth0"

TX_STR=$(vnstat -m -i $INTERFACE --oneline | awk -F';' '{print $9}')
VALUE=$(echo $TX_STR | awk '{print $1}')
UNIT=$(echo $TX_STR | awk '{print $2}')

case $UNIT in
  KiB)
    VALUE=$(echo "$VALUE * 1024" | bc)
    ;;
  MiB)
    VALUE=$(echo "$VALUE * 1024 * 1024" | bc)
    ;;
  GiB)
    VALUE=$(echo "$VALUE * 1024 * 1024 * 1024" | bc)
    ;;
esac

# echo "TX (in bytes): $VALUE"

# 如果流量超过限制
if [ $VALUE -gt $LIMIT ]; then
  # 检查 iptables 规则是否已存在
  EXISTS=$(iptables -L -n | grep "443" | wc -l)
  # 如果规则不存在，则添加丢弃访问 443 端口的流量的规则
  if [ $EXISTS -eq 0 ]; then
    iptables -A INPUT -p tcp --destination-port 443 -j DROP
  fi
else
  # 否则，删除丢弃访问 443 端口的流量的规则（如果存在）
  iptables -D INPUT -p tcp --destination-port 443 -j DROP 2>/dev/null
fi
```

`crontab -e` 设置 每小时运行
```
0 * * * * /pathto/100.sh
```