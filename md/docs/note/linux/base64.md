
# Base64 加解码

### 加密

```bash
echo "hello" | base64

aGVsbG8K
```


### 解密

```bash
echo "aGVsbG8K" | base64 -d

hello
```