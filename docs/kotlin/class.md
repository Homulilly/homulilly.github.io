# 类与接口

## 类的构造方法

```kotlin 
class SimpleClass(x: Int){
    var x: Int
    constructor(x: Int){
        this.x = x
    } 
    //...
}

// 简化
class SimpleClass constructor (x: Int){
    var x: Int = x 

    //...
}

// 简化
class SimpleClass (x: Int){
    var x: Int = x
    //...
}

// 简化
class SimpleClass(var x: Int){
    //...
}
```

## 接口
### 定义
```kotlin
interface SimpleInf {
    fun simpleMethod()
}
```
### 实现
```kotlin
class SimpleClass(var x: Int)
        :SimpleInf{
    //...
    Override fun simpleMethod(){
    }
}
```

## 抽象类
```kotlin
//定义一个抽象类
abstract class Animal {
    //抽象方法
    abstract fun makeSound()

    //非抽象方法
    fun sleep(){
        println("sleeping")
    }
}
// 定义一个子类，继承抽象类
class Dog : Animal() {
    override fun makeSound() {
        println("WONG")
    }
}

fun main(){
    // 不能直接实例化抽象类
    // val animal = Animal()

    // 可以实例化子类
    val dog = Dog()

    dog.makeSound() //输出：WONG
    dog.sleep() //输出: Sleeping
}
```
