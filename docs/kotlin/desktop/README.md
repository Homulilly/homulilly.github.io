# 笔记

### 读取 JSON 文件

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

### 设置剪贴板

```kotlin
import androidx.compose.ui.text.AnnotatedString

val clipboardManager = androidx.compose.ui.platform.LocalClipboardManager.current

clipboardManager.setText(AnnotatedString("StringText"))
```

### 设置滚动
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

