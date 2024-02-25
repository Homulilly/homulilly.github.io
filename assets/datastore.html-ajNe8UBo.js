import{_ as n,o as s,c as a,e}from"./app-pwymEAKl.js";const t={},p=e(`<h1 id="preferences-datastore" tabindex="-1"><a class="header-anchor" href="#preferences-datastore" aria-hidden="true">#</a> Preferences DataStore</h1><p>使用 <code>Preferences DataStore</code> 可以方便的保存偏好设置</p><h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>implementation(&quot;androidx.datastore:datastore-preferences:1.0.0&quot;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实现-userpreferencesrepository" tabindex="-1"><a class="header-anchor" href="#实现-userpreferencesrepository" aria-hidden="true">#</a> 实现 UserPreferencesRepository</h3><p>数据类 <code>LocalPreference</code></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">LocalPreference</span><span class="token punctuation">(</span>
    <span class="token keyword">val</span> botToken<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span>
    <span class="token keyword">val</span> chatId<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">UserPreferencesRepository</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> dataStore<span class="token operator">:</span> DataStore<span class="token operator">&lt;</span>Preferences<span class="token operator">&gt;</span>
<span class="token punctuation">)</span><span class="token punctuation">{</span>  
    <span class="token comment">// 设置 key 的名称常量</span>
    <span class="token keyword">private</span> <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> BOT_TOKEN <span class="token operator">=</span> <span class="token function">stringPreferencesKey</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;bot_token&quot;</span></span><span class="token punctuation">)</span>
        <span class="token keyword">val</span> CHAT_ID <span class="token operator">=</span> <span class="token function">stringPreferencesKey</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;chat_id&quot;</span></span><span class="token punctuation">)</span>
        <span class="token comment">// Log TAG</span>
        <span class="token keyword">const</span> <span class="token keyword">val</span> TAG <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;UserPreferencesRepo&quot;</span></span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 读取</span>
    <span class="token keyword">val</span> userPreferences<span class="token operator">:</span> Flow<span class="token operator">&lt;</span>LocalPreference<span class="token operator">&gt;</span> <span class="token operator">=</span> dataStore<span class="token punctuation">.</span>data
        <span class="token punctuation">.</span><span class="token function">catch</span> <span class="token punctuation">{</span>
            <span class="token comment">// 未存在时报错 IOException </span>
            <span class="token comment">// 生成一个空的配置 </span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>it <span class="token keyword">is</span> IOException<span class="token punctuation">)</span><span class="token punctuation">{</span>
                Log<span class="token punctuation">.</span><span class="token function">e</span><span class="token punctuation">(</span>TAG<span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;Error reading preferences.&quot;</span></span><span class="token punctuation">,</span> it<span class="token punctuation">)</span>
                <span class="token function">emit</span><span class="token punctuation">(</span><span class="token function">emptyPreferences</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> it
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> preferences <span class="token operator">-&gt;</span>
            <span class="token comment">// 返回给 Flow</span>
            <span class="token function">LocalPreference</span><span class="token punctuation">(</span>
                preferences<span class="token punctuation">[</span>BOT_TOKEN<span class="token punctuation">]</span> <span class="token operator">?:</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span>
                preferences<span class="token punctuation">[</span>CHAT_ID<span class="token punctuation">]</span> <span class="token operator">?:</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

    <span class="token comment">// 保存</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">savePreference</span><span class="token punctuation">(</span>botToken<span class="token operator">:</span> String<span class="token punctuation">,</span> chatId<span class="token operator">:</span> String<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dataStore<span class="token punctuation">.</span><span class="token function">edit</span> <span class="token punctuation">{</span> preferences <span class="token operator">-&gt;</span>
            preferences<span class="token punctuation">[</span>BOT_TOKEN<span class="token punctuation">]</span> <span class="token operator">=</span> botToken
            preferences<span class="token punctuation">[</span>CHAT_ID<span class="token punctuation">]</span> <span class="token operator">=</span> chatId
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="application" tabindex="-1"><a class="header-anchor" href="#application" aria-hidden="true">#</a> Application</h3><p>编辑 <code>AndroidManifest.xml</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;application
        android:name=&quot;.AppApplication&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 <code>AppApplication.kt</code></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">private</span> <span class="token keyword">const</span> <span class="token keyword">val</span> PREFERENCE_NAME <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;user_preferences&quot;</span></span>
<span class="token keyword">private</span> <span class="token keyword">val</span> Context<span class="token punctuation">.</span>dataStore<span class="token operator">:</span> DataStore<span class="token operator">&lt;</span>Preferences<span class="token operator">&gt;</span> <span class="token keyword">by</span> <span class="token function">preferencesDataStore</span><span class="token punctuation">(</span>
    name <span class="token operator">=</span> PREFERENCE_NAME
<span class="token punctuation">)</span>

<span class="token keyword">class</span> AppApplication<span class="token operator">:</span> <span class="token function">Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">lateinit</span> <span class="token keyword">var</span> userPreferencesRepository<span class="token operator">:</span> UserPreferencesRepository

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        userPreferencesRepository <span class="token operator">=</span> <span class="token function">UserPreferencesRepository</span><span class="token punctuation">(</span>dataStore<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ViewModel 添加 Factory</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> Factory<span class="token operator">:</span> ViewModelProvider<span class="token punctuation">.</span>Factory <span class="token operator">=</span> viewModelFactory <span class="token punctuation">{</span>
            initializer <span class="token punctuation">{</span>
                <span class="token keyword">val</span> application <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span>APPLICATION_KEY<span class="token punctuation">]</span> <span class="token keyword">as</span> AppApplication<span class="token punctuation">)</span>
                <span class="token function">HomeViewModel</span><span class="token punctuation">(</span>application<span class="token punctuation">.</span>userPreferencesRepository<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Screen 适配</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token annotation builtin">@Composable</span>
<span class="token keyword">fun</span> <span class="token function">HomeScreen</span><span class="token punctuation">(</span>
    modifier<span class="token operator">:</span> Modifier <span class="token operator">=</span> Modifier<span class="token punctuation">,</span>
    <span class="token comment">// homeViewModel: HomeViewModel = viewModel()</span>
    <span class="token comment">// 修改为下面的</span>
    homeViewModel<span class="token operator">:</span> HomeViewModel <span class="token operator">=</span> <span class="token function">viewModel</span><span class="token punctuation">(</span>
        factory <span class="token operator">=</span> HomeViewModel<span class="token punctuation">.</span>Factory
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">{</span> 
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="viewmodel-中调用" tabindex="-1"><a class="header-anchor" href="#viewmodel-中调用" aria-hidden="true">#</a> ViewModel 中调用</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">HomeViewModel</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> userPreferencesRepository<span class="token operator">:</span> UserPreferencesRepository
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">ViewModel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> _uiState <span class="token operator">=</span> <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span><span class="token function">HomeUiState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">val</span> uiState<span class="token operator">:</span> StateFlow<span class="token operator">&lt;</span>HomeUiState<span class="token operator">&gt;</span> <span class="token operator">=</span> _uiState<span class="token punctuation">.</span><span class="token function">asStateFlow</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 初始化时读取配置</span>
    <span class="token keyword">init</span> <span class="token punctuation">{</span>
        viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                userPreferencesRepository<span class="token punctuation">.</span>userPreferences<span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> preferences <span class="token operator">-&gt;</span>
                    <span class="token comment">// updateLog(preferences.toString())</span>
                    _uiState<span class="token punctuation">.</span><span class="token function">update</span> <span class="token punctuation">{</span>
                        it<span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>
                            botToken <span class="token operator">=</span> preferences<span class="token punctuation">.</span>botToken<span class="token punctuation">,</span>
                            chatId <span class="token operator">=</span> preferences<span class="token punctuation">.</span>chatId
                        <span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">updateLog</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 保存配置 </span>
    <span class="token keyword">fun</span> <span class="token function">savePreferences</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        viewModelScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
            userPreferencesRepository<span class="token punctuation">.</span><span class="token function">savePreference</span><span class="token punctuation">(</span>uiState<span class="token punctuation">.</span>value<span class="token punctuation">.</span>botToken<span class="token punctuation">,</span> uiState<span class="token punctuation">.</span>value<span class="token punctuation">.</span>chatId<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">HomeUiState</span><span class="token punctuation">(</span>
    <span class="token keyword">val</span> botToken<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span>
    <span class="token keyword">val</span> chatId<span class="token operator">:</span> String <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19),o=[p];function c(i,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","datastore.html.vue"]]);export{u as default};
