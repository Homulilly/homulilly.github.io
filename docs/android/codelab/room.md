# Room

- [使用 Room 持久保留数据](https://developer.android.com/codelabs/basic-android-kotlin-compose-persisting-data-room?hl=zh-cn)

Room 的以下三个组件可以使这些工作流变得顺畅。
 - Room 实体表示应用数据库中的表。您可以使用它们更新表中的行所存储的数据，以及创建要插入的新行。
 - Room DAO 提供了供应用在数据库中检索、更新、插入和删除数据的方法。
 - Room Database 类是一个数据库类，可为您的应用提供与该数据库关联的 DAO 实例。

### 依赖
KSP Plugins
```kotlin 
//Room
implementation("androidx.room:room-runtime:2.6.1")
ksp("androidx.room:room-compiler:2.6.1")
implementation("androidx.room:room-ktx:2.6.1")
```

`build.gradle.kts (Project)` > `plugins` 
```kotlin
id("org.jetbrains.kotlin.android") version "2.0.20" apply false
// kotlin 2.0+ must have it
id("org.jetbrains.kotlin.plugin.compose") version "2.0.20" apply false
```

`build.gradle.kts (Module: app)` > `plugins` 
```kotlin
id("com.google.devtools.ksp") version "2.0.20-1.0.24"
id("org.jetbrains.kotlin.plugin.compose") version "2.0.20"
```

version catalogs
`libs.versions.toml`
```
[versions]
kotlin="2.0.20"
ksp="2.0.20-1.0.24"
room="2.6.1"

[libraries]
# room 
androidx-room-compiler = { group = "androidx.room", name = "room-ktx", version.href = "room"}
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.href = "room"}
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.href = "room"}


[plugins]
kotlin-compose = { id = "org.jetbrains.kotlin.plugin.compose", version.ref = "kotlin" }
google-ksp = { id = "com.google.devtools.ksp", version.ref = "ksp"}

[bundles]
room = ["androidx-room-runtime", "androidx-room-ktx"]
```

`build.gradle.kts (Project)` > `plugins` 
```kotlin
alias(libs.plugins.kotlin.compose) apply false
alias(libs.plugins.google.ksp) apply false
```

`build.gradle.kts (Module: app)` > `plugins`
```kotlin
alias(libs.plugins.kotlin.compose)
alias(libs.plugins.google.ksp)
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
implementation(libs.bundles.room)
ksp(libs.androidx.room.compiler)
```

### 创建 item 实体
使用 `data class` 并且带有 `@Entity` 注解，使用 `tableName` 设置 `SQLite` 表名称。   

```kotlin
@Entity(tableName = "items")
data class Item(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val name: String,
    val price: Double,
    val quantity: Int
)
```
`@PrimaryKey(autoGenerate = true)` 设置 id 为主键，带有默认值，`autoGenerate` 设置为 `true` ，Room 为每个实体生成一个递增 ID，且每个 ID 是唯一的。

::: tip
`@Entity` 注解有多个可能的参数。默认情况下（`@Entity` 没有参数），表名称与类名称相同。使用 `tableName` 参数可自定义表名称

[Entity 文档](https://developer.android.com/reference/androidx/room/Entity?hl=zh-cn)
:::

### 创建 item DAO
数据访问对象 (DAO) 是一种模式，其作用是通过提供抽象接口将持久性层与应用的其余部分分离。  

需要实现的操作：  
- **插入**或**添加**新商品。
- **更新**现有商品的名称、价格和数量。
- 根据主键 `id` **获取**特定商品。
- **获取所有商品**，从而可以显示它们。
- **删除**数据库中的条目。

过程：  
创建包含接口 `ItemDao` 的文件，为 `ItemDao` 添加 `@Dao` 注解。
```kotlin 
package com.example.inventory.data

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface ItemDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun insert(item: Item)

    @Update
    suspend fun update(item: Item)

    @Delete
    suspend fun delete(item: Item)

    @Query("SELECT * FROM items WHERE id = :id")
    fun getItem(id: Int): Flow<Item>

    @Query("SELECT * from items ORDER BY name ASC")
    fun getAllItems(): Flow<List<Item>>
}
```

::: tip
建议在持久性层中使用 Flow。将返回值类型设为 Flow 后，只要数据库中的数据发生更改，您就会收到通知。Room 会为您保持更新此 Flow，也就是说，您只需要显式获取一次数据。
由于返回值类型为 Flow，Room 还会在后台线程上运行该查询。您无需将其明确设为 suspend 函数并在协程作用域内进行调用。
:::

### 创建 Database 实例

```kotlin
package com.example.inventory.data

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase

// 将 version 设为 1。每当更改数据库表的架构时，都必须提升版本号。 
@Database(entities = [Item::class], version = 1, exportSchema = false)
abstract class InventoryDatabase : RoomDatabase() {
    abstract fun itemDao(): ItemDao

    companion object {
        @Volatile
        private var Instance: InventoryDatabase? = null
    }

    fun getDatabase(context: Context): InventoryDatabase {
        return Instance ?: synchronized(this) {
            Room.databaseBuilder(context, InventoryDatabase::class.java, "item_database")
                .build()
                .also { Instance = it }
        }

    }
}
```

### @Composable 中调用

```kotlin 
val coroutineScope = rememberCoroutineScope()

val coroutineScope = rememberCoroutineScope()

coroutineScope.launch {
    viewModel.saveItems()
}
```