# Windows

## Windows 11
### 安装时没有网络

按下 Shift+F10 打开命令提示符，输入 `oobe\BypassNRO.cmd` 即可重启进入带有跳过按钮的 OOBE。

### 创建本地账户

在安装 Windows 11 时，使用用户名 `no@thankyou.com` 登录，即可跳过联网账户，创建本地账户。

## Tips
### 删除文件提示 "该项目不在 ..."
创建 `bat` 文件
```bat
DEL /F /A /Q \\?\%1
RD /S /Q \\?\%1
```

然后将对应文件拖到该 bat 文件即可