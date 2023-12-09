# Python QRCode

##

[Pure python QR Code generator](https://github.com/lincolnloop/python-qrcode)

```sh
pip install qrcode
```

```python
import qrcode
# 生成二维码
img = qrcode.make(data="你好")
# 将二维码保存为图片
img.save('test.png')

# with open('test.png', 'wb') as f:
#     img.save(f)
```

参考：[Python生成二维码竟然只要一行代码](https://cloud.tencent.com/developer/article/1624826)