# CRLF

- 在 Unix 和 Linux 系统中，通常使用 `\n`，这在英文中称为 "Line Feed" (LF)。
- 在 Windows 系统中，使用 `\r\n` 组合，其中 `\r` 表示 "Carriage Return" (CR)，而 `\n` 依然表示 "Line Feed" (LF)。这种组合通常被称作 "Carriage Return Line Feed" (CRLF)。
- 在老式的 Mac OS 系统中，仅使用 `\r`，称为 "Carriage Return" (CR)。

## 查看文件中的换行符类型
1. 使用 `cat`
```sh
cat -v filename
```
换行结尾有 `^M` 是 `\r\n`  

```sh
cat -A filename
```
换行结尾为 `$` 是 `\n`  
换行结尾为 `^M$` 是 `\r\n`  

2. 使用 `vim` 

```sh
vim -b filename
```

如果文件结尾显示 `^M` 是 `\r\n`  

3. 使用 `od`
```sh 
od -c filename | head
```
可以直接查看换行部分是 `\n` 还是 `\r\n` 

## 批量替换换行符
将 `\r\n` 替换为 `\n`:
```sh
sed -i 's/\r$//' filename
```
将 `\n` 替换为 `\r\n`:

```sh
# 输出到新文件
awk 'NR > 1 { printf "\r\n" }; { printf "%s", $0 }' filename.txt > newfile.txt
```

