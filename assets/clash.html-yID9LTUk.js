import{_ as l,r as i,o as p,c,a as n,b as s,d as e,e as t}from"./app-pwymEAKl.js";const o={},r=n("h1",{id:"clash-setup",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#clash-setup","aria-hidden":"true"},"#"),s(" Clash Setup")],-1),u=n("ul",null,[n("li",null,"Clash.Meta"),n("li",null,"Debian 12")],-1),d=n("h3",{id:"下载-clash-meta",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#下载-clash-meta","aria-hidden":"true"},"#"),s(" 下载 Clash.Meta")],-1),m={href:"https://github.com/MetaCubeX/Clash.Meta/releases",target:"_blank",rel:"noopener noreferrer"},v=t(`<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">gzip</span> <span class="token parameter variable">-d</span> clash.meta-linux-amd64-cgo-v1.16.0.gz

<span class="token function">mv</span> clash.meta-linux-amd64-cgo-v1.16.0 /opt/clash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建配置文件目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> /etc/clash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建配置文件" tabindex="-1"><a class="header-anchor" href="#创建配置文件" aria-hidden="true">#</a> 创建配置文件</h3><p>创建配置文件 <code>/etc/clash/config.yaml</code>, 并在配置文件中输入以下内容</p><p>用于旁路由要开启 TUN 模式</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">mixed-port</span><span class="token punctuation">:</span> <span class="token number">7890</span> <span class="token comment"># HTTP(S) 和 SOCKS 代理混合端口</span>
<span class="token comment"># port: 7890 # HTTP(S) 代理服务器端口</span>
<span class="token comment"># socks-port: 7891 # SOCKS5 代理端口</span>
<span class="token comment"># redir-port: 7892 # 透明代理端口，用于 Linux 和 MacOS</span>

<span class="token comment"># Linux 透明代理服务器端口（TProxy TCP 和 TProxy UDP）</span>
<span class="token key atrule">tproxy-port</span><span class="token punctuation">:</span> <span class="token number">7893</span>

<span class="token key atrule">allow-lan</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> 
<span class="token key atrule">bind-address</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span> 

<span class="token key atrule">log-level</span><span class="token punctuation">:</span> info

<span class="token comment"># 开启 IPv6 总开关，关闭阻断所有 IPv6 链接和屏蔽 DNS 请求 AAAA 记录</span>
<span class="token key atrule">ipv6</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token comment"># RESTful API 监听地址</span>
<span class="token key atrule">external-controller</span><span class="token punctuation">:</span> 0.0.0.0<span class="token punctuation">:</span><span class="token number">9090</span>
<span class="token comment"># API 的访问密钥</span>
<span class="token key atrule">secret</span><span class="token punctuation">:</span> <span class="token string">&#39;&lt;SecurityKey&gt;&#39;</span>
<span class="token comment"># TCP 并发连接所有 IP, 将使用最快握手的 TCP</span>
<span class="token key atrule">tcp-concurrent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token comment"># 配置 WEB UI 目录，使用 http://{{external-controller}}/ui 访问</span>
<span class="token key atrule">external-ui</span><span class="token punctuation">:</span> <span class="token string">&quot;/etc/clash/ui&quot;</span>

<span class="token comment"># 全局 TLS 指纹，优先低于 proxy 内的 client-fingerprint</span>
<span class="token comment"># 可选： &quot;chrome&quot;,&quot;firefox&quot;,&quot;safari&quot;,&quot;ios&quot;,&quot;random&quot;,&quot;none&quot; options.</span>
<span class="token comment"># Utls is currently support TLS transport in TCP/grpc/WS/HTTP for VLESS/Vmess and trojan.</span>
<span class="token key atrule">global-client-fingerprint</span><span class="token punctuation">:</span> chrome

<span class="token comment"># 为 Linux 下的出站连接提供默认流量标记</span>
<span class="token key atrule">routing-mark</span><span class="token punctuation">:</span> <span class="token number">2233</span>

<span class="token comment"># 统一延迟, 更换延迟计算方式,去除握手等额外延迟</span>
<span class="token key atrule">unified-delay</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">tun</span><span class="token punctuation">:</span>
  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                          <span class="token comment"># 是否启用 tun 模式来路由全局流量。</span>
  <span class="token key atrule">stack</span><span class="token punctuation">:</span> system                         <span class="token comment"># tun 模式堆栈,如无使用问题,建议使用 system 栈;MacOS 用户推荐 gvisor栈</span>
  <span class="token key atrule">dns-hijack</span><span class="token punctuation">:</span>                           <span class="token comment"># dns 劫持,一般设置为 any:53 即可, 即劫持所有 53 端口的 udp 流量</span>
    <span class="token punctuation">-</span> any<span class="token punctuation">:</span><span class="token number">53</span>
    <span class="token punctuation">-</span> tcp<span class="token punctuation">:</span>//any<span class="token punctuation">:</span><span class="token number">53</span>
  <span class="token key atrule">auto-route</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                      <span class="token comment"># 自动设置全局路由,可以自动将全局流量路由进入 tun 网卡。</span>
  <span class="token key atrule">auto-detect-interface</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>           <span class="token comment"># 自动选择流量出口接口,多出口网卡同时连接的设备建议手动指定出口网卡</span>

<span class="token comment"># 使用系统的dns, 也就是dhcp服务器下发的dns服务地址(使用我自建的dns服务来分流)</span>
<span class="token key atrule">dns</span><span class="token punctuation">:</span>
  <span class="token key atrule">enable</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                          <span class="token comment"># 关闭将使用系统 DNS</span>
  <span class="token key atrule">prefer-h3</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                       <span class="token comment"># 开启 DoH 支持 HTTP/3，将并发尝试</span>
  <span class="token key atrule">listen</span><span class="token punctuation">:</span> <span class="token string">&#39;:53&#39;</span>                         <span class="token comment"># 开启 DNS 服务器监听</span>
  <span class="token key atrule">ipv6</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                            <span class="token comment"># false 将返回 AAAA 的空结果    </span>
  <span class="token key atrule">ipv6-timeout</span><span class="token punctuation">:</span> <span class="token number">300</span>                     <span class="token comment"># 单位：ms，内部双栈并发时，向上游查询 AAAA 时，等待 AAAA 的时间，默认 100ms</span>
  <span class="token key atrule">enhanced-mode</span><span class="token punctuation">:</span> fake<span class="token punctuation">-</span>ip                <span class="token comment"># fake-ip or redir-host</span>
  <span class="token key atrule">fake-ip-range</span><span class="token punctuation">:</span> 28.0.0.1/8             <span class="token comment"># fake-ip 池设置</span>
  <span class="token key atrule">fake-ip-filter</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">&#39;*&#39;</span>
    <span class="token punctuation">-</span> <span class="token string">&#39;+.lan&#39;</span>
    <span class="token punctuation">-</span> <span class="token string">&#39;+.local&#39;</span>
  <span class="token key atrule">default-nameserver</span><span class="token punctuation">:</span> 
    <span class="token punctuation">-</span> 223.5.5.5
  <span class="token key atrule">nameserver</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//dns.alidns.com/dns<span class="token punctuation">-</span>query
    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//doh.pub/dns<span class="token punctuation">-</span>query
  <span class="token key atrule">fallback</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//1.0.0.1/dns<span class="token punctuation">-</span>query
    <span class="token punctuation">-</span> tls<span class="token punctuation">:</span>//dns.google
  <span class="token key atrule">fallback-filter</span><span class="token punctuation">:</span>
    <span class="token key atrule">geoip</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">geoip-code</span><span class="token punctuation">:</span> CN
    <span class="token key atrule">ipcidr</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 240.0.0.0/4

<span class="token comment"># 代理</span>
<span class="token key atrule">proxies</span><span class="token punctuation">:</span>
  
<span class="token comment"># 代理组  </span>
<span class="token key atrule">proxy-groups</span><span class="token punctuation">:</span>

<span class="token comment"># 规则</span>
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载-web-ui-面板" tabindex="-1"><a class="header-anchor" href="#下载-web-ui-面板" aria-hidden="true">#</a> 下载 Web UI 面板</h3>`,9),k={href:"https://github.com/MetaCubeX/Yacd-meta",target:"_blank",rel:"noopener noreferrer"},b={href:"https://yacd.metacubex.one/",target:"_blank",rel:"noopener noreferrer"},h=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 下载</span>
<span class="token function">wget</span> https://github.com/MetaCubeX/yacd/archive/gh-pages.zip
<span class="token comment"># 解压</span>
<span class="token function">unzip</span> gh-pages.zip
<span class="token comment"># 重命名</span>
<span class="token function">mv</span> gh-pages /etc/clash/ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试配置文件" tabindex="-1"><a class="header-anchor" href="#测试配置文件" aria-hidden="true">#</a> 测试配置文件</h3><p>输入 <code>/opt/clash -d /etc/clash</code> 启动 clash, 显示内容无报错即配置文件测试通过</p><p>按 Ctrl+C 关闭进程</p><h3 id="创建-systemd-配置文件" tabindex="-1"><a class="header-anchor" href="#创建-systemd-配置文件" aria-hidden="true">#</a> 创建 systemd 配置文件</h3><p>创建 <code>/etc/systemd/system/Clash-Meta.service</code> 输入以下内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Clash-Meta Daemon, Another Clash Kernel.
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target NetworkManager.service systemd-networkd.service iwd.service

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>simple
<span class="token assign-left variable">LimitNPROC</span><span class="token operator">=</span><span class="token number">500</span>
<span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span><span class="token number">1000000</span>
<span class="token assign-left variable">CapabilityBoundingSet</span><span class="token operator">=</span>CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
<span class="token assign-left variable">AmbientCapabilities</span><span class="token operator">=</span>CAP_NET_ADMIN CAP_NET_RAW CAP_NET_BIND_SERVICE
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>always
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/usr/bin/sleep 1s
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/opt/clash <span class="token parameter variable">-d</span> /etc/clash

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置开机自启" tabindex="-1"><a class="header-anchor" href="#设置开机自启" aria-hidden="true">#</a> 设置开机自启</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 开机启动</span>
systemctl <span class="token builtin class-name">enable</span> clash

systemctl start clash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3><ul><li><code>fake-ip</code> 模式下 ping 不到正确的解析</li></ul>`,11),g={href:"https://blog.fillpit.cn/pve-lxc-huan-jing-xia-an-zhuang-pei-zhi-clash-meta/",target:"_blank",rel:"noopener noreferrer"};function y(f,_){const a=i("ExternalLinkIcon");return p(),c("div",null,[r,u,d,n("p",null,[s("Github 下载地址: "),n("a",m,[s("https://github.com/MetaCubeX/Clash.Meta/releases"),e(a)])]),v,n("ul",null,[n("li",null,[s("面板开源地址: "),n("a",k,[s("https://github.com/MetaCubeX/Yacd-meta"),e(a)])]),n("li",null,[s("在线体验地址: "),n("a",b,[s("https://yacd.metacubex.one/"),e(a)])])]),h,n("p",null,[s("Ref: "),n("a",g,[s("pve lxc 环境下 安装配置 Clash Meta 作为透明网关"),e(a)])])])}const C=l(o,[["render",y],["__file","clash.html.vue"]]);export{C as default};
