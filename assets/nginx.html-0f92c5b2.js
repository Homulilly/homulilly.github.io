import{_ as n,p as s,q as a,Y as e}from"./framework-aa5c4115.js";const i={},t=e(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><h2 id="force-with-https-and-no-www" tabindex="-1"><a class="header-anchor" href="#force-with-https-and-no-www" aria-hidden="true">#</a> Force with HTTPS and no-www</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Force with HTTPS</span>
server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    server_name example.com<span class="token punctuation">;</span>
    <span class="token builtin class-name">return</span> <span class="token number">301</span> https://<span class="token variable">$host</span><span class="token variable">$request_uri</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment"># no-www</span>
server <span class="token punctuation">{</span>
    listen <span class="token number">443</span><span class="token punctuation">;</span>
    server_name www.example.com<span class="token punctuation">;</span>
    <span class="token builtin class-name">return</span> <span class="token number">301</span> https://example.com<span class="token variable">$request_uri</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="custom-error-pages" tabindex="-1"><a class="header-anchor" href="#custom-error-pages" aria-hidden="true">#</a> Custom Error Pages</h2><p>save to <code>server{ }</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>error_page <span class="token number">404</span> /404.html<span class="token punctuation">;</span>
error_page <span class="token number">403</span> /403.html<span class="token punctuation">;</span>
location <span class="token operator">=</span> /404.html<span class="token punctuation">{</span>
        root /var/www/<span class="token punctuation">;</span>
        internal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
location <span class="token operator">=</span> /403.html<span class="token punctuation">{</span>
        root /var/www/<span class="token punctuation">;</span>
        internal<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="https-config" tabindex="-1"><a class="header-anchor" href="#https-config" aria-hidden="true">#</a> HTTPS Config</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">80</span><span class="token punctuation">;</span>
    listen <span class="token number">443</span> ssl http2<span class="token punctuation">;</span>
    root <span class="token variable">$web</span>-root-path/<span class="token punctuation">;</span>
    server_name example.com<span class="token punctuation">;</span>
    index index.html index.htm<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">$server_port</span> <span class="token operator">!</span>~ <span class="token number">443</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        rewrite ^<span class="token punctuation">(</span>/.*<span class="token punctuation">)</span>$ https://<span class="token variable">$host</span><span class="token variable">$1</span> permanent<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
        

    ssl_certificate <span class="token variable">$path</span>-to-fullchain.pem<span class="token punctuation">;</span>
    ssl_certificate_key <span class="token variable">$path</span>-to-private.key<span class="token punctuation">;</span>

    <span class="token comment">#no ssl v3</span>
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2<span class="token punctuation">;</span>
    ssl_prefer_server_ciphers on<span class="token punctuation">;</span>
    <span class="token comment">#sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048 or 4096</span>
    ssl_dhparam /etc/ssl/certs/dhparam.pem<span class="token punctuation">;</span>
    ssl_ciphers <span class="token string">&#39;ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA&#39;</span><span class="token punctuation">;</span>
    ssl_session_timeout 1d<span class="token punctuation">;</span>
    ssl_session_cache shared:SSL:50m<span class="token punctuation">;</span>
    ssl_stapling on<span class="token punctuation">;</span>
    ssl_stapling_verify on<span class="token punctuation">;</span>
    <span class="token comment">#Support HSTS</span>
    add_header Strict-Transport-Security max-age<span class="token operator">=</span><span class="token number">31536000</span><span class="token punctuation">;</span>
    <span class="token comment">#can be show in frame? DENY - SAMEORIGIN - ALLOW-FROM https://example.com/</span>
    add_header X-Frame-Options DENY<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
        <span class="token comment"># First attempt to serve request as file, then</span>
        <span class="token comment"># as directory, then fall back to displaying a 404.</span>
        try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ <span class="token operator">=</span><span class="token number">404</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">### Add Custom Error Pages Config</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="php" tabindex="-1"><a class="header-anchor" href="#php" aria-hidden="true">#</a> PHP</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># pass the PHP scripts to FastCGI server listening on unix socket</span>
location ~ <span class="token punctuation">\\</span>.php$ <span class="token punctuation">{</span>
        fastcgi_split_path_info ^<span class="token punctuation">(</span>.+<span class="token punctuation">\\</span>.php<span class="token punctuation">)</span><span class="token punctuation">(</span>/.+<span class="token punctuation">)</span>$<span class="token punctuation">;</span>

        fastcgi_pass unix:/var/run/php5-fpm.sock<span class="token punctuation">;</span>

        fastcgi_param  SCRIPT_FILENAME  <span class="token variable">$document_root</span>/<span class="token variable">$fastcgi_script_name</span><span class="token punctuation">;</span>
        include        fastcgi_params<span class="token punctuation">;</span>
        fastcgi_index  index.php<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deny-to-run-php" tabindex="-1"><a class="header-anchor" href="#deny-to-run-php" aria-hidden="true">#</a> Deny to run PHP</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">#such as /upload/</span>
location /<span class="token variable">$path_in_the_url</span>/ <span class="token punctuation">{</span>
        location ~ .*<span class="token punctuation">\\</span>.<span class="token punctuation">(</span>php<span class="token punctuation">)</span>?$
        <span class="token punctuation">{</span>
            deny all<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="url-with-password" tabindex="-1"><a class="header-anchor" href="#url-with-password" aria-hidden="true">#</a> Url with Password</h2><p>生成密码密钥</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>openssl passwd -apr1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编辑认证文件 <code>/etc/nginx/pma_pass</code> 格式为 <code>$username:上一步的字符串</code></p><p>加入配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>location /path <span class="token punctuation">{</span>
    auth_basic <span class="token string">&quot;Admin Login&quot;</span><span class="token punctuation">;</span>
    auth_basic_user_file /etc/nginx/pma_pass<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),p=[t];function l(c,o){return s(),a("div",null,p)}const r=n(i,[["render",l],["__file","nginx.html.vue"]]);export{r as default};
