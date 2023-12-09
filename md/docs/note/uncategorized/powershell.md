# PowerShell Tips

### 使用 `&&`

使用 `;` 即可，例如  
```
hexo g; hexo s
```

### 设置 `alias` 

首先要允许脚本执行。

在配置文件 `note $profile` 中添加

```
function 别名 { 需要替代的命令，可以包含空格 }
```
例如：
```
function hd {hexo clean; hexo generate; hexo deploy}
```

启动 PowerShell 后可以直接运行 `hd` 替代
```
hexo clean; hexo generate; hexo deploy
```
Ref: 
- [为 Windows PowerShell 设置 User Alias （命令别名）](https://blog.vvzero.com/2019/07/22/set-user-alias-for-windows-PowerShell/)
- [About Alias - Microsoft](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_aliases?view=powershell-7.3)

### PowerShell 中使用 `curl` 无法接受参数

例如 `curl ip.sb -4` 报错
```
Invoke-WebRequest : 找不到接受实际参数“-4”的位置形式参数。
所在位置 行:1 字符: 1
...
```

这是因为 在 PowerShell 中，`curl` 是 `Invoke-WebRequest` 的别名，可以使用下面的命令移除该别名，直接使用 `curl`
```
Remove-Item alias:curl
```
如果需要持久生效，需要将该命令保存到 `$profile` 文件中。

### `.gitignore` 不生效

如果在 Powershell 中使用 `echo` 创建 `.gitignore`，文件的编码是 `UTF-16LE` 不是 `UTF-8`
重新创建即可