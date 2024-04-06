# GoAccess

### 安装
```bash 
# apt on Ubuntu 16.04
sudo apt install goaccess
```

### Config with Nginx

将下面的配置添加到 `/etc/goaccess.conf` 中

```txt
color_scheme 1
time-format %H:%M:%S
date_format %d/%b/%Y
# NCSA Combined Log Format
log_format %h %^[%d:%^] "%r" %s %b "%R" "%u"
```

### 使用方法

```sh
goaccess -f /var/log/nginx/access.log
cat /var/log/nginx/access.log | goaccess > output.html
#for access.log.*.gz
zcat /var/log/nginx/access.log.*.gz | goaccess > output.html
```

---

**Ref:** [GoAccess Official Site](https://goaccess.io/)