import{_ as a,o as s,c as n,e}from"./app-pwymEAKl.js";const i={},t=e(`<h1 id="trojan-setup" tabindex="-1"><a class="header-anchor" href="#trojan-setup" aria-hidden="true">#</a> Trojan Setup</h1><h3 id="设置环境" tabindex="-1"><a class="header-anchor" href="#设置环境" aria-hidden="true">#</a> 设置环境</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">apt</span> upgrade
<span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> xz-utils <span class="token function">wget</span> <span class="token function">unzip</span> <span class="token function">zip</span> <span class="token function">curl</span> nginx

systemctl <span class="token builtin class-name">enable</span> nginx.service 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前往 <code>/var/www/html</code> 设置静态网页文件</p><h3 id="申请-let-s-encrypt-证书" tabindex="-1"><a class="header-anchor" href="#申请-let-s-encrypt-证书" aria-hidden="true">#</a> 申请 Let&#39;s Encrypt 证书</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>letsencrypt certonly <span class="token parameter variable">--webroot</span> <span class="token parameter variable">-w</span> /var/www/html/ <span class="token parameter variable">-d</span> example.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后设置自动续签</p><h3 id="设置-trojan" tabindex="-1"><a class="header-anchor" href="#设置-trojan" aria-hidden="true">#</a> 设置 Trojan</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/src

<span class="token function">wget</span> https://github.com/trojan-gfw/trojan/releases/download/v1.16.0/trojan-1.16.0-linux-amd64.tar.xz
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> trojan-1.16.0-linux-amd64.tar.xz

<span class="token builtin class-name">cd</span> trojan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑配置文件，设置密码与证书路径</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3><p>创建 Systemd 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>  
<span class="token assign-left variable">Description</span><span class="token operator">=</span>trojan  
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target  
   
<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>  
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple  
<span class="token assign-left variable">PIDFile</span><span class="token operator">=</span>/usr/src/trojan/trojan/trojan.pid
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/src/trojan/trojan <span class="token parameter variable">-c</span> <span class="token string">&quot;/usr/src/trojan/config.json&quot;</span>  
<span class="token assign-left variable">ExecReload</span><span class="token operator">=</span>  
<span class="token assign-left variable">ExecStop</span><span class="token operator">=</span>/usr/src/trojan/trojan  
<span class="token assign-left variable">PrivateTmp</span><span class="token operator">=</span>true  
   
<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>  
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl start trojan
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16),l=[t];function r(c,o){return s(),n("div",null,l)}const d=a(i,[["render",r],["__file","trojan.html.vue"]]);export{d as default};
