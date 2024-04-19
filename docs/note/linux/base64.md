
# Linux Base64 加解码

## 加密

```bash
echo "hello" | base64

aGVsbG8K
```

输出加密后的文件内容
```sh
base64 filename
```

也可以使用 cat 加密文件中的内容
```sh
cat filename | base64
```

移除输出的换行，设置行宽(`-w`)为 0 
```sh
base64 filename -w 0 

cat filename | base64 -w 0
```

## 解密
```bash
echo "aGVsbG8K" | base64 -d

hello
```

## 解密文件  

```sh 
base64 -d filename

cat filename | base64 -d 
```

解密时提示 `base64: invalid input` ，可能是由于使用 Windows 编辑过，换行变成了 `\r\n`
```sh
cat filename.txt | tr -d '\r\n' | base64 -d
```