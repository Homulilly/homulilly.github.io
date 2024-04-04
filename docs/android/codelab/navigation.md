# Navigatation

### 前置

- [Template repository](https://github.com/waseefakhtar/bark)
- [Jetpack Compose: An easy way to RecyclerView (Part I)](https://www.waseefakhtar.com/android/recyclerview-in-jetpack-compose/)

::: details MainActivity.kt
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BarkTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    BarkHomeScreen()
                }
            }
        }
    }
}
```  
:::

::: details BarkHomeScreen.kt
```kotlin
@Composable
fun BarkHomeScreen(){
    val puppies by remember { mutableStateOf(DataProvider.puppyList) }

    LazyColumn(contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)) {
        items(
            items = puppies,
            itemContent = {PuppyListItem(puppy = it) }
        )
    }
}

@Composable
fun PuppyListItem(puppy: Puppy){
    Card(
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(4.dp),
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
    ){
        Row{
            Image(
                painter = painterResource(puppy.puppyImageId),
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .padding(8.dp)
                    .size(40.dp)
                    .clip(RoundedCornerShape(4.dp)))

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.CenterVertically)
            ){
                Text(text = puppy.title,
                    style = MaterialTheme.typography.titleMedium)
                Text(text = puppy.sex,
                    style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
```
::: 

### 导航 · 添加依赖

```kotlin
dependencies {
    val nav_version = "2.5.3"

    implementation("androidx.navigation:navigation-compose:$nav_version")
}
```

### 使用入门

参考： [使用 Compose 进行导航](https://developer.android.com/jetpack/compose/navigation?hl=zh-cn)  

创建 `PuppyDetailScreen` 详情显示页面，传递 `navigateBack` 导航返回参数。

```kotlin
@Composable
fun PuppyDetailScreen(puppy: Puppy, navigateBack: () -> Unit){
    Column(){
        Image(painter = painterResource(puppy.puppyImageId), contentDescription =null,
            modifier = Modifier
                .padding(8.dp)
                .height(40.dp)
                .clip(RoundedCornerShape(4.dp)))
        
        Text(text = puppy.title)
        Text(text = puppy.description)

        Button(onClick = { navigateBack() }) {
            Text("Back")
        }
    }
}
```

在 `MainActivity` 中设置 `NavHost` 和 `NavController` ：

```kotlin 
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            BarkTheme {
                val navController = rememberNavController()

                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {

                    // 设置 NavHost
                    NavHost(navController = navController,
                        startDestination = "home"){
                        composable("home"){
                            BarkHomeScreen(navController)
                        }
                        composable(
                            "detail/{puppyId}",
                            arguments = listOf(navArgument("puppyId") { type = NavType.IntType } )
                        ){
                            val puppyId = it.arguments?.getInt("puppyId")
                            Log.i("puppyId", "$puppyId")

                            puppyId?.let {
                                val puppy = DataProvider.puppyList[ puppyId - 1 ]

                                PuppyDetailScreen(puppy = puppy,
                                    navigateBack = { navController.popBackStack() }
                                )
                            }

                        }
                    }
                }
            }
        }
    }
}
```

修改 `BarkHomeScreen` 传递 `navController` 参数，并在 `PuppyListItem` 中，添加点击事件，触发导航

```kotlin 
@Composable
// 设置接收 navController 参数
fun BarkHomeScreen(navController: NavController){
    val puppies by remember { mutableStateOf(DataProvider.puppyList) }

    LazyColumn(contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)) {
        items(
            items = puppies,
            itemContent = { PuppyListItem(puppy = it, navController) }
        )
    }
}

@Composable
fun PuppyListItem(puppy: Puppy, navController: NavController){
    Card(
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        shape = RoundedCornerShape(4.dp),
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth()
            // 添加点击事件
            .clickable { navController.navigate("detail/${puppy.id}") } 
    ){
        Row{
            Image(
                painter = painterResource(puppy.puppyImageId),
                contentDescription = null,
                contentScale = ContentScale.Crop,
                modifier = Modifier
                    .padding(8.dp)
                    .size(40.dp)
                    .clip(RoundedCornerShape(4.dp)))

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.CenterVertically)
            ){
                Text(text = puppy.title,
                    style = MaterialTheme.typography.titleMedium)
                Text(text = puppy.sex,
                    style = MaterialTheme.typography.bodySmall)
            }
        }
    }
}
```

这样点击 `BarkHomeScreen` 中每一个 Card 就会跳转到对应的 `PuppyDetailScreen` ，再点击页面中的 `Back` 按钮就会返回。

下一步可以美化 `PuppyDetailScreen` 界面。