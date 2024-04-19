# Command

## Sudo Without Password
add to `/etc/sudoers`
```bash
# all commands
username ALL=(ALL) NOPASSWD: ALL
# specific command
username ALL=(ALL) NOPASSWD: /usr/bin/apt*, command2
```

## grep no grep
```sh
ps aux | grep word | grep -v grep
ps aux | grep [w]ord
```

## ln 软连接

```sh
ln -s "源文件路径" "访问路径"
```

可以使用 `ls -l` 查看