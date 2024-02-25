import{_ as t,r as p,o as e,c as o,a as n,b as s,d as c,e as i}from"./app-pwymEAKl.js";const l={},u=n("h1",{id:"appbar-material3api",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#appbar-material3api","aria-hidden":"true"},"#"),s(" AppBar - Material3Api")],-1),r={href:"https://developer.android.com/jetpack/compose/components/app-bars?hl=zh-cn",target:"_blank",rel:"noopener noreferrer"},k=i(`<div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">enum</span> <span class="token keyword">class</span> <span class="token function">LaunchTrayScreen</span><span class="token punctuation">(</span><span class="token annotation builtin">@StringRes</span> <span class="token keyword">val</span> title<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">Start</span><span class="token punctuation">(</span>title <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>app_name<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Entree</span><span class="token punctuation">(</span>title <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>choose_entree<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">SideDish</span><span class="token punctuation">(</span>title <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>choose_side_dish<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Accompaniment</span><span class="token punctuation">(</span>title <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>choose_accompaniment<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token function">Checkout</span><span class="token punctuation">(</span>title <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>order_checkout<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@OptIn</span><span class="token punctuation">(</span>ExperimentalMaterial3Api<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Composable</span>
<span class="token keyword">fun</span> <span class="token function">LaunchTrayAppBar</span><span class="token punctuation">(</span>
    <span class="token annotation builtin">@StringRes</span> currentScreenTitle<span class="token operator">:</span> Int<span class="token punctuation">,</span>
    canNavigateBack<span class="token operator">:</span> Boolean<span class="token punctuation">,</span>
    navigateUp<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">,</span>
    modifier<span class="token operator">:</span> Modifier <span class="token operator">=</span> Moidfier
<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">CenterAlignedTopAppBar</span><span class="token punctuation">(</span>
        title <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function">Text</span><span class="token punctuation">(</span><span class="token function">stringResource</span><span class="token punctuation">(</span>currentScreenTitle<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        modifier <span class="token operator">=</span> modifier<span class="token punctuation">,</span>
        navigationIcon <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>canNavigateBack<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">IconButton</span><span class="token punctuation">(</span>onClick <span class="token operator">=</span> navigateUp<span class="token punctuation">)</span><span class="token punctuation">{</span>
                    <span class="token function">Icon</span><span class="token punctuation">(</span>
                        imageVector <span class="token operator">=</span> Icons<span class="token punctuation">.</span>Filled<span class="token punctuation">.</span>ArrowBack<span class="token punctuation">,</span>
                        contentDescription <span class="token operator">=</span> <span class="token function">stringResource</span><span class="token punctuation">(</span>id <span class="token operator">=</span> R<span class="token punctuation">.</span>string<span class="token punctuation">.</span>back_button<span class="token punctuation">)</span>
                    <span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token annotation builtin">@Composable</span>
<span class="token keyword">fun</span> <span class="token function">LaunchTrayScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">val</span> viewModel<span class="token operator">:</span> OrderViewModel <span class="token operator">=</span> <span class="token function">viewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> navControlled <span class="token operator">=</span> <span class="token function">rememberNavController</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">val</span> backStackEntry <span class="token keyword">by</span> navController<span class="token punctuation">.</span><span class="token function">currentBackStackEntryAsState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> currentScreen <span class="token operator">=</span> LaunchTrayScreen<span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>
        backStackEntry<span class="token operator">?</span><span class="token punctuation">.</span>destination<span class="token operator">?</span><span class="token punctuation">.</span>route <span class="token operator">?:</span> LaunchTrayScreen<span class="token punctuation">.</span>Start<span class="token punctuation">.</span>name
    <span class="token punctuation">)</span>

    <span class="token function">Scaffold</span><span class="token punctuation">(</span>
        topBar <span class="token operator">=</span> <span class="token punctuation">{</span>
            <span class="token function">LaunchTrayAppBar</span><span class="token punctuation">(</span>
                currentScreenTitle <span class="token operator">=</span> currentScreen<span class="token punctuation">.</span>title<span class="token punctuation">,</span>
                canNavigateBack <span class="token operator">=</span> navController<span class="token punctuation">.</span>previousBackStackEntry <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                navigateUp <span class="token operator">=</span> <span class="token punctuation">{</span> navController<span class="token punctuation">.</span><span class="token function">navigateUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">{</span> innerPadding <span class="token operator">-&gt;</span> 
        <span class="token keyword">val</span> uiState <span class="token keyword">by</span> viewModel<span class="token punctuation">.</span>uiState<span class="token punctuation">.</span><span class="token function">collectAsState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment">// TODO: Navigation host</span>
        <span class="token function">NavHost</span><span class="token punctuation">(</span>navController <span class="token operator">=</span> navController<span class="token punctuation">,</span>
            startDestination <span class="token operator">=</span> LaunchTrayScreen<span class="token punctuation">.</span>Start<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>

            <span class="token function">composable</span><span class="token punctuation">(</span>route <span class="token operator">=</span> LaunchTrayScreen<span class="token punctuation">.</span>Start<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token function">StartOrderScreen</span><span class="token punctuation">(</span>
                    onStartOrderButtonClicked <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">/*TODO*/</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span>innerPadding<span class="token punctuation">)</span>
                <span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function d(v,m){const a=p("ExternalLinkIcon");return e(),o("div",null,[u,n("ul",null,[n("li",null,[n("a",r,[s("应用栏"),c(a)])])]),k])}const f=t(l,[["render",d],["__file","appbar.html.vue"]]);export{f as default};
