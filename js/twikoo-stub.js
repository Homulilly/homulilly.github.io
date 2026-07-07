/* Local Twikoo SDK stub for guestbook-wall verification only. NOT for commit. */
(function () {
  var NICKS = ['小鹿', 'Momiji', '旅人甲', 'Aki', '匿名の友', 'paperfan', '星野', 'Lin', '茶々丸', 'Kaede', '路过的猫', 'Yuu'];
  var TEXTS = [
    '第一次来，主题好可爱！像翻开了一本手帐。',
    '路过贴一张～\n祝博主天天开心！',
    '从友链跳过来的，文章写得很扎实，收藏了。RSS 已订阅，期待更新。这里多写几句测试一下长文本的折行与行数裁剪效果。',
    '这个留言墙创意绝了 👍',
    '冬天快乐！',
    '请问主题在哪里下载呀？',
    '来交换友链的，已加贵站 :)',
    '每次来都有新变化，坚持写作真的不容易，加油！',
    '测试 emoji 🎉🐈✨',
    '信封配色好评！',
    '沙发！',
    '看完文章顺手留个爪印。'
  ];
  function makeComment(i) {
    return {
      id: 'stub-comment-' + (i + 1) + '-' + (i * 2654435761 % 997),
      url: window.location.pathname,
      nick: NICKS[i % NICKS.length],
      comment: '<p>' + TEXTS[i % TEXTS.length] + '</p>',
      commentText: TEXTS[i % TEXTS.length],
      created: Date.now() - i * 86400000 * 3,
      avatar: i % 3 === 0 ? 'https://cravatar.cn/avatar/' + i + '?d=identicon' : '',
      relativeTime: i * 3 + ' 天前'
    };
  }
  var FIXTURES = [];
  for (var i = 0; i < 20; i++) FIXTURES.push(makeComment(i));
  window.twikoo = {
    init: function () {},
    getRecentComments: function (options) {
      return Promise.resolve(FIXTURES.slice(0, (options && options.pageSize) || 10));
    },
    getCommentsCount: function () {
      return Promise.resolve([{ url: window.location.pathname, count: 29 }]);
    }
  };
})();
