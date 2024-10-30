# 自定义 OutlinedTextField 支持点击

`OutlinedTextField` 在设置 `readOnly = true` 时也无法拦截点击事件，可以设置 `OutlinedTextField` 的 `enabled = false` 或是通过自定义 `interactionSource` 进行处理

```kotlin
@Composable
fun ClickOutlinedTextField(
    value: String,
    modifier: Modifier = Modifier,
    label: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    onClick: () -> Unit = {},
) {

    val interactionSource = remember {
        object : MutableInteractionSource {
            override val interactions = MutableSharedFlow<Interaction>(
                extraBufferCapacity = 16,
                onBufferOverflow = BufferOverflow.DROP_OLDEST,
            )

            override suspend fun emit(interaction: Interaction) {
                when (interaction) {
                    // 按压时立即触发
                    // is PressInteraction.Press ->
                    is PressInteraction.Release -> {
                        onClick()
                    }
                }

                interactions.emit(interaction)
            }

            override fun tryEmit(interaction: Interaction): Boolean {
                return interactions.tryEmit(interaction)
            }
        }
    }

    OutlinedTextField(
        value = value,
        onValueChange = { },
        modifier = modifier,
        label = label,
        trailingIcon = trailingIcon,
        readOnly = true,
        interactionSource = interactionSource,
    )
}
```

Docs of `OutlinedTextField`

```kotlin
@Composable
@ComposableInferredTarget
public fun OutlinedTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    readOnly: Boolean = false,
    textStyle: TextStyle = LocalTextStyle. current,
    label: @Composable (() -> Unit)? = null,
    placeholder: @Composable (() -> Unit)? = null,
    leadingIcon: @Composable (() -> Unit)? = null,
    trailingIcon: @Composable (() -> Unit)? = null,
    prefix: @Composable (() -> Unit)? = null,
    suffix: @Composable (() -> Unit)? = null,
    supportingText: @Composable (() -> Unit)? = null,
    isError: Boolean = false,
    visualTransformation: VisualTransformation = VisualTransformation. None,
    keyboardOptions: KeyboardOptions = KeyboardOptions. Default,
    keyboardActions: KeyboardActions = KeyboardActions. Default,
    singleLine: Boolean = false,
    maxLines: Int = if (singleLine) 1 else Int. MAX_VALUE,
    minLines: Int = 1,
    interactionSource: MutableInteractionSource? = null,
    shape: Shape = OutlinedTextFieldDefaults. shape,
    colors: TextFieldColors = OutlinedTextFieldDefaults. colors()
): Unit
```