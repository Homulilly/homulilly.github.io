import{_ as s,p as c,q as i,s as e,R as a,t as o,Y as t,n as d}from"./framework-aa5c4115.js";const r={},l=t(`<h1 id="goaccess" tabindex="-1"><a class="header-anchor" href="#goaccess" aria-hidden="true">#</a> GoAccess</h1><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># apt on Ubuntu 16.04</span>
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> goaccess
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="config-with-nginx" tabindex="-1"><a class="header-anchor" href="#config-with-nginx" aria-hidden="true">#</a> Config with Nginx</h3><p>将下面的配置添加到 <code>/etc/goaccess.conf</code> 中</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>color_scheme 1
time-format %H:%M:%S
date_format %d/%b/%Y
# NCSA Combined Log Format
log_format %h %^[%d:%^] &quot;%r&quot; %s %b &quot;%R&quot; &quot;%u&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>goaccess -f /var/log/nginx/access.log
cat /var/log/nginx/access.log | goaccess &gt; output.html
#for access.log.*.gz
zcat /var/log/nginx/access.log.*.gz | goaccess &gt; output.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>`,9),u=e("strong",null,"Ref:",-1),g={href:"https://goaccess.io/",target:"_blank",rel:"noopener noreferrer"};function h(v,m){const n=d("ExternalLinkIcon");return c(),i("div",null,[l,e("p",null,[u,a(),e("a",g,[a("GoAccess Official Site"),o(n)])])])}const p=s(r,[["render",h],["__file","goaccess.html.vue"]]);export{p as default};
