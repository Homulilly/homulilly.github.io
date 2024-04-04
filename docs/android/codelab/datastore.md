# Preferences DataStore

使用 `Preferences DataStore` 可以方便的保存偏好设置

### 添加依赖

```
implementation("androidx.datastore:datastore-preferences:1.0.0")
```

### 实现 UserPreferencesRepository

数据类 `LocalPreference`
```kotlin
data class LocalPreference(
    val botToken: String = "",
    val chatId: String = ""
)
```

```kotlin 
class UserPreferencesRepository(
    private val dataStore: DataStore<Preferences>
){  
    // 设置 key 的名称常量
    private companion object {
        val BOT_TOKEN = stringPreferencesKey("bot_token")
        val CHAT_ID = stringPreferencesKey("chat_id")
        // Log TAG
        const val TAG = "UserPreferencesRepo"
    }

    // 读取
    val userPreferences: Flow<LocalPreference> = dataStore.data
        .catch {
            // 未存在时报错 IOException 
            // 生成一个空的配置 
            if(it is IOException){
                Log.e(TAG, "Error reading preferences.", it)
                emit(emptyPreferences())
            } else {
                throw it
            }
        }
        .map { preferences ->
            // 返回给 Flow
            LocalPreference(
                preferences[BOT_TOKEN] ?: "",
                preferences[CHAT_ID] ?: ""
            )
        }

    // 保存
    suspend fun savePreference(botToken: String, chatId: String) {
        dataStore.edit { preferences ->
            preferences[BOT_TOKEN] = botToken
            preferences[CHAT_ID] = chatId
        }
    }
}
```

### Application  
编辑 `AndroidManifest.xml`  
```
<application
        android:name=".AppApplication"
```

创建 `AppApplication.kt`
```kotlin
private const val PREFERENCE_NAME = "user_preferences"
private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(
    name = PREFERENCE_NAME
)

class AppApplication: Application() {
    lateinit var userPreferencesRepository: UserPreferencesRepository

    override fun onCreate() {
        super.onCreate()
        userPreferencesRepository = UserPreferencesRepository(dataStore)
    }
}
```

ViewModel 添加 Factory
```kotlin
companion object {
        val Factory: ViewModelProvider.Factory = viewModelFactory {
            initializer {
                val application = (this[APPLICATION_KEY] as AppApplication)
                HomeViewModel(application.userPreferencesRepository)
            }
        }
    }
```

Screen 适配   
```kotlin
@Composable
fun HomeScreen(
    modifier: Modifier = Modifier,
    // homeViewModel: HomeViewModel = viewModel()
    // 修改为下面的
    homeViewModel: HomeViewModel = viewModel(
        factory = HomeViewModel.Factory
    )
){ 
    // ...
}
```

### ViewModel 中调用
```kotlin 
class HomeViewModel(
    private val userPreferencesRepository: UserPreferencesRepository
): ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    // 初始化时读取配置
    init {
        viewModelScope.launch {
            try {
                userPreferencesRepository.userPreferences.collect(){ preferences ->
                    // updateLog(preferences.toString())
                    _uiState.update {
                        it.copy(
                            botToken = preferences.botToken,
                            chatId = preferences.chatId
                        )
                    }
                }
            } catch (e: Exception) {
                updateLog(e.toString())
            }
        }
    }

    // 保存配置 
    fun savePreferences(){
        viewModelScope.launch {
            userPreferencesRepository.savePreference(uiState.value.botToken, uiState.value.chatId)
        }
    }
}

data class HomeUiState(
    val botToken: String = "",
    val chatId: String = "",
)
```