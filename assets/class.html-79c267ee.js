import{_ as n,p as s,q as a,Y as e}from"./framework-aa5c4115.js";const t={},p=e(`<h1 id="类与接口" tabindex="-1"><a class="header-anchor" href="#类与接口" aria-hidden="true">#</a> 类与接口</h1><h2 id="类的构造方法" tabindex="-1"><a class="header-anchor" href="#类的构造方法" aria-hidden="true">#</a> 类的构造方法</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">SimpleClass</span><span class="token punctuation">(</span>x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> x<span class="token operator">:</span> Int
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x
    <span class="token punctuation">}</span> 
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 简化</span>
<span class="token keyword">class</span> SimpleClass <span class="token keyword">constructor</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> x<span class="token operator">:</span> Int <span class="token operator">=</span> x 

    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 简化</span>
<span class="token keyword">class</span> <span class="token function">SimpleClass</span> <span class="token punctuation">(</span>x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> x<span class="token operator">:</span> Int <span class="token operator">=</span> x
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 简化</span>
<span class="token keyword">class</span> <span class="token function">SimpleClass</span><span class="token punctuation">(</span><span class="token keyword">var</span> x<span class="token operator">:</span> Int<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h2><h3 id="定义" tabindex="-1"><a class="header-anchor" href="#定义" aria-hidden="true">#</a> 定义</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">interface</span> SimpleInf <span class="token punctuation">{</span>
    <span class="token keyword">fun</span> <span class="token function">simpleMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">SimpleClass</span><span class="token punctuation">(</span><span class="token keyword">var</span> x<span class="token operator">:</span> Int<span class="token punctuation">)</span>
        <span class="token operator">:</span>SimpleInf<span class="token punctuation">{</span>
    <span class="token comment">//...</span>
    Override <span class="token keyword">fun</span> <span class="token function">simpleMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="抽象类" tabindex="-1"><a class="header-anchor" href="#抽象类" aria-hidden="true">#</a> 抽象类</h2><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token comment">//定义一个抽象类</span>
<span class="token keyword">abstract</span> <span class="token keyword">class</span> Animal <span class="token punctuation">{</span>
    <span class="token comment">//抽象方法</span>
    <span class="token keyword">abstract</span> <span class="token keyword">fun</span> <span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">//非抽象方法</span>
    <span class="token keyword">fun</span> <span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;sleeping&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 定义一个子类，继承抽象类</span>
<span class="token keyword">class</span> Dog <span class="token operator">:</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;WONG&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 不能直接实例化抽象类</span>
    <span class="token comment">// val animal = Animal()</span>

    <span class="token comment">// 可以实例化子类</span>
    <span class="token keyword">val</span> dog <span class="token operator">=</span> <span class="token function">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    dog<span class="token punctuation">.</span><span class="token function">makeSound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//输出：WONG</span>
    dog<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//输出: Sleeping</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),i=[p];function c(l,o){return s(),a("div",null,i)}const d=n(t,[["render",c],["__file","class.html.vue"]]);export{d as default};
