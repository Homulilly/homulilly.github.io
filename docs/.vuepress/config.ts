import { defineUserConfig } from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'NEP NOTE',
  description: "by AROES",
  head: [
    ['meta', { name: 'application-name', content: 'NEP NOTE' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'NEP NOTE' }],
    ['link', { rel: 'icon', href: '/assets/favicon.png' }],
  ],
  theme: recoTheme({ 
    primaryColor: '#FF69B4',
    navbar: [
      { text: 'VuePress',
        icon: 'List', 
        children: [
          {text: "VuePress 安装", link: `/vuepress`},
          {text: "VuePress 指南", link: `https://v2.vuepress.vuejs.org/zh/reference/config.html`},
          {text: "VuePress-reco 指南", link: `http://v2.vuepress-reco.recoluan.com/docs/theme/series.html`},
        ]
      },
      { text: 'Kotlin', icon: 'Code', 
        children: [
          {text: 'Desktop', link: '/kotlin/desktop/'},
          {text: 'Documents', link: 'https://kotlinlang.org/docs/multiplatform.html'}
        ], 
      },
      { text: '笔记', icon: 'Notebook', link: '/note/' },
      { text: '书签', icon: 'Bookmark', link: '/bookmark/' },
      { text: 'Github', icon: 'LogoGithub', link: 'https://github.com/Homulilly/homulilly.github.io/' },
    ],
    series: {
      '/note/': [
        {
          text: '笔记',
          children: [ 
            '/note/git', 
            '/note/network',
          ]
        },
        {
          text: 'Server',
          children: [
            '/note/server/goaccess',
            '/note/server/letsencrypt',
            '/note/server/nginx',
          ]
        },
        {
          text: 'Linux',
          children: [
            '/note/linux/command',
            '/note/linux/ssh-config',
            '/note/linux/systemd',
          ]
        }
      ],
      '/bookmark/': [{
        text: 'BOOKMARK',
        children: [
          '/bookmark/app'
        ]
      }

      ],
      '/kotlin/':[{
        text: 'Base',
        children:[
          '/kotlin/class'
        ]
      },{
        text: 'Desktop',
        children:[
          '/kotlin/desktop'
        ]
      }]
    }
  })
})
