# Kotlin basic with Compose

## First App
### Android Studio 下载
>[https://developer.android.com/studio?hl=zh-cn](https://developer.android.com/studio?hl=zh-cn)

设置字体：Source Code Pro  
安装主题：开启 `New UI` > One Dark Theme


### 创建首个 Android 应用
- [Codelab - 创建您的首个 Android 应用](https://developer.android.com/codelabs/basic-android-kotlin-compose-first-app?hl=zh-cn#0)
- [Youtube - Create your first Android App](https://www.youtube.com/watch?v=eHa84AXEPQY)

创建项目：`New Project` > `Empty Activity`

创建项目后，在 `MainActivity.kt` 查看 Compose 的示例代码 ：

``` kotlin 
// 包名
package com.example.codelabfirstapp

import ...

// 1
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CodelabFirstAppTheme {
                // A surface container using the 'background' color from the theme
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Greeting("Android")
                }
            }
        }
    }
}

// 2
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "Hi, My Name is $name!", modifier = modifier )
}

// 3
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    CodelabFirstAppTheme {
        Greeting("Android")
    }
}
```
#### 1. onCreate()
>`onCreate()` 函数是此应用的入口点，并且会调用其他的函数来构建 UI。 在 Kotlin 程序中， main() 函数是 Kotlin 编译器在代码中开始编译的特定位置；在 Android 中，则是由 onCreate() 函数来担任这个角色。

>`onCreate()` 函数中的 `setContent()` 函数用于通过可组合函数定义布局。任何标有 `@Composable` 注解的函数都可通过 `setContent()` 函数或其他可组合函数进行调用。该注解可告知 Kotlin 编译器 Jetpack Compose 使用的这个函数会生成 UI。

#### 2. Greeting()
- `@Composable` 函数名称采用首字母大写形式。
- 需在该函数前面添加 `@Composable` 注解。
- `@Composable` 函数无法返回任何内容。

#### 3. @Preview
预览函数，可以无需重新编译的情况下进行预览。

### 更改背景颜色

`Greeting()` 修改后：
```kotlin
import androidx.compose.ui.graphics.Color

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Surface(color = Color.Magenta) {
        Text(text = "Hi, My Name is $name!", modifier = modifier )
    }
}
``` 
使用 `Surface()` 将 `Text()` 包起来，然后设置 `Surface()` 的属性。

### 添加内间距  
设置 `Text()` 的 `modifer`
```kotlin
import androidx.compose.ui.unit.dp
import androidx.compose.foundation.layout.padding

//...
    Text(text = "Hi, My Name is $name!", modifier = Modifier.padding(24.dp))
//...
```

## 构建基本布局   
### Jetpack Compose  
- 声明式界面设计
- 在 Compose 界面中 函数组合 在创建后是不可变的，无法进行修改
- 当界面需要更新时，Compose 会自动重新执行可组合函数，呈现新的界面  
- 因此如果需要更新界面，只需将相关信息传递给 Compose 的组合函数
- Compose 会智能跳过未变动的元素

Compose 函数[命名规则](https://github.com/androidx/androidx/blob/androidx-main/compose/docs/compose-api-guidelines.md#naming-unit-composable-functions-as-entities)：  
- 必须是名词：DoneButton()
- 不能是动词或动词短语：DrawTextField()
- 不能是名词性介词：TextFieldWithLink()
- 不能是形容词：Bright()
- 不能是副词：Outside()
- 名词可以添加描述性形容词作为前缀：RoundIcon()

三个基本标准布局元素： `Column`、`Row`、`Box`， [Compose 布局基础知识](https://developer.android.com/jetpack/compose/layouts/basics?hl=zh-cn)