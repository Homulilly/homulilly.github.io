import{_ as s,c as i,o as a,a4 as n}from"./chunks/framework.4aTu-Nia.js";const c=JSON.parse('{"title":"Go 循环结构","description":"","frontmatter":{},"headers":[],"relativePath":"go/loop.md","filePath":"go/loop.md"}'),l={name:"go/loop.md"},e=n(`<h1 id="go-循环结构" tabindex="-1">Go 循环结构 <a class="header-anchor" href="#go-循环结构" aria-label="Permalink to &quot;Go 循环结构&quot;">​</a></h1><h2 id="_1-标准的-for-循环" tabindex="-1">1. 标准的 <code>for</code> 循环 <a class="header-anchor" href="#_1-标准的-for-循环" aria-label="Permalink to &quot;1. 标准的 \`for\` 循环&quot;">​</a></h2><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这段代码会输出 0 到 9 的数字。</p><h2 id="_2-类似-while-的-for-循环" tabindex="-1">2. 类似 <code>while</code> 的 <code>for</code> 循环 <a class="header-anchor" href="#_2-类似-while-的-for-循环" aria-label="Permalink to &quot;2. 类似 \`while\` 的 \`for\` 循环&quot;">​</a></h2><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这将打印出 0 到 9 的数字，直到 i 大于或等于 10。</p><h2 id="_3-无限循环" tabindex="-1">3. 无限循环 <a class="header-anchor" href="#_3-无限循环" aria-label="Permalink to &quot;3. 无限循环&quot;">​</a></h2><p>如果 for 循环中省略了条件表达式，循环将无限进行，直到内部某处调用 break 语句或发生类似中断的事件。</p><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;无限循环&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    break</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 这里打断循环</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_4-遍历数组、切片、字符串或映射" tabindex="-1">4. 遍历数组、切片、字符串或映射 <a class="header-anchor" href="#_4-遍历数组、切片、字符串或映射" aria-label="Permalink to &quot;4. 遍历数组、切片、字符串或映射&quot;">​</a></h3><p>使用 for 循环结合 range 关键字可以方便地遍历数组、切片、字符串或映射的元素。range 返回当前索引或键和相应的值。</p><div class="language-go vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">nums </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index, value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nums {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Printf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;索引：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">, 值：</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">%d\\n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, index, value)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这段代码遍历切片 nums，打印每个元素的索引和值。</p>`,14),p=[e];function h(t,k,r,d,E,o){return a(),i("div",null,p)}const u=s(l,[["render",h]]);export{c as __pageData,u as default};