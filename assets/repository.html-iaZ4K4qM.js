import{_ as l,r as e,o as r,c as u,a as n,b as s,d as a,w as t,e as i}from"./app-pwymEAKl.js";const d={},k=n("h1",{id:"repository-and-manual-di",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#repository-and-manual-di","aria-hidden":"true"},"#"),s(" Repository and Manual DI")],-1),v={href:"https://developer.android.com/codelabs/basic-android-kotlin-compose-add-repository?hl=zh-cn#",target:"_blank",rel:"noopener noreferrer"},m={href:"https://github.com/google-developer-training/basic-android-kotlin-compose-training-mars-photos/tree/repo-starter",target:"_blank",rel:"noopener noreferrer"},b=i('<p>修改 Mars Photos 应用，将应用拆分为界面层和数据层。<br> 在拆分数据层时实现仓库模式。<br> 使用依赖项注入创建松散耦合的代码库。</p><h2 id="拆分界面层和数据层" tabindex="-1"><a class="header-anchor" href="#拆分界面层和数据层" aria-hidden="true">#</a> 拆分界面层和数据层</h2><ul><li>数据层负责应用的业务逻辑以及为应用寻源和保存数据。</li><li>界面层的关注点是显示所提供的数据。界面不再检索数据，因为这是数据层的关注点。</li><li>数据层由一个或多个仓库组成。仓库本身包含零个或多个数据源。</li></ul><p>仓库类的作用：</p><ul><li>向应用的其余部分公开数据。</li><li>集中管理数据更改。</li><li>解决多个数据源之间的冲突。</li><li>对应用其余部分的数据源进行抽象化处理。</li><li>存放业务逻辑。</li></ul><h2 id="创建数据层" tabindex="-1"><a class="header-anchor" href="#创建数据层" aria-hidden="true">#</a> 创建数据层</h2><p>仓库命名惯例是数据类型 + 仓库。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>在起始代码中，数据的获取是在 ViewModel 中进行的， <code>MarsApiService.kt</code> 中的 <code>object MarsApi { }</code> 单例对象作为数据来源的唯一实例。</p>',9),h=n("div",{class:"language-kotlin line-numbers-mode","data-ext":"kt"},[n("pre",{class:"language-kotlin"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(" com"),n("span",{class:"token punctuation"},"."),s("example"),n("span",{class:"token punctuation"},"."),s("marsphotos"),n("span",{class:"token punctuation"},"."),s("ui"),n("span",{class:"token punctuation"},"."),s(`screens
`),n("span",{class:"token comment"},"// import ..."),s(`
`),n("span",{class:"token keyword"},"import"),s(" com"),n("span",{class:"token punctuation"},"."),s("example"),n("span",{class:"token punctuation"},"."),s("marsphotos"),n("span",{class:"token punctuation"},"."),s("network"),n("span",{class:"token punctuation"},"."),s(`MarsApi

`),n("span",{class:"token comment"},`/**
 * UI state for the Home screen
 */`),s(`
`),n("span",{class:"token keyword"},"sealed"),s(),n("span",{class:"token keyword"},"interface"),s(" MarsUiState "),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"data"),s(),n("span",{class:"token keyword"},"class"),s(),n("span",{class:"token function"},"Success"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"val"),s(" photos"),n("span",{class:"token operator"},":"),s(" String"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},":"),s(` MarsUiState
    `),n("span",{class:"token keyword"},"object"),s(" Error "),n("span",{class:"token operator"},":"),s(` MarsUiState
    `),n("span",{class:"token keyword"},"object"),s(" Loading "),n("span",{class:"token operator"},":"),s(` MarsUiState
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"class"),s(" MarsViewModel "),n("span",{class:"token operator"},":"),s(),n("span",{class:"token function"},"ViewModel"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"/** The mutable State that stores the status of the most recent request */"),s(`
    `),n("span",{class:"token keyword"},"var"),s(" marsUiState"),n("span",{class:"token operator"},":"),s(" MarsUiState "),n("span",{class:"token keyword"},"by"),s(),n("span",{class:"token function"},"mutableStateOf"),n("span",{class:"token punctuation"},"("),s("MarsUiState"),n("span",{class:"token punctuation"},"."),s("Loading"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"private"),s(),n("span",{class:"token keyword"},"set"),s(`

    `),n("span",{class:"token comment"},`/**
     * Call getMarsPhotos() on init so we can display status immediately.
     */`),s(`
    `),n("span",{class:"token keyword"},"init"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"getMarsPhotos"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},`/**
     * Gets Mars photos information from the Mars API Retrofit service and updates the
     * [MarsPhoto] [List] [MutableList].
     */`),s(`
    `),n("span",{class:"token keyword"},"fun"),s(),n("span",{class:"token function"},"getMarsPhotos"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        viewModelScope`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"launch"),s(),n("span",{class:"token punctuation"},"{"),s(`
            marsUiState `),n("span",{class:"token operator"},"="),s(" MarsUiState"),n("span",{class:"token punctuation"},"."),s(`Loading
            marsUiState `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"try"),s(),n("span",{class:"token punctuation"},"{"),s(`
                `),n("span",{class:"token keyword"},"val"),s(" listResult "),n("span",{class:"token operator"},"="),s(" MarsApi"),n("span",{class:"token punctuation"},"."),s("retrofitService"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"getPhotos"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
                MarsUiState`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Success"),n("span",{class:"token punctuation"},"("),s(`
                    `),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"Success: '),n("span",{class:"token interpolation"},[n("span",{class:"token interpolation-punctuation punctuation"},"${"),n("span",{class:"token expression"},[s("listResult"),n("span",{class:"token punctuation"},"."),s("size")]),n("span",{class:"token interpolation-punctuation punctuation"},"}")]),n("span",{class:"token string"},' Mars photos retrieved"')]),s(`
                `),n("span",{class:"token punctuation"},")"),s(`
            `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"catch"),s(),n("span",{class:"token punctuation"},"("),s("e"),n("span",{class:"token operator"},":"),s(" IOException"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                MarsUiState`),n("span",{class:"token punctuation"},"."),s(`Error
            `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"catch"),s(),n("span",{class:"token punctuation"},"("),s("e"),n("span",{class:"token operator"},":"),s(" HttpException"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
                MarsUiState`),n("span",{class:"token punctuation"},"."),s(`Error
            `),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("div",{class:"language-kotlin line-numbers-mode","data-ext":"kt"},[n("pre",{class:"language-kotlin"},[n("code",null,[n("span",{class:"token keyword"},"package"),s(" com"),n("span",{class:"token punctuation"},"."),s("example"),n("span",{class:"token punctuation"},"."),s("marsphotos"),n("span",{class:"token punctuation"},"."),s(`network
`),n("span",{class:"token comment"},"// import ..."),s(`

    `),n("span",{class:"token keyword"},"private"),s(),n("span",{class:"token keyword"},"const"),s(),n("span",{class:"token keyword"},"val"),s(" BASE_URL "),n("span",{class:"token operator"},"="),s(`
        `),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"https://android-kotlin-fun-mars-server.appspot.com"')]),s(`

    `),n("span",{class:"token comment"},`/**
     * Use the Retrofit builder to build a retrofit object using a kotlinx.serialization converter
     */`),s(`
    `),n("span",{class:"token keyword"},"private"),s(),n("span",{class:"token keyword"},"val"),s(" retrofit "),n("span",{class:"token operator"},"="),s(" Retrofit"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"Builder"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"addConverterFactory"),n("span",{class:"token punctuation"},"("),s("Json"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"asConverterFactory"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"application/json"')]),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"toMediaType"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"baseUrl"),n("span",{class:"token punctuation"},"("),s("BASE_URL"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"build"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token comment"},`/**
     * Retrofit service object for creating api calls
     */`),s(`
    `),n("span",{class:"token keyword"},"interface"),s(" MarsApiService "),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token annotation builtin"},"@GET"),n("span",{class:"token punctuation"},"("),n("span",{class:"token string-literal singleline"},[n("span",{class:"token string"},'"photos"')]),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"suspend"),s(),n("span",{class:"token keyword"},"fun"),s(),n("span",{class:"token function"},"getPhotos"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" List"),n("span",{class:"token operator"},"<"),s("MarsPhoto"),n("span",{class:"token operator"},">"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},`/**
     * A public Api object that exposes the lazy-initialized Retrofit service
     */`),s(`
    `),n("span",{class:"token keyword"},"object"),s(" MarsApi "),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"val"),s(" retrofitService"),n("span",{class:"token operator"},":"),s(" MarsApiService "),n("span",{class:"token keyword"},"by"),s(" lazy "),n("span",{class:"token punctuation"},"{"),s(`
            retrofit`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"create"),n("span",{class:"token punctuation"},"("),s("MarsApiService"),n("span",{class:"token operator"},"::"),n("span",{class:"token keyword"},"class"),n("span",{class:"token punctuation"},"."),s("java"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),w=i(`<p>首先创建一个 <code>MarsPhotosRepository</code> 的接口作为仓库</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">import</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos<span class="token punctuation">.</span>model<span class="token punctuation">.</span>MarsPhoto

<span class="token keyword">interface</span> MarsPhotosRepository <span class="token punctuation">{</span>
    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getMarsPhotos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>MarsPhoto<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 通过 NetworkMarsPhotosRepository 类进行实现</span>

<span class="token keyword">class</span> <span class="token function">NetworkMarsPhotosRepositiry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> MarsPhotosRepository <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getMarsPhotos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>MarsPhoto<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> MarsApi<span class="token punctuation">.</span>retrofitService<span class="token punctuation">.</span><span class="token function">getPhotos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ViewModel 中的获取数据部分可以改为由 <code>NetworkMarsPhotosRepository</code> 提供，ViewModel 不再直接引用 MarsApi 代码。</p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">val</span> listResult <span class="token operator">=</span> MarsApi<span class="token punctuation">.</span>retrofitService<span class="token punctuation">.</span><span class="token function">getPhotos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 修改为</span>
<span class="token keyword">import</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos<span class="token punctuation">.</span>data<span class="token punctuation">.</span>NetworkMarsPhotosRepository

<span class="token keyword">val</span> marsPhotosRepository <span class="token operator">=</span> <span class="token function">NetworkMarsPhotosRepository</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">val</span> listResult <span class="token operator">=</span> marsPhotosRepository<span class="token punctuation">.</span><span class="token function">getPhotos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现依赖项注入-di" tabindex="-1"><a class="header-anchor" href="#实现依赖项注入-di" aria-hidden="true">#</a> 实现依赖项注入(DI)</h3><p>依赖项注入是指在运行时提供依赖项，而不是将其硬编码到调用类中。</p><ul><li><strong>有助于提高代码的可重用性</strong>。代码不依赖于特定对象，从而提高灵活性。</li><li><strong>使重构更轻松</strong>。代码是松散耦合的，因此重构一段代码不会影响另一段代码。</li><li><strong>有助于进行测试</strong>。可以在测试期间传入测试对象。</li></ul><p>需要实现实现一个为 <code>MarsViewModel</code> 提供仓库的应用容器。</p><ol><li>右键点击 <code>data</code> 软件包，然后依次选择 <code>New</code> &gt; <code>Kotlin Class/File</code>。</li><li>在对话框中，选择 <code>Interface</code>，然后输入 <code>AppContainer</code> 作为接口的名称。</li><li>在 <code>AppContainer</code> 接口内，添加一个名为 <code>marsPhotosRepository</code> 且类型为 <code>MarsPhotosRepository</code> 的抽象属性。</li><li>在接口定义下，创建一个名为 <code>DefaultAppContainer</code> 的类来实现 <code>AppContainer</code> 接口。</li><li>将 <code>network/MarsApiService.kt</code> 中 <code>BASE_URL</code>、<code>retrofit</code> 和 <code>retrofitService</code> 变量的代码移至 <code>DefaultAppContainer</code> 类，让它们都位于用于维护依赖项的容器中。</li></ol><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> AppContainer<span class="token punctuation">{</span>
    <span class="token keyword">val</span> marsPhotosRepository<span class="token operator">:</span> MarsPhotosRepository
<span class="token punctuation">}</span>

<span class="token keyword">class</span> DefaultAppContainer <span class="token operator">:</span> AppContainer <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> baseUrl <span class="token operator">=</span>
        <span class="token string-literal singleline"><span class="token string">&quot;https://android-kotlin-fun-mars-server.appspot.com&quot;</span></span>

    <span class="token comment">/**
     * Use the Retrofit builder to build a retrofit object using a kotlinx.serialization converter
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> retrofit <span class="token operator">=</span> Retrofit<span class="token punctuation">.</span><span class="token function">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">addConverterFactory</span><span class="token punctuation">(</span>Json<span class="token punctuation">.</span><span class="token function">asConverterFactory</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;application/json&quot;</span></span><span class="token punctuation">.</span><span class="token function">toMediaType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">baseUrl</span><span class="token punctuation">(</span>baseUrl<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> retrofitService<span class="token operator">:</span> MarsApiService <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
        retrofit<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>MarsApiService<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">.</span>java<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">val</span> marsPhotosRepository<span class="token operator">:</span> MarsPhotosRepository <span class="token keyword">by</span> lazy <span class="token punctuation">{</span>
        <span class="token function">NetworkMarsPhotosRepository</span><span class="token punctuation">(</span>retrofitService<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以移除之前的 <code>object MarsApi { }</code></p><h3 id="将容器添加到应用" tabindex="-1"><a class="header-anchor" href="#将容器添加到应用" aria-hidden="true">#</a> 将容器添加到应用</h3><p>创建文件 <code>MarsPhotosApplication.kt</code></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">package</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos

<span class="token keyword">import</span> android<span class="token punctuation">.</span>app<span class="token punctuation">.</span>Application
<span class="token keyword">import</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos<span class="token punctuation">.</span>data<span class="token punctuation">.</span>AppContainer
<span class="token keyword">import</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos<span class="token punctuation">.</span>data<span class="token punctuation">.</span>DefaultAppContainer

<span class="token keyword">class</span> MarsPhotosApplication <span class="token operator">:</span> <span class="token function">Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">lateinit</span> <span class="token keyword">var</span> container<span class="token operator">:</span> AppContainer
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">onCreate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        container <span class="token operator">=</span> <span class="token function">DefaultAppContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新 <code>manifests/AndroidManifest.xml</code></p><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token operator">&lt;</span>application
    <span class="token comment">// 添加 name </span>
    android<span class="token operator">:</span>name<span class="token operator">=</span><span class="token string-literal singleline"><span class="token string">&quot;.MarsPhotosApplication&quot;</span></span>
    android<span class="token operator">:</span>allowBackup<span class="token operator">=</span><span class="token string-literal singleline"><span class="token string">&quot;true&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将仓库添加到-viewmodel" tabindex="-1"><a class="header-anchor" href="#将仓库添加到-viewmodel" aria-hidden="true">#</a> 将仓库添加到 ViewModel</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">import</span> androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>ViewModelProvider
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>ViewModelProvider<span class="token punctuation">.</span>AndroidViewModelFactory<span class="token punctuation">.</span>Companion<span class="token punctuation">.</span>APPLICATION_KEY
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>viewModelScope
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>viewmodel<span class="token punctuation">.</span>initializer
<span class="token keyword">import</span> androidx<span class="token punctuation">.</span>lifecycle<span class="token punctuation">.</span>viewmodel<span class="token punctuation">.</span>viewModelFactory
<span class="token keyword">import</span> com<span class="token punctuation">.</span>example<span class="token punctuation">.</span>marsphotos<span class="token punctuation">.</span>MarsPhotosApplication

<span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span>
   <span class="token keyword">val</span> Factory<span class="token operator">:</span> ViewModelProvider<span class="token punctuation">.</span>Factory <span class="token operator">=</span> viewModelFactory <span class="token punctuation">{</span>
       initializer <span class="token punctuation">{</span>
           <span class="token keyword">val</span> application <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">[</span>APPLICATION_KEY<span class="token punctuation">]</span> <span class="token keyword">as</span> MarsPhotosApplication<span class="token punctuation">)</span>
           <span class="token keyword">val</span> marsPhotosRepository <span class="token operator">=</span> application<span class="token punctuation">.</span>container<span class="token punctuation">.</span>marsPhotosRepository
           <span class="token function">MarsViewModel</span><span class="token punctuation">(</span>marsPhotosRepository <span class="token operator">=</span> marsPhotosRepository<span class="token punctuation">)</span>
       <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token function">Surface</span><span class="token punctuation">(</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">val</span> marsViewModel<span class="token operator">:</span> MarsViewModel <span class="token operator">=</span> <span class="token function">viewModel</span><span class="token punctuation">(</span>factory <span class="token operator">=</span> MarsViewModel<span class="token punctuation">.</span>Factory<span class="token punctuation">)</span>
            <span class="token comment">// ...</span>
        <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19);function f(g,M){const o=e("ExternalLinkIcon"),p=e("CodeGroupItem"),c=e("CodeGroup");return r(),u("div",null,[k,n("ul",null,[n("li",null,[n("a",v,[s("添加仓库和手动依赖项注入"),a(o)])]),n("li",null,[n("a",m,[s("Github - 起始代码"),a(o)])])]),b,a(c,null,{default:t(()=>[a(p,{title:"MarsViewModel.kt"},{default:t(()=>[h]),_:1}),a(p,{title:"MarsApiService.kt"},{default:t(()=>[y]),_:1})]),_:1}),w])}const A=l(d,[["render",f],["__file","repository.html.vue"]]);export{A as default};
