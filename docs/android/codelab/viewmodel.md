# ViewModel

[Compose 中的 ViewModel 和状态](https://developer.android.com/codelabs/basic-android-kotlin-compose-viewmodel-and-state?hl=zh-cn#0)

### 依赖
```
implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.1")
```

### 使用

创建数据类 `GameUiState.kt`
```kotlin
data class GameUiState(
    val currentScrambledWord: String = "",
    val isGuessedWordWrong: Boolean = false,
    val score: Int = 0,
    val currentWordCount: Int = 1,
    val isGameOver: Boolean = false
)
```

创建 ViewModel `GameViewModel.kt`
```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.lifecycle.viewmodel.compose.viewModel
// ...

@Composable
class GameViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(GameUiState())
    val uiState: StateFlow<GameUiState> = _uiState.asStateFlow()

    fun updateUiState(){
        _uiState.update {
            it.copy(
                //...
            )
        }
    }
}
```

调用 `GameScreen.kt`
```kotlin
@Composable
fun GameScreen(
    gameViewModel: GameViewModel = viewModel()
){
    val gameUiState by gameViewModel.uiState.collectAsState() 

    //....
}
```