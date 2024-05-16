# Go 循环结构

## 1. 标准的 `for` 循环 

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}
```

这段代码会输出 0 到 9 的数字。

## 2. 类似 `while` 的 `for` 循环

```go
i := 0
for i < 10 {
    fmt.Println(i)
    i++
}
``` 
这将打印出 0 到 9 的数字，直到 i 大于或等于 10。

## 3. 无限循环
如果 for 循环中省略了条件表达式，循环将无限进行，直到内部某处调用 break 语句或发生类似中断的事件。
```go
for {
    fmt.Println("无限循环")
    break // 这里打断循环
}
```

### 4. 遍历数组、切片、字符串或映射
使用 for 循环结合 range 关键字可以方便地遍历数组、切片、字符串或映射的元素。range 返回当前索引或键和相应的值。
```go
nums := []int{1, 2, 3}
for index, value := range nums {
    fmt.Printf("索引：%d, 值：%d\n", index, value)
}
```
这段代码遍历切片 nums，打印每个元素的索引和值。