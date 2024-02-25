import{_ as l,r as t,o as r,c as d,a as e,b as s,d as a,e as i}from"./app-pwymEAKl.js";const c={},o=i(`<h1 id="wireguard-setup" tabindex="-1"><a class="header-anchor" href="#wireguard-setup" aria-hidden="true">#</a> Wireguard Setup</h1><h2 id="wireguard" tabindex="-1"><a class="header-anchor" href="#wireguard" aria-hidden="true">#</a> Wireguard</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> wireguard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="开启系统转发" tabindex="-1"><a class="header-anchor" href="#开启系统转发" aria-hidden="true">#</a> 开启系统转发</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>若需要重启后仍然生效记得将上述配置保存到 <code>/etc/sysctl.conf</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>net.ipv4.ip_forward=1
net.ipv6.conf.all.forwarding=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>首先生成密钥对，每个客户端需要生产一对</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wg genkey | tee peer_A.key | wg pubkey &gt; peer_A.pub
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务端创建并编辑 <code>/etc/wireguard/wg0.conf</code> ，内容如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Interface]
ListenPort = 51820
PrivateKey = &lt;Server PrivateKey&gt;
Address = 10.1.1.1/24
DNS = 223.5.5.5
MTU = 1392
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o enp3s0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o enp3s0 -j MASQUERADE

[Peer]
PublicKey = &lt;Client PublicKey&gt;
AllowedIPs = 10.1.1.100/32
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动服务端" tabindex="-1"><a class="header-anchor" href="#启动服务端" aria-hidden="true">#</a> 启动服务端</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wg-quick up wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置开机自启</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>systemctl enable wg-quick@wg0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看状态</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>wg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置" aria-hidden="true">#</a> 客户端配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[Interface]
PrivateKey = &lt;Client PrivateKey&gt;
Address = 10.1.1.100/32

[Peer]
PublicKey = &lt;Server PublicKey&gt;
Endpoint = &lt;Server IP&gt;:&lt;Port&gt;
AllowedIPs = 0.0.0.0/0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="wireguard-ui" tabindex="-1"><a class="header-anchor" href="#wireguard-ui" aria-hidden="true">#</a> WireGuard UI</h2><h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>`,23),p=e("br",null,null,-1),u={href:"https://songxwn.com/WireGuard-UI-install/",target:"_blank",rel:"noopener noreferrer"},v=e("br",null,null,-1),m={href:"https://github.com/ngoduykhanh/wireguard-ui",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>使用二进制文件进行安装。</p><p>可以使用 WEB 管理，缺点生成配置文件时没有考虑端口转发是不同端口的情况，需要使用一样的端口</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /opt

<span class="token function">mkdir</span> wireguard-ui

<span class="token function">wget</span> https://github.com/ngoduykhanh/wireguard-ui/releases/download/v0.6.2/wireguard-ui-v0.6.2-linux-amd64.tar.gz

<span class="token comment"># 解压到指定文件夹</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> wireguard-ui-v*.tar.gz <span class="token parameter variable">-C</span> ./wireguard-ui/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置-systemd" tabindex="-1"><a class="header-anchor" href="#设置-systemd" aria-hidden="true">#</a> 设置 Systemd</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /opt/wireguard-ui/.env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 配置绑定IP和端口，默认为5000</span>
<span class="token assign-left variable">BIND_ADDRESS</span><span class="token operator">=</span><span class="token number">0.0</span>.0.0:5000

<span class="token comment"># SMTP 邮件发送人地址</span>
<span class="token assign-left variable">EMAIL_FROM_ADDRESS</span><span class="token operator">=</span>
<span class="token comment"># 邮件人名字</span>
<span class="token assign-left variable">EMAIL_FROM_NAME</span><span class="token operator">=</span>
<span class="token comment"># SMTP服务器域名或IP</span>
<span class="token assign-left variable">SMTP_HOSTNAME</span><span class="token operator">=</span>
<span class="token comment"># SMTP服务器端口</span>
<span class="token assign-left variable">SMTP_PORT</span><span class="token operator">=</span><span class="token number">465</span>
<span class="token comment"># 邮箱登录账号</span>
<span class="token assign-left variable">SMTP_USERNAME</span><span class="token operator">=</span>
<span class="token comment"># 邮箱登录密码</span>
<span class="token assign-left variable">SMTP_PASSWORD</span><span class="token operator">=</span>
<span class="token comment"># 登录方式</span>
<span class="token assign-left variable">SMTP_AUTH_TYPE</span><span class="token operator">=</span>LOGIN
<span class="token comment"># 加密方式，一般为SSL</span>
<span class="token assign-left variable">SMTP_ENCRYPTION</span><span class="token operator">=</span>SSL

<span class="token comment"># 配置Web界面网站图标，可不配置。</span>
<span class="token comment">#WGUI_FAVICON_FILE_PATH=/tmp/1.ico</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置 <code>Systemd</code> 配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/systemd/system/wireguard-ui.service

<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>WireGuard UI Daemon
<span class="token assign-left variable">Wants</span><span class="token operator">=</span>network-online.target
<span class="token assign-left variable">After</span><span class="token operator">=</span>network-online.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">User</span><span class="token operator">=</span>root
<span class="token assign-left variable">Group</span><span class="token operator">=</span>root
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">WorkingDirectory</span><span class="token operator">=</span>/opt/wireguard-ui
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>/opt/wireguard-ui/.env
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/opt/wireguard-ui/wireguard-ui

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置开机启动" tabindex="-1"><a class="header-anchor" href="#配置开机启动" aria-hidden="true">#</a> 配置开机启动</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 重新加载UI服务文件、启动、配置开机、查看状态</span>
systemctl daemon-reload 
systemctl start wireguard-ui.service 
systemctl <span class="token builtin class-name">enable</span> wireguard-ui.service 
systemctl status wireguard-ui.service 

<span class="token comment"># 配置wg0 接口的wg服务开机启动。</span>
systemctl restart wg-quick@wg0.service

systemctl <span class="token builtin class-name">enable</span> wg-quick@wg0.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置配置文件修改-自动重新加载生效" tabindex="-1"><a class="header-anchor" href="#设置配置文件修改-自动重新加载生效" aria-hidden="true">#</a> 设置配置文件修改，自动重新加载生效</h3><p>WireGuard-UI 只负责配置信息生成。可以使用 systemd 来监视更改并重新加载配置，使新客户端配置自动生效。</p><p>如下，创建两个服务文件</p><p><code>vim /etc/systemd/system/wgui.service</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Restart WireGuard
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>oneshot
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/bin/systemctl reload wg-quick@wg0.service

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">RequiredBy</span><span class="token operator">=</span>wgui.path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>vim /etc/systemd/system/wgui.path</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Watch /etc/wireguard/wg0.conf <span class="token keyword">for</span> changes

<span class="token punctuation">[</span>Path<span class="token punctuation">]</span>
<span class="token assign-left variable">PathModified</span><span class="token operator">=</span>/etc/wireguard/wg0.conf

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置为开机启动</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>systemctl daemon-reload
systemctl <span class="token builtin class-name">enable</span> wgui.<span class="token punctuation">{</span>path,service<span class="token punctuation">}</span>
systemctl start wgui.<span class="token punctuation">{</span>path,service<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,19);function g(h,k){const n=t("ExternalLinkIcon");return r(),d("div",null,[o,e("p",null,[s("参考："),p,e("a",u,[s("WireGuard-UI 安装和配置"),a(n)]),v,e("a",m,[s("WireGuard-UI Github"),a(n)])]),b])}const w=l(c,[["render",g],["__file","wireguard.html.vue"]]);export{w as default};
