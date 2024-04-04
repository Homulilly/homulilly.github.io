# Repository and Manual DI

- [添加仓库和手动依赖项注入](https://developer.android.com/codelabs/basic-android-kotlin-compose-add-repository?hl=zh-cn#)
- [Github - 起始代码](https://github.com/google-developer-training/basic-android-kotlin-compose-training-mars-photos/tree/repo-starter)

修改 Mars Photos 应用，将应用拆分为界面层和数据层。  
在拆分数据层时实现仓库模式。  
使用依赖项注入创建松散耦合的代码库。

## 拆分界面层和数据层  
- 数据层负责应用的业务逻辑以及为应用寻源和保存数据。
- 界面层的关注点是显示所提供的数据。界面不再检索数据，因为这是数据层的关注点。  
- 数据层由一个或多个仓库组成。仓库本身包含零个或多个数据源。  

仓库类的作用：
- 向应用的其余部分公开数据。
- 集中管理数据更改。
- 解决多个数据源之间的冲突。
- 对应用其余部分的数据源进行抽象化处理。
- 存放业务逻辑。

## 创建数据层

仓库命名惯例是数据类型 + 仓库。

## 示例

在起始代码中，数据的获取是在 ViewModel 中进行的， `MarsApiService.kt` 中的 `object MarsApi { }` 单例对象作为数据来源的唯一实例。

:::: code-group
::: code-group-item MarsViewModel.kt
```kotlin
package com.example.marsphotos.ui.screens
// import ...
import com.example.marsphotos.network.MarsApi

/**
 * UI state for the Home screen
 */
sealed interface MarsUiState {
    data class Success(val photos: String) : MarsUiState
    object Error : MarsUiState
    object Loading : MarsUiState
}

class MarsViewModel : ViewModel() {
    /** The mutable State that stores the status of the most recent request */
    var marsUiState: MarsUiState by mutableStateOf(MarsUiState.Loading)
        private set

    /**
     * Call getMarsPhotos() on init so we can display status immediately.
     */
    init {
        getMarsPhotos()
    }

    /**
     * Gets Mars photos information from the Mars API Retrofit service and updates the
     * [MarsPhoto] [List] [MutableList].
     */
    fun getMarsPhotos() {
        viewModelScope.launch {
            marsUiState = MarsUiState.Loading
            marsUiState = try {
                val listResult = MarsApi.retrofitService.getPhotos()
                MarsUiState.Success(
                    "Success: ${listResult.size} Mars photos retrieved"
                )
            } catch (e: IOException) {
                MarsUiState.Error
            } catch (e: HttpException) {
                MarsUiState.Error
            }
        }
    }
}
```
:::

::: code-group-item MarsApiService.kt
```kotlin
package com.example.marsphotos.network
// import ...

    private const val BASE_URL =
        "https://android-kotlin-fun-mars-server.appspot.com"

    /**
     * Use the Retrofit builder to build a retrofit object using a kotlinx.serialization converter
     */
    private val retrofit = Retrofit.Builder()
        .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
        .baseUrl(BASE_URL)
        .build()

    /**
     * Retrofit service object for creating api calls
     */
    interface MarsApiService {
        @GET("photos")
        suspend fun getPhotos(): List<MarsPhoto>
    }

    /**
     * A public Api object that exposes the lazy-initialized Retrofit service
     */
    object MarsApi {
        val retrofitService: MarsApiService by lazy {
            retrofit.create(MarsApiService::class.java)
        }
}
```
:::
::::

首先创建一个 `MarsPhotosRepository` 的接口作为仓库
```kotlin
import com.example.marsphotos.model.MarsPhoto

interface MarsPhotosRepository {
    suspend fun getMarsPhotos(): List<MarsPhoto>
}

// 通过 NetworkMarsPhotosRepository 类进行实现

class NetworkMarsPhotosRepositiry() : MarsPhotosRepository {
    override suspend fun getMarsPhotos(): List<MarsPhoto> {
       return MarsApi.retrofitService.getPhotos()
   }
}
```

ViewModel 中的获取数据部分可以改为由 `NetworkMarsPhotosRepository` 提供，ViewModel 不再直接引用 MarsApi 代码。
```kotlin
val listResult = MarsApi.retrofitService.getPhotos()

// 修改为
import com.example.marsphotos.data.NetworkMarsPhotosRepository

val marsPhotosRepository = NetworkMarsPhotosRepository()
val listResult = marsPhotosRepository.getPhotos()
```

### 实现依赖项注入(DI)
依赖项注入是指在运行时提供依赖项，而不是将其硬编码到调用类中。  

- **有助于提高代码的可重用性**。代码不依赖于特定对象，从而提高灵活性。
- **使重构更轻松**。代码是松散耦合的，因此重构一段代码不会影响另一段代码。
- **有助于进行测试**。可以在测试期间传入测试对象。

需要实现实现一个为 `MarsViewModel` 提供仓库的应用容器。  
1. 右键点击 `data` 软件包，然后依次选择 `New` > `Kotlin Class/File`。
2. 在对话框中，选择 `Interface`，然后输入 `AppContainer` 作为接口的名称。
3. 在 `AppContainer` 接口内，添加一个名为 `marsPhotosRepository` 且类型为 `MarsPhotosRepository` 的抽象属性。
4. 在接口定义下，创建一个名为 `DefaultAppContainer` 的类来实现 `AppContainer` 接口。
5. 将 `network/MarsApiService.kt` 中 `BASE_URL`、`retrofit` 和 `retrofitService` 变量的代码移至 `DefaultAppContainer` 类，让它们都位于用于维护依赖项的容器中。

```kotlin 
interface AppContainer{
    val marsPhotosRepository: MarsPhotosRepository
}

class DefaultAppContainer : AppContainer {

    private val baseUrl =
        "https://android-kotlin-fun-mars-server.appspot.com"

    /**
     * Use the Retrofit builder to build a retrofit object using a kotlinx.serialization converter
     */
    private val retrofit = Retrofit.Builder()
        .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
        .baseUrl(baseUrl)
        .build()

    private val retrofitService: MarsApiService by lazy {
        retrofit.create(MarsApiService::class.java)
    }

    override val marsPhotosRepository: MarsPhotosRepository by lazy {
        NetworkMarsPhotosRepository(retrofitService)
    }
}
```

可以移除之前的 `object MarsApi { }`

### 将容器添加到应用
创建文件 `MarsPhotosApplication.kt`  

```kotlin
package com.example.marsphotos

import android.app.Application
import com.example.marsphotos.data.AppContainer
import com.example.marsphotos.data.DefaultAppContainer

class MarsPhotosApplication : Application() {
    lateinit var container: AppContainer
    override fun onCreate() {
        super.onCreate()
        container = DefaultAppContainer()
    }
}
```

更新 `manifests/AndroidManifest.xml` 

```kotlin
<application
    // 添加 name 
    android:name=".MarsPhotosApplication"
    android:allowBackup="true"
```

### 将仓库添加到 ViewModel

```kotlin 
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.example.marsphotos.MarsPhotosApplication

companion object {
   val Factory: ViewModelProvider.Factory = viewModelFactory {
       initializer {
           val application = (this[APPLICATION_KEY] as MarsPhotosApplication)
           val marsPhotosRepository = application.container.marsPhotosRepository
           MarsViewModel(marsPhotosRepository = marsPhotosRepository)
       }
   }
}
```

```kotlin 
Surface(
            // ...
        ) {
            val marsViewModel: MarsViewModel = viewModel(factory = MarsViewModel.Factory)
            // ...
        }
```