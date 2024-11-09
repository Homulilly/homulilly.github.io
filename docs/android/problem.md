# Problem Meets

## Compose 中无法使用 LazyColumn 的 items

```kotlin
LazyColumn {
    items(amphibians) { amphibian ->
        AmphibianCard(amphibian = amphibian, modifier = Modifier.fillMaxSize())}
}
```

报错 
::: danger Error
Argument type mismatch: actual type is 'kotlin. collections. List<com. example. amphibians. model. Amphibian>', but 'kotlin. Int' was expected.
:::

手动导入下面的即可
```kotlin 
import androidx.compose.foundation.lazy.items
```

或是使用下面的代码
```kotlin
LazyColumn {
    items(amphibians.size) { index ->
        AmphibianCard(amphibian = amphibians[index], modifier = Modifier.fillMaxSize())}
}
```

### mutableStateOf 

Android Studio 无法自动导入的部分

```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
```
