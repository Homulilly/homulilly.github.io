# Dependencies

Dependencies with Version Catalogs 

## 测试

`libs.versions.toml`
```toml
[versions]
# junit Android Studio 2024.2.1 默认项目自带
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

## Compose Navigation
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

## Retrofit
`libs.versions.toml`
```toml
[versions]
# Retrofit with kotlinx.serialization
okhttp="4.12.0"
retrofit="2.9.0"
kotlinxSerializationJson = "1.6.3"
retrofit2KotlinxSerializationConverter = "1.0.0"
# plugin-kotlin-serialization
kotlin = "2.0.20"

[libraries]
okhttp = { group = "com.squareup.okhttp3", name = "okhttp", version.ref = "okhttp" }
retrofit = { group = "com.squareup.retrofit2", name = "retrofit", version.ref = "retrofit" }
# kotlinx-serialization
kotlinx-serialization-json = { group = "org.jetbrains.kotlinx", name = "kotlinx-serialization-json", version.ref = "kotlinxSerializationJson" }
retrofit2-kotlinx-serialization-converter = { group = "com.jakewharton.retrofit", name = "retrofit2-kotlinx-serialization-converter", version.ref = "retrofit2KotlinxSerializationConverter" }

[plugins]
kotlin-serialization = { id = "org.jetbrains.kotlin.plugin.serialization", version.ref = "serialization"}
```
`build.gradle.kts (Module: app)` > `plugins`
```kotlin
alias(libs.plugins.kotlin.serialization)
```

`build.gradle.kts (Module: app)` > `dependencies`
```kotlin
    // retrofit
    implementation(libs.okhttp)
    implementation(libs.retrofit)
    implementation(libs.kotlinx.serialization.json)
    implementation(libs.retrofit2.kotlinx.serialization.converter)
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
