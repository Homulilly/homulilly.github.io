# 笔记

### IntelliJ 手动导入依赖
未使用 Gradle 时，可以通过打开菜单 `文件` > `项目结构` > `模块`， 右侧点击 `依赖` 标签页， 再点击 `+`，选择 `库` > `来自 Maven ...`  
在弹出的窗口中，搜索依赖包名   

### 测试执行耗时
```kotlin 
import kotlin.system.measureTimeMillis 

fun main(){
    val time = measureTimeMillis{
        runBlocking {
            //...
        }
    }

    println("Execution time: ${time / 1000} seconds")
}
```