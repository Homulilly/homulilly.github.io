---
title: Network
---

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

