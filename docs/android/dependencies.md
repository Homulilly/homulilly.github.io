# Dependencies

Dependencies with Version Catalogs 

## Android TEST

`libs.versions.toml`
```toml
[versions]
# junit Android Studio 2024.2.1 项目自带
junit = "4.13.2"
# kotlinxCoroutinesTest
kotlinxCoroutinesTest = "1.8.1"

[libraries]
androidx-junit = { group = "androidx.test.ext", name = "junit", version.ref = "junitVersion" }
kotlinx-coroutines-test = { group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-test", version.ref = "kotlinxCoroutinesTest" }
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
testImplementation(libs.junit)
testImplementation(libs.kotlinx.coroutines.test)
```

## LifeCycel ViewModel
`libs.versions.toml` 
```toml
[versions]
lifecycleViewModelCompose="2.8.6"

[libraries]
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleViewModelCompose" }
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
implementation(libs.androidx.lifecycle.viewmodel.compose)
```

## Compose Navigatgion
`libs.versions.toml`
```toml
[versions]
navigationCompose = "2.8.2" 

[libraries]
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
implementation(libs.androidx.navigation.compose)
```

## Retrofit
`libs.versions.toml`
```toml
[versions]
# Retrofit with kotlinx.serialization
okhttp="4.12.0"
retrofit="2.9.0"
retrofit2KotlinxSerializationConverter = "1.0.0"
# plugin-kotlin-serialization
kotlin = "2.0.20"
kotlinxSerializationJson = "1.6.3"

[libraries]
okhttp = { group = "com.squareup.okhttp3", name = "okhttp", version.ref = "okhttp" }
retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-converter = { group = "com.jakewharton.retrofit", name = "retrofit2-kotlinx-serialization-converter", version.ref = "retrofit2KotlinxSerializationConverter" }
# kotlinx-serialization
kotlinx-serialization-json = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-json", version.ref = "kotlinxSerializationJson" }

[plugins]
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "serialization"}

[bundles]
retrofit = ['okhttp', 'retrofit', 'retrofit-converter']
```
`build.gradle.kts (Module: app)` > `plugins`
```kotlin
alias(libs.plugins.kotlin.serialization)
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
// retrofit
implementation(libs.bundles.retrofit)
implementation(libs.kotlinx.serialization.json)
```

## Hilt
`libs.versions.toml` 
```toml
[versions]
kotlin="2.0.20"
ksp="2.0.20-1.0.24"
hilt="2.51.1"
hiltCommon="1.2.0"

[libraries]
# hilt
hilt-android = { group = "com.google.dagger", name = "hilt-android", version.ref = "hilt" }
hilt-android-compiler = { group = "com.google.dagger", name = "hilt-compiler", version.ref = "hilt" }
# hilt-common
androidx-hilt-common = { group = "androidx.hilt", name = "hilt-common", version.ref = "hiltCommon" }
androidx-hilt-compiler = { group = "androidx.hilt", name = "hilt-compiler", version.ref = "hiltCommon" }
androidx-hilt-navigation-compose = { group = "androidx.hilt", name = "hilt-navigation-compose", version.ref = "hiltCommon" }

[plugins]
# ksp
google-ksp = { id = "com.google.devtools.ksp", version.ref = "ksp"}
android-hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt"}

[bundles]
hilt = ["hilt-android", "androidx-hilt-common", "androidx-hilt-navigation-compose"]
hilt-ksp = ["hilt-android-compiler", "androidx-hilt-compiler"]
```

`build.gradle.kts (Project)` > `plugins` 
```kotlin
alias(libs.plugins.google.ksp) apply false
alias(libs.plugins.android.hilt) apply false
```

`build.gradle.kts (Module: app)` > `plugins` 
```kotlin
alias(libs.plugins.google.ksp)
alias(libs.plugins.android.hilt)
```

`build.gradle.kts (Module: app)` > `dependencies` 
```kotlin
// Hilt
implementation(libs.bundles.hilt)
ksp(libs.bundles.hilt.ksp)
```

## Coil
```kotlin
implementation("io.coil-kt:coil-compose:2.7.0")
```

`libs.versions.toml` 
```toml
[versions]
# coil
coil-compose="2.7.0"

[libraries]
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coil-compose" }
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
implementation(libs.coil.compose)
```

## Room
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
# room
room="2.6.1"

[libraries]
# room 
androidx-room-compiler = { group = "androidx.room", name = "room-ktx", version.ref = "room"}
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room"}
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room"}


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

## Merge

- **lifecycleViewModel**
- **Navigation Compose**
- **Retrofit** with kotlinx.serialization : HTTP/REST
- **hilt** : 依赖注入
- **coil** : Show Image
- **room** : 数据库

`libs.versions.toml` 
```toml
[versions] 
kotlin = "2.0.20"
lifecycleViewModelCompose="2.8.6"
ksp="2.0.20-1.0.24"
hilt="2.51.1"
hiltCommon="1.2.0"
okhttp="4.12.0"
retrofit="2.9.0"
retrofit2KotlinxSerializationConverter = "1.0.0"
kotlinxSerializationJson = "1.6.3"
coil-compose="2.7.0"
room="2.6.1"
navigationCompose = "2.8.2" 


[libraries]
# viewModel Compose
androidx-lifecycle-viewmodel-compose = { group = "androidx.lifecycle", name = "lifecycle-viewmodel-compose", version.ref = "lifecycleViewModelCompose" }
#Navigation Compose
androidx-navigation-compose = { group = "androidx.navigation", name = "navigation-compose", version.ref = "navigationCompose" }
# hilt
hilt-android = { group = "com.google.dagger", name = "hilt-android", version.ref = "hilt" }
hilt-android-compiler = { group = "com.google.dagger", name = "hilt-compiler", version.ref = "hilt" }
androidx-hilt-common = { group = "androidx.hilt", name = "hilt-common", version.ref = "hiltCommon" }
androidx-hilt-compiler = { group = "androidx.hilt", name = "hilt-compiler", version.ref = "hiltCommon" }
androidx-hilt-navigation-compose = { group = "androidx.hilt", name = "hilt-navigation-compose", version.ref = "hiltCommon" }
# retrofit
okhttp = { group = "com.squareup.okhttp3", name = "okhttp", version.ref = "okhttp" }
retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
retrofit-converter = { group = "com.jakewharton.retrofit", name = "retrofit2-kotlinx-serialization-converter", version.ref = "retrofit2KotlinxSerializationConverter" }
# kotlinx-serialization
kotlinx-serialization-json = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-json", version.ref = "kotlinxSerializationJson" }
# coil
coil-compose = { group = "io.coil-kt", name = "coil-compose", version.ref = "coil-compose" }
# room 
androidx-room-compiler = { group = "androidx.room", name = "room-ktx", version.ref = "room"}
androidx-room-ktx = { group = "androidx.room", name = "room-ktx", version.ref = "room"}
androidx-room-runtime = { group = "androidx.room", name = "room-runtime", version.ref = "room"}

[plugins]
# kotlin.serialization
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "kotlin"}
# ksp
google-ksp = { id = "com.google.devtools.ksp", version.ref = "ksp"}
android-hilt = { id = "com.google.dagger.hilt.android", version.ref = "hilt"}

[bundles]
retrofit = ['okhttp', 'retrofit', 'retrofit-converter']
hilt = ["hilt-android", "androidx-hilt-common", "androidx-hilt-navigation-compose"]
hilt-ksp = ["hilt-android-compiler", "androidx-hilt-compiler"]
room = ["androidx-room-runtime", "androidx-room-ktx"]
```

`build.gradle.kts (Project)` > `plugins` 
```kotlin
alias(libs.plugins.google.ksp) apply false
alias(libs.plugins.android.hilt) apply false
alias(libs.plugins.kotlin.serialization) apply false
```

`build.gradle.kts (Module: app)` > `plugins`
```kotlin
alias(libs.plugins.google.ksp)
alias(libs.plugins.android.hilt)
alias(libs.plugins.kotlin.serialization)
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
implementation(libs.androidx.lifecycle.viewmodel.compose)
implementation(libs.androidx.navigation.compose)
// Hilt
implementation(libs.bundles.hilt)
ksp(libs.bundles.hilt.ksp)
// retrofit
implementation(libs.bundles.retrofit)
implementation(libs.kotlinx.serialization.json)
// coil
implementation(libs.coil.compose)
// room
implementation(libs.bundles.room)
ksp(libs.androidx.room.compiler)
```