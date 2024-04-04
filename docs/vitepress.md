# VitePress

VuePress + VuePress Theme Reco 是很好看，但是已经两次遇到更新升级出错的问题了，之前看到了 VitePress ，于是切换过来试试。  

## 安装
[VitePress - 快速开始](https://vitepress.dev/zh/guide/getting-started)

```sh
yarn add -D vitepress
```

安装向导
```sh
npx vitepress init
```

## 自动生成侧栏
需要安装插件 [vite-plugin-vitepress-auto-sidebar](https://github.com/QC2168/vite-plugin-vitepress-auto-sidebar)

```sh
yarn add vite-plugin-vitepress-auto-sidebar
```

然后编辑配置文件 `.vitepress/config.mts` 

```js
// import 
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

export default defineConfig({
  vite: {
    plugins: [
      // add plugin
      AutoSidebar({
        // 自动从文档内读取标题
        titleFromFile: true
      })
    ]
  },

  // 删除或是注释原本的 sidebar 部分
  // sidebar: [
  //   {
  //     text: 'Examples',
  //     items: [
  //       { text: 'Markdown Examples', link: '/markdown-examples' },
  //       { text: 'Runtime API Examples', link: '/api-examples' }
  //     ]
  //   }
  // ],
})
```

和 VuePress 不同 VitePress 是将 `index.md` 编译为 `index.html` 。   
一级目录没有侧栏。  
访问二级文件夹目录后就会生成侧栏(要存在 index.md 否则会 404)。  
比如 `http://127.0.0.1:5173/note/`  

不得不说，确实嘎嘎快。  

## 使用
### 首页
首页是编辑 `docs` 目录下的 `index.md` ，可以直接抄官方的 [index.md](https://github.com/vuejs/vitepress/blob/main/docs/zh/index.md?plain=1)
### 启用搜索
使用 [本地搜索](https://vitepress.dev/zh/reference/default-theme-search#local-search) 即可
```js{4-9}
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 启用搜索  
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### 代码行号
可以通过以下配置为每个代码块启用行号： 
```
export default {
  markdown: {
    lineNumbers: true
  }
}
```

[更多高级用法](https://vitepress.dev/zh/guide/markdown#line-numbers) 

### Public 资源目录

如果项目根目录是 `./docs`，并且使用默认源目录位置，那么 `public` 目录将是 `./docs/publi`。

### 指定 Favicon 
在配置文件 `.vitepress/config.mts` 中指定 header 
```js
head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png"}],
],    
```

### 主题基色
[自定义 CSS](https://vitepress.dev/zh/guide/extending-default-theme#customizing-css)
可以通过覆盖根级别的 CSS 变量来自定义默认主题的 CSS： 
```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

```css
/* .vitepress/theme/custom.css */
:root {  
    /* 主题基色 */
    --vp-c-brand-1: #f5439c;
    /* 鼠标悬浮时 */
    --vp-c-brand-2: #f96fb4;
    --vp-c-brand-3: #f5439c;
  }
```
查看 [默认主题 CSS 变量](https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css) 来获取可以被覆盖的变量。

## 部署到 Github Pages
### public 文件夹下创建 CNAME 文件
### 设置 .gitignore
```txt
/coverage
/src/client/shared.ts
/src/node/shared.ts
*.log
*.tgz
.DS_Store
.idea
.temp
.vite_opt_cache
.vscode
dist
cache
temp
examples-temp
node_modules
pnpm-global
TODOs.md
config.mts.timestamp-*
```

### 编写 `workflows` 文件
可以直接使用 Github 的 workflows 功能，当我们把文档源文件备份到 Github 时，自动更新 Github Pages。  
在项目根目录下创建 `.github/workflows/build-pages-vite.yml` 即可。  
```yml
name: build-pages

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 20
          
      - name: Run install
        uses: borales/actions-yarn@v5
        with:
          cmd: install # will run `yarn install` command

      # 运行构建脚本
      - name: Build VitePress Site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vitepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 测试然后推送
本地执行 `yarn docs:build` 确认没有错误。  
然后推送。  