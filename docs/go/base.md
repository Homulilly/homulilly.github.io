# Go 基础

在线运行代码: [The Go Playground](https://go.dev/play/)

## Hello World
`hello.go`
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World!")
}
```

运行

```go
$ go run hello.go 

Hello, World!
```

## 数据类型 
[Go 语言数据类型](https://www.runoob.com/go/go-data-types.html) 

### 基本数据类型 
#### 1. 布尔型 
  - 表示逻辑值，`true` or `false`

#### 2. 数字类型 
  - 整数类型 
    - 无符号 `uint8`、`uint16`、`uint32`、`uint64`
    - 有符号 `int8`、`int16`、`int32`、`int64`
  - 浮点型 `float32`、 `float64`、 `complex64`、 `complex128`  
  - 其他数字类型类型 `byte`、`rune`、`unit`、`int`、 `uintptr`

#### 3. 字符串类型 (`string`)
  - 用于表示 UTF-8 字符串，是不可变的。 

### 派生类型:
  - 指针类型（Pointer）
  - 数组类型
  - 结构化类型(struct)
  - Channel 类型
  - 函数类型
  - 切片类型
  - 接口类型（interface）
  - Map 类型

## 变量
### 变量的声明 

一般使用 `var` 关键字，可以一次声明多个
```go
var name type
// 可以一次声明多个
var name1, name2 type

// 可以自动推断类型
var name = value

// 短变量声明运算符 := ，自动推断变量类型，只能用于局部变量，不可用于全局变量
name := value
// 等同于
var name type
name = value
```

如果没有初始化，则变量默认为零值
  - 数值类型（包括complex64/128）为 0
  - 布尔类型为 false
  - 字符串为 ""（空字符串）
  - 以下几种类型为 nil：
  ```go
  var a *int
  var a []int
  var a map[string] int
  var a chan int
  var a func(string) int
  var a error // error 是接口
  ```

## 常量 
使用 `const` 关键字
```go
const identifier [type] = value
```

### iota 
iota，特殊常量，可以认为是一个可以被编译器修改的常量。

iota 在 `const` 关键字出现时将被重置为 0(const 内部的第一行之前)，`const` 中每新增一行常量声明将使 iota 计数一次(iota 可理解为 const 语句块中的行索引)。

```go
const (
    a = iota
    b = iota
    c = iota
)

// 等同于
const (
    a = iota
    b 
    c 
)
```

```go
package main

import "fmt"

func main() {
    const (
            a = iota   //0
            b          //1
            c          //2
            d = "ha"   //独立值，iota += 1
            e          //"ha"   iota += 1
            f = 100    //iota +=1
            g          //100  iota +=1
            h = iota   //7,恢复计数
            i          //8
    )
    fmt.Println(a,b,c,d,e,f,g,h,i)
}
```

运行结果
```sh
0 1 2 ha ha 100 100 7 8
```

## 运算符
### 算术运算符 
假定 A 值为 10，B 值为 20。   
| 运算符 | 描述   | 实例                |
|:--------:|--------|---------------------|
| `+`      | 相加   | `A + B 输出结果 30` |
| `-`      | 相减   | `A - B 输出结果 -10`|
| `*`      | 相乘   | `A * B 输出结果 200`|
| `/`      | 相除   | `B / A 输出结果 2`  |
| `%`      | 求余   | `B % A 输出结果 0`  |
| `++`     | 自增   | `A++ 输出结果 11`   |
| `--`     | 自减   | `A-- 输出结果 9`    |

### 关系运算符

假定 A 值为 10，B 值为 20。 

| 运算符  | 描述                                                        | 实例                 |
|---------|-------------------------------------------------------------|----------------------|
| `==`    | 检查两个值是否相等 <br > 如果相等返回 True 否则返回 False。       | `(A == B) 为 False`  |
| `!=`    | 检查两个值是否不相等 <br > 如果不相等返回 True 否则返回 False。   | `(A != B) 为 True`   |
| `>`     | 检查左边值是否大于右边值 <br > 如果是返回 True 否则返回 False。   | `(A > B) 为 False`   |
| `<`     | 检查左边值是否小于右边值 <br > 如果是返回 True 否则返回 False。   | `(A < B) 为 True`    |
| `>=`    | 检查左边值是否大于等于右边值 <br > 如果是返回 True 否则返回 False。| `(A >= B) 为 False`  |
| `<=`    | 检查左边值是否小于等于右边值 <br > 如果是返回 True 否则返回 False。| `(A <= B) 为 True`   |

### 逻辑运算符

假定 A 值为 True，B 值为 False。

| 运算符 | 描述                                                        | 实例              |
|--------|-------------------------------------------------------------|-------------------|
| `&&`     | 逻辑 AND 运算符 <br > 如果两边的操作数都是 True，则条件 True，否则为 False。        | `(A && B) 为 False` |
| `\|\|`   | 逻辑 OR 运算符 <br > 如果两边的操作数有一个 True，则条件 True，否则为 False。    | `(A \|\| B) 为 True`  |
| `！`     | 逻辑 NOT 运算符 <br > 如果条件为 True，则逻辑 NOT 条件 False，否则为 True。。    | `!(A && B) 为 True`  |


### 位运算符

  - `&` : 按位与
  - `|` ：按位或
  - `^` : 按位异或
  - `<<` : 左移运算符，双目运算符。左移 n 位就是乘以 2 的 n 次方。 其功能把 `<<` 左边的运算数的各二进位全部左移若干位，由 `<<` 右边的数指定移动的位数，高位丢弃，低位补0。
  - `>>` : 右移运算符，是双目运算符。右移 n 位就是除以 2 的 n 次方。 其功能是把 `>>` 左边的运算数的各二进位全部右移若干位， `>>` 右边的数指定移动的位数。

| `p` | `q` | `p&q` | `p\|q` | `p^q` |
|---|---|-------|-------|-------|
| 0 | 0 |   0   |   0   |   0   |
| 0 | 1 |   0   |   1   |   1   |
| 1 | 1 |   1   |   1   |   0   |
| 1 | 0 |   0   |   1   |   1   |

假定 A = 60; B = 13; 其二进制数转换为：
```go
A = 0011 1100
B = 0000 1101

// -----------------

A&B = 0000 1100
A|B = 0011 1101
A^B = 0011 0001
```