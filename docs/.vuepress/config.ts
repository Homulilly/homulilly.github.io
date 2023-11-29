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
        link: '/vuepress'
      },
      // { text: 'Kotlin', icon: 'Code', 
      //   children: [
      //     {text: 'Desktop', link: '/kotlin/desktop/'},
      //     {text: 'Documents', link: 'https://kotlinlang.org/docs/multiplatform.html'}
      //   ], 
      // },
      // { text: 'Android', icon: 'Code', link: '/android/codelab/' },
      { text: '笔记', icon: 'Notebook', link: '/note/' },
      { text: '书签', icon: 'Bookmark', link: '/bookmark/' },
      { text: 'Github', icon: 'LogoGithub', link: 'https://github.com/Homulilly/homulilly.github.io/' },
    ],
    
    series: {
      '/android/':[
        {
          text: 'Learn From 0',
          children: [
            '/android/codelab/kotlin-basic'
          ]
        }
      ],
      '/note/': [
        {
          text: '笔记',
          children: [ 
            '/note/git', 
            '/note/network',
            '/note/win11',
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
            '/note/linux/config',
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
