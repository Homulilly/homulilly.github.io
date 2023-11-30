# Command

### Sudo Without Password
add to `/etc/sudoers`
```bash
# all commands
username ALL=(ALL) NOPASSWD: ALL
# specific command
username ALL=(ALL) NOPASSWD: /usr/bin/apt*, command2
```

### grep no grep
```sh
ps aux | grep word | grep -v grep
ps aux | grep [w]ord
```