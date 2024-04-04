import { defineConfig } from 'vitepress'
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        // You can also set options to adjust sidebar data
        // see option document below
        // https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar
        titleFromFile: true
      })
    ]
  },

  markdown: {
    lineNumbers: true
  },

  title: "NEP NOTE",
  description: "NEPNEP",
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicon.png"}],
  ],    
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/note/' },
      { text: '书签', link: '/bookmark/' }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
