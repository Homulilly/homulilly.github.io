# Go 函数

## 声明
### 返回值
使用 `func` 关键字定义。 可以有参数和返回值。

```go
// 没有返回值
func log(message string) {
    fmt.Println(message)
}

// 有一个返回值
func add(x int, y int) int {
    return x + y
}

// 有多个返回值
func swap(x, y string) (string, string) {
    return y, x
}
```

### 可见性 
函数名以大写字母开头为 `Public` ，可以被其他包（package）访问。  
函数名以小写字母开头为 `Private` ， 只能被同一个包内的其他代码访问。

### 可变参数
Go 允许函数接受可变数量的参数，这通过在参数类型前加 `...` 来指定，放在参数最后的位置。
```go
func sum(args ...int) int {
	total := 0
	for _, arg := range args {
		total += arg
	}

	return total
}
```

```go
// 至少有一个参数
func sum(a int, args ...int) int {
}
```