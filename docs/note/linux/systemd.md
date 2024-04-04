# Systemd

### 相关的路径
- `/etc/systemd/system/*` - 供系统管理员和用户使用
- `/run/systemd/system/*` - 运行时配置文件
- `/usr/lib/systemd/system/*` - 安装程序使用

### 基本命令
- 显示状态：`systemctl status`
- 显示激活的单元：`systemctl / systemctl list-units`
- 控制与状态相关：`systemctl start/stop/reload/status <单元>`
- 开机启动相关：`systemctl is-enabled/enable/disable <单元>`
- 禁用与恢复：`systemctl mask/unmask <单元>`
- 显示帮助：`systemctl help <单元>`
- 重载 Systemd：`systemctl daemon-reload`

### 单元文件内容
一个Systemd Service的服务配置文件大概长这样：
```bash
[Unit]
Description = some descriptions
Documentation = man:xxx(8) man:xxx_config(5)
Requires = xxx1.target xxx2.target
After = yyy1.target yyy2.target

[Service]
Type = <TYPE>
ExecStart = <CMD_for_START>
ExecStop = <CMD_for_STOP>
ExecReload = <CMD_for_RELOAD>
Restart = <WHEN_TO_RESTART>
RestartSec = <TIME>

[Install]
WantedBy = xxx.target yy.target
```

一个 `.Service` 配置文件分为三部分：

- **Unit**：定义该服务作为Unit角色时相关的属性
- **Service**：定义本服务相关的属性
- **Install**：定义本服务在设置服务开机自启动时相关的属性。换句话说，只有在创建/移除服务配置文件的软链接时，Install 段才会派上用场。这一配置段不是必须的，当未配置 [Install] 时，设置开机自启动或禁止开机自启动的操作将无任何效果

#### `[Unit]` - 记录unit文件的通用信息
- `Description`： 描述内容
- `Requires`： 依赖的服务，若选择单元未启动，则本单元启动失败
- `Wants`： 依赖的服务，但选择单元未启动，对本单元无影响
- `After` / `Before`： 定义启动顺序

#### `[Service]` - 记录 [Service](https://www.freedesktop.org/software/systemd/man/systemd.service.html) 的信息
- `Type`： 服务启动方式  
- `User` / `Group`： 用户/用户组
- `ExecStart` ： 启动时执行的命令
- `ExecStartPre`, `ExecStartPost`:  ExecStart执行前后所调用的命令。
- `ExecStop`: 定义停止服务时所执行的命令，定义服务退出前所做的处理。如果没有指定，使用systemctl stop xxx命令时，服务将立即被终结而不做处理。
- `Restart`: 定义服务何种情况下重启（启动失败，启动超时，进程被终结）。可选选项：no, on-success, on-failure,on-watchdog, on-abort  

#### `[Install]` - 安装信息
- `WantedBy`： 何种情况下，服务被启用。`WantedBy=multi-user.target` （多用户环境下启用）
- `Alias`： 别名

#### Ref:
 - [Archwiki - Systemd](https://wiki.archlinux.org/index.php/systemd)
 - [编写systemd下服务脚本](http://blog.csdn.net/fu_wayne/article/details/38018825)
 - [Writing systemd service files](https://patrakov.blogspot.com/2011/01/writing-systemd-service-files.html)
 - [Systemd系列文章](https://systemd-book.junmajinlong.com/service_1.html)