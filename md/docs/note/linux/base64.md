
# Base64 加解码

### 加密

```bash
echo "hello" | base64

aGVsbG8K
```

也可以使用 cat 加密文件中的内容
```
cat file | base64
```

### 解密

```bash
echo "aGVsbG8K" | base64 -d

hello
```