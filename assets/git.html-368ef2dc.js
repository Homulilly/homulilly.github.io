import{_ as a,p as s,q as e,Y as i,s as n}from"./framework-aa5c4115.js";const t={},l=i(`<h1 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h1><h2 id="初始化仓库" tabindex="-1"><a class="header-anchor" href="#初始化仓库" aria-hidden="true">#</a> 初始化仓库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 本地仓库</span>
<span class="token builtin class-name">cd</span> <span class="token variable">$path</span> <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> init

<span class="token comment"># 空白的远程仓库，进用于共享，没有工作区</span>
<span class="token function">git</span> init <span class="token parameter variable">--bare</span> usami.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="回滚" tabindex="-1"><a class="header-anchor" href="#回滚" aria-hidden="true">#</a> 回滚</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset HEAD~1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="修改提交注释" tabindex="-1"><a class="header-anchor" href="#修改提交注释" aria-hidden="true">#</a> 修改提交注释</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">--amend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="github" tabindex="-1"><a class="header-anchor" href="#github" aria-hidden="true">#</a> Github</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> README.md
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;Initial Commit&quot;</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin git@github.com:<span class="token environment constant">$USER</span>/repository.git
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改历史注释" tabindex="-1"><a class="header-anchor" href="#修改历史注释" aria-hidden="true">#</a> 修改历史注释</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改倒数第三次</span>
<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在出现的编辑器中将要修改的那行 <code>pick</code> 修改为 <code>edit</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改 commit</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span>

<span class="token comment"># 恢复</span>
<span class="token function">git</span> rebase <span class="token parameter variable">--continue</span>

<span class="token comment"># 强制提交到 github 覆盖远程版本</span>
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master <span class="token parameter variable">-f</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="githooks-for-hexo-update" tabindex="-1"><a class="header-anchor" href="#githooks-for-hexo-update" aria-hidden="true">#</a> githooks for Hexo update</h2><h3 id="添加-git-用户" tabindex="-1"><a class="header-anchor" href="#添加-git-用户" aria-hidden="true">#</a> 添加 git 用户</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> adduser <span class="token function">git</span>

<span class="token comment"># add ssh key</span>
<span class="token function">sudo</span> <span class="token function">su</span> <span class="token function">git</span>
<span class="token builtin class-name">cd</span> ~ <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> .ssh
<span class="token function">vim</span> authorized_keys
<span class="token builtin class-name">exit</span>

<span class="token comment"># change /bin/bash to /usr/bin/git-shell of user git</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/passwd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-repo" tabindex="-1"><a class="header-anchor" href="#创建-repo" aria-hidden="true">#</a> 创建 repo</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span>/repo <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span>/repo
<span class="token function">sudo</span> <span class="token function">chown</span> git:git <span class="token punctuation">[</span>path<span class="token punctuation">]</span>/repo

<span class="token function">sudo</span> <span class="token parameter variable">-u</span> <span class="token function">git</span> <span class="token function">git</span> init <span class="token parameter variable">--bare</span> hexo.git

<span class="token builtin class-name">cd</span> <span class="token punctuation">[</span>path<span class="token punctuation">]</span>/repo/blog.git
<span class="token function">vim</span> post-receive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入下面内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token function">git</span> --work-tree<span class="token operator">=</span><span class="token punctuation">[</span>path to blog<span class="token punctuation">]</span> --git-dir<span class="token operator">=</span><span class="token punctuation">[</span>path<span class="token punctuation">]</span>/repo/blog.git checkout <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置权限" tabindex="-1"><a class="header-anchor" href="#设置权限" aria-hidden="true">#</a> 设置权限</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x post-receive

<span class="token function">chown</span> <span class="token parameter variable">-R</span> git:git blog.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="error" tabindex="-1"><a class="header-anchor" href="#error" aria-hidden="true">#</a> Error</h3><p>Push 时提示下面的错误</p>`,24),c=n("div",{class:"custom-container danger"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M10 10l4 4m0-4l-4 4"})])]),n("p",{class:"custom-container-title"},"DANGER"),n("div",{class:"language-text line-numbers-mode","data-ext":"text"},[n("pre",{class:"language-text"},[n("code",null,`remote: error: The last gc run reported the following. Please correct the root cause
remote: and remove gc.log.
remote: Automatic cleanup will not be performed until the file is removed.
remote:
remote: warning: There are too many unreachable loose objects; run 'git prune' to remove them.
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])],-1),r=n("p",null,"进入 git 目录，运行下面的命令，然后重新 push",-1),o=n("div",{class:"language-text line-numbers-mode","data-ext":"text"},[n("pre",{class:"language-text"},[n("code",null,`git gc --prune=now
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),d=[l,c,r,o];function p(u,m){return s(),e("div",null,d)}const h=a(t,[["render",p],["__file","git.html.vue"]]);export{h as default};
