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
    locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      '/': {
        lang: 'zh-CN',
        title: 'VuePress',
        description: 'Vue 驱动的静态网站生成器',
      },
    },
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
      { text: '笔记', icon: 'Notebook', link: '/docs/note/' },
      { text: '书签', icon: 'Bookmark', link: '/docs/bookmark/' },
      { text: 'Github', icon: 'LogoGithub', link: 'https://github.com/Homulilly/homulilly.github.io/' },
    ],
    
    autoSetSeries: true,
  })
})
