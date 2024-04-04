# AppBar - Material3Api

- [应用栏](https://developer.android.com/jetpack/compose/components/app-bars?hl=zh-cn)

```kotlin 
enum class LaunchTrayScreen(@StringRes val title: Int){
    Start(title = R.string.app_name),
    Entree(title = R.string.choose_entree),
    SideDish(title = R.string.choose_side_dish),
    Accompaniment(title = R.string.choose_accompaniment),
    Checkout(title = R.string.order_checkout)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LaunchTrayAppBar(
    @StringRes currentScreenTitle: Int,
    canNavigateBack: Boolean,
    navigateUp: () -> Unit,
    modifier: Modifier = Moidfier
){
    CenterAlignedTopAppBar(
        title = { Text(stringResource(currentScreenTitle)) },
        modifier = modifier,
        navigationIcon = {
            if (canNavigateBack) {
                IconButton(onClick = navigateUp){
                    Icon(
                        imageVector = Icons.Filled.ArrowBack,
                        contentDescription = stringResource(id = R.string.back_button)
                    )
                }
            }
        }
    )
}

@Composable
fun LaunchTrayScreen(){
    val viewModel: OrderViewModel = viewModel()
    val navControlled = rememberNavController()

    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentScreen = LaunchTrayScreen.valueOf(
        backStackEntry?.destination?.route ?: LaunchTrayScreen.Start.name
    )

    Scaffold(
        topBar = {
            LaunchTrayAppBar(
                currentScreenTitle = currentScreen.title,
                canNavigateBack = navController.previousBackStackEntry != null,
                navigateUp = { navController.navigateUp() }
            )
        }
    ){ innerPadding -> 
        val uiState by viewModel.uiState.collectAsState()

        // TODO: Navigation host
        NavHost(navController = navController,
            startDestination = LaunchTrayScreen.Start.name){

            composable(route = LaunchTrayScreen.Start.name){
                StartOrderScreen(
                    onStartOrderButtonClicked = { /*TODO*/ },
                    modifier = Modifier.padding(innerPadding)
                )
            }
        }
    }
}
```