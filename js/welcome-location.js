/* FlatPaper — 侧边栏定位欢迎卡片（外挂版）
 *
 * 放在站点的 source/js/welcome-location.js，通过主题配置注入：
 *   inject:
 *     bottom:
 *       - <script src="/js/welcome-location.js" defer></script>
 *
 * 主题不内置这个功能：它需要把每个访客的 IP 发给腾讯位置服务，而且只能走
 * JSONP（该接口不发 CORS 头），也就是页面会在自身上下文里执行该域返回的脚本。
 * 这个取舍应该由站长自己做，所以实现留在站点侧。
 */
(function () {
  'use strict';

  // ============ 配置开始 ============
  var CONFIG = {
    // 腾讯位置服务 WebServiceAPI Key，必填。留空则整个卡片不渲染。
    // https://lbs.qq.com/dev/console/application/mine
    key: '',

    // 博主坐标。两个都填才会显示「距博主约 N 公里」那一行；
    // 缺一个就整行不渲染 —— 否则会以 Null Island（0°/0°）为基准算出错误距离。
    longitude: null,   // 例如 105.43501
    latitude: null,    // 例如 28.87875

    unit: '公里',
    ipv6Text: '好复杂，咱看不懂~(ipv6)',
    timeout: 8000,

    title: '欢迎来访',
    loading: '定位中…',
    failed: '定位失败',

    // 地区寄语。键可以写到国、省、市三级，查找顺序：
    //   国 省 市 → 国 省 → 省 市 → 省 → 市 → 国 → default，命中即停。
    // 这张表是 PR #9 原作者 jinghuashang 写的，原样搬过来了 ——
    // 它是他的语气，建议换成你自己的话。
    messages: {
      // ---- 国家 ----
      '日本':                  "よろしく，一起去看樱花吗",
      '美国':                  "Let us live in peace!",
      '英国':                  "想同你一起夜乘伦敦眼",
      '俄罗斯':                "干了这瓶伏特加！",
      '法国':                  "C'est La Vie",
      '德国':                  "Die Zeit verging im Fluge.",
      '澳大利亚':              "一起去大堡礁吧！",
      '加拿大':                "拾起一片枫叶赠予你",

      // ---- 中国各省市 ----
      '中国 北京市':           "北——京——欢迎你~~~",
      '中国 天津市':           "讲段相声吧",
      '中国 河北省':           "山势巍巍成壁垒，天下雄关铁马金戈由此向，无限江山",
      '中国 山西省':           "展开坐具长三尺，已占山河五百余",
      '中国 内蒙古自治区':     "天苍苍，野茫茫，风吹草低见牛羊",
      '中国 辽宁省':           "我想吃烤鸡架！",
      '中国 吉林省':           "状元阁就是东北烧烤之王",
      '中国 黑龙江省':         "很喜欢哈尔滨大剧院",
      '中国 上海市':           "众所周知，中国只有两个城市",
      '中国 江苏省 南京市':    "这是我挺想去的城市啦",
      '中国 江苏省 苏州市':    "上有天堂，下有苏杭",
      '中国 江苏省':           "散装是必须要散装的",
      '中国 浙江省':           "东风渐绿西湖柳，雁已还人未南归",
      '中国 河南省 郑州市':    "豫州之域，天地之中",
      '中国 河南省 南阳市':    "臣本布衣，躬耕于南阳此南阳非彼南阳！",
      '中国 河南省 驻马店市':  "峰峰有奇石，石石挟仙气嵖岈山的花很美哦！",
      '中国 河南省 开封市':    "刚正不阿包青天",
      '中国 河南省 洛阳市':    "洛阳牡丹甲天下",
      '中国 河南省':           "可否带我品尝河南烩面啦？",
      '中国 安徽省':           "蚌埠住了，芜湖起飞",
      '中国 福建省':           "井邑白云间，岩城远带山",
      '中国 江西省':           "落霞与孤鹜齐飞，秋水共长天一色",
      '中国 山东省':           "遥望齐州九点烟，一泓海水杯中泻",
      '中国 湖北省 黄冈市':    "红安将军县！辈出将才！",
      '中国 湖北省':           "来碗热干面~",
      '中国 湖南省':           "74751，长沙斯塔克",
      '中国 广东省 广州市':    "看小蛮腰，喝早茶了嘛~",
      '中国 广东省 深圳市':    "今天你逛商场了嘛~",
      '中国 广东省 阳江市':    "阳春合水！博主家乡~ 欢迎来玩~",
      '中国 广东省':           "来两斤福建人~",
      '中国 广西壮族自治区':   "桂林山水甲天下",
      '中国 海南省':           "朝观日出逐白浪，夕看云起收霞光",
      '中国 四川省':           "康康川妹子",
      '中国 贵州省':           "茅台，学生，再塞200",
      '中国 云南省':           "玉龙飞舞云缠绕，万仞冰川直耸天",
      '中国 西藏自治区':       "躺在茫茫草原上，仰望蓝天",
      '中国 陕西省':           "来份臊子面加馍",
      '中国 甘肃省':           "羌笛何须怨杨柳，春风不度玉门关",
      '中国 青海省':           "牛肉干和老酸奶都好好吃",
      '中国 宁夏回族自治区':   "大漠孤烟直，长河落日圆",
      '中国 新疆维吾尔自治区': "驼铃古道丝绸路，胡马犹闻唐汉风",
      '中国 台湾省':           "我在这头，大陆在那头",
      '中国 香港特别行政区':   "永定贼有残留地鬼嚎，迎击光非岁玉",
      '中国 澳门特别行政区':   "性感荷官，在线发牌",

      // ---- 兜底：中国未列出的省份 / 其他国家 ----
      '中国':                  "带我去你的城市逛逛吧！",
      'default':               "带我去你的国家逛逛吧"
    },

    // [起始小时, 结束小时, 文案)，左闭右开
    greetings: [
      [5, 11, '🌤️ 早上好，一日之计在于晨'],
      [11, 13, '☀️ 中午好，记得午休喔~'],
      [13, 17, '🕞 下午好，饮茶先啦！'],
      [17, 19, '🚶 即将下班，记得按时吃饭~'],
      [19, 24, '🌙 晚上好，夜生活嗨起来！'],
      [0, 5, '夜深了，早点休息，少熬夜']
    ]
  };
  // ============ 配置结束 ============

  if (!CONFIG.key) return;

  var anchor = document.querySelector('.profile-card');
  if (!anchor) return;

  // 卡片骨架。加上 side-card 就继承主题的纸面背景、圆角和胶带装饰，
  // 不需要自己画。
  //
  // 注意：不要加 reveal 类。主题 main.js 的 initReveal() 在脚本开头就把
  // 当时存在的 .reveal 交给了 IntersectionObserver，之后插入的元素不会被
  // 观察到，而 .reveal-ready .reveal:not(.is-revealed) { opacity: 0 }
  // 会让它永久不可见。
  var card = document.createElement('section');
  card.className = 'side-card welcome-loc-card';
  card.setAttribute('aria-label', CONFIG.title);

  var head = document.createElement('h2');
  head.textContent = '📍 ' + CONFIG.title;

  var info = document.createElement('div');
  info.className = 'welcome-loc-card__info';
  info.setAttribute('aria-live', 'polite');
  info.textContent = CONFIG.loading;

  card.appendChild(head);
  card.appendChild(info);
  anchor.insertAdjacentElement('afterend', card);

  var seq = 0;

  function jsonp(url, done) {
    var name = 'flatpaperWL' + Date.now().toString(36) + (++seq);
    var script = null;
    var timer = null;
    var settled = false;

    // 三条路（回调 / onerror / 超时）走同一个出口，且只结算一次：
    // 回调清掉、script 节点移除、定时器清掉，不留全局残留。
    function settle(data) {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try { delete window[name]; } catch (e) { window[name] = undefined; }
      if (script && script.parentNode) script.parentNode.removeChild(script);
      done(data);
    }

    window[name] = function (res) { settle(res); };

    script = document.createElement('script');
    script.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + encodeURIComponent(name);
    script.onerror = function () { settle(null); };
    // 接口返回 HTML 错误页或配额响应时，回调和 onerror 都不会触发 ——
    // 超时是唯一的出口，没有它卡片会永远停在「定位中…」。
    timer = setTimeout(function () { settle(null); }, CONFIG.timeout);
    (document.body || document.documentElement).appendChild(script);
  }

  // 球面距离：先算两点的弦长，再转成弧长。单位公里。
  function distanceKm(lng1, lat1, lng2, lat2) {
    var R = 6371;
    var rad = Math.PI / 180;
    function point(lng, lat) {
      var a = lng * rad;
      var b = lat * rad;
      return { x: Math.cos(b) * Math.cos(a), y: Math.cos(b) * Math.sin(a), z: Math.sin(b) };
    }
    var p = point(lng1, lat1);
    var q = point(lng2, lat2);
    var chord = Math.hypot(p.x - q.x, p.y - q.y, p.z - q.z);
    return Math.round(Math.asin(chord / 2) * 2 * R);
  }

  function pickMessage(ad) {
    var nation = String(ad.nation || '').trim();
    var province = String(ad.province || '').trim();
    var city = String(ad.city || '').trim();
    var candidates = [
      [nation, province, city],
      [nation, province],
      [province, city],
      [province],
      [city],
      [nation]
    ];
    for (var i = 0; i < candidates.length; i++) {
      var key = candidates[i].filter(Boolean).join(' ');
      if (key && CONFIG.messages[key]) return CONFIG.messages[key];
    }
    return CONFIG.messages['default'] || '';
  }

  function pickGreeting() {
    var hour = new Date().getHours();
    for (var i = 0; i < CONFIG.greetings.length; i++) {
      var g = CONFIG.greetings[i];
      if (hour >= g[0] && hour < g[1]) return g[2];
    }
    return '';
  }

  // 一行文本，可选一段 <b> 强调。全部走 textContent —— 地名和 IP 来自
  // 第三方接口的响应，不进 innerHTML。
  function line(before, strong, after) {
    var el = document.createElement('div');
    if (before) el.appendChild(document.createTextNode(before));
    if (strong) {
      var b = document.createElement('b');
      b.textContent = strong;
      el.appendChild(b);
    }
    if (after) el.appendChild(document.createTextNode(after));
    return el;
  }

  function render(result) {
    var ad = result.ad_info || {};
    var place = ad.nation === '中国'
      ? [ad.province, ad.city, ad.district].filter(Boolean).join(' ')
      : String(ad.nation || '');
    var ip = String(result.ip || '');

    info.textContent = '';

    if (place) info.appendChild(line('欢迎来自 ', place, ' 的小友 💖'));

    var message = pickMessage(ad);
    if (message) info.appendChild(line(message + ' 🍂'));

    var lng = parseFloat(CONFIG.longitude);
    var lat = parseFloat(CONFIG.latitude);
    var loc = result.location || {};
    if (isFinite(lng) && isFinite(lat) && isFinite(loc.lng) && isFinite(loc.lat)) {
      var km = distanceKm(lng, lat, loc.lng, loc.lat);
      info.appendChild(line('当前位置距博主约 ', String(km), ' ' + CONFIG.unit));
    }

    if (ip) info.appendChild(line('你的 IP：', ip.indexOf(':') > -1 ? CONFIG.ipv6Text : ip));

    var greeting = pickGreeting();
    if (greeting) info.appendChild(line(greeting));

    if (!info.childNodes.length) info.textContent = CONFIG.failed;
  }

  function start() {
    var url = 'https://apis.map.qq.com/ws/location/v1/ip?key=' +
      encodeURIComponent(CONFIG.key) + '&output=jsonp';
    jsonp(url, function (res) {
      if (!res || res.status !== 0 || !res.result) {
        info.textContent = CONFIG.failed;
        return;
      }
      render(res.result);
    });
  }

  // 定位不是首屏内容，等浏览器空下来再发请求，不和页面加载抢带宽。
  if (window.requestIdleCallback) window.requestIdleCallback(start, { timeout: 3000 });
  else setTimeout(start, 800);
})();
