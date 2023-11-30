# 笔记

## 读取 JSON 文件
### org.json:json
设置 `build.gradle.kts`
```kotlin
implementation("org.json:json:20230227")
```

```kotlin
import org.json.JSONObject
import java.io.File

fun readJsonFile(filePath: String): JSONObject {
    val jsonString = File.(filePath).readText(Charsets.UTF_8)
    return JSONObject(jsonString)
}
```

### kotlinx.serialization
设置 `build.gradle.kts`
```kotlin 
plugins {
    kotlin("plugin.serialization") version "1.5.0"
}

implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.5.0")
```

序列与反序列化 JsonArray
```kotlin
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import java.io.File

// 定义数据类
@Serializable
data class Person(val name: String, val age: Int)

val person = Person("Alice", 18)
val jsonString = Json.encodeToString(person) // {"name": "Alice", "age": "18"}
val deserializedPerson = Json.decodeFromString<Person>(jsonString) // Person("Alice", 18)

// For JsonArray: [{}, {}, {}] 
// 读取文件
fun readJsonFile(file: File): List<Person> {
    val jsonString = file.readText()
    return Json.decodeFromString(ListSerializer(Person.serializer()), jsonString)
}
// 写入文件
fun writeJsonFile(file: File, persons: List<Person>) {
    val jsonString = Json.encodeToString(ListSerializer(Person.serializer()), persons)
    file.writeText(jsonString)
}
```

## 设置剪贴板

```kotlin
import androidx.compose.ui.text.AnnotatedString

val clipboardManager = androidx.compose.ui.platform.LocalClipboardManager.current

clipboardManager.setText(AnnotatedString("StringText"))
```

## 设置滚动
```kotlin
import androidx.compose.foundation.rememberScrollState

val scrollState = rememberScrollState()

Column (modifier = Modifier
               .fillMaxSize()
               .weight(0.8f)
               .verticalScroll(scrollState))
        {
         //...   
        }
```

显示滚动条
```kotlin
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.rememberScrollbarAdapter
import androidx.compose.foundation.verticalScroll

val scrollState = rememberScrollState()
Row{
    Column (modifier = Modifier
               .fillMaxSize()
               .weight(0.8f)
               .verticalScroll(scrollState))
        {
         //...   
        }
    VerticalScrollbar(
        modifier = Modifier.fillMaxHeight().padding(end = 8.dp),
        adapter = rememberScrollbarAdapter(scrollState)
    )
}

```

