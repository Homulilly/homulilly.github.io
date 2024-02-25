import{_ as s,o as n,c as a,e}from"./app-pwymEAKl.js";const i={},t=e(`<h1 id="my-config" tabindex="-1"><a class="header-anchor" href="#my-config" aria-hidden="true">#</a> My Config</h1><h3 id="zsh" tabindex="-1"><a class="header-anchor" href="#zsh" aria-hidden="true">#</a> ZSH</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> <span class="token function">curl</span> <span class="token function">git</span> <span class="token function">zsh</span> <span class="token parameter variable">-y</span>

<span class="token comment"># Install oh-my-zsh</span>
<span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh<span class="token variable">)</span></span>&quot;</span>

<span class="token function">curl</span> https://m.nep.me/s/zsh <span class="token operator">&gt;</span> ~/.oh-my-zsh/themes/my.zsh-theme 

<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&#39;s/ZSH_THEME=&quot;robbyrussell&quot;/ZSH_THEME=&quot;my&quot;/&#39;</span> ~/.zshrc

<span class="token builtin class-name">source</span> ~/.zshrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vimrc" tabindex="-1"><a class="header-anchor" href="#vimrc" aria-hidden="true">#</a> .vimrc</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>syntax on
<span class="token builtin class-name">set</span> mouse-<span class="token operator">=</span>a
<span class="token builtin class-name">set</span> <span class="token assign-left variable">ts</span><span class="token operator">=</span><span class="token number">4</span>
<span class="token builtin class-name">set</span> expandtab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),l=[t];function c(o,r){return n(),a("div",null,l)}const d=s(i,[["render",c],["__file","config.html.vue"]]);export{d as default};
