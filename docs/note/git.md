---
title: Git
---

# Git

## 初始化仓库
```sh
# 本地仓库
cd $path && git init

# 空白的远程仓库，进用于共享，没有工作区
git init --bare usami.git
```

## 回滚
```sh
git reset HEAD~1
```

## 修改提交注释
```sh
git commit --amend
```

## Github
```sh
git init
git add README.md
git commit -m "Initial Commit"
git remote add origin git@github.com:$USER/repository.git
git push -u origin master
```

## 修改历史注释
```bash
# 修改倒数第三次
git rebase -i HEAD~3
```
在出现的编辑器中将要修改的那行 `pick` 修改为 `edit`

```bash
# 修改 commit
git commit --amend

# 恢复
git rebase --continue

# 强制提交到 github 覆盖远程版本
git push -u origin master -f  
```

## githooks for Hexo update

### 添加 git 用户
```sh
sudo adduser git

# add ssh key
sudo su git
cd ~ && mkdir .ssh
vim authorized_keys
exit

# change /bin/bash to /usr/bin/git-shell of user git
sudo vim /etc/passwd
```

### 创建 repo
```sh
mkdir [path]/repo && cd [path]/repo
sudo chown git:git [path]/repo

sudo -u git git init --bare hexo.git

cd [path]/repo/blog.git
vim post-receive
```
加入下面内容
```bash
#!/bin/sh
git --work-tree=[path to blog] --git-dir=[path]/repo/blog.git checkout -f
```

### 设置权限
```sh
chmod +x post-receive

chown -R git:git blog.git
```

### Error

Push 时提示下面的错误

::: danger 
```
remote: error: The last gc run reported the following. Please correct the root cause
remote: and remove gc.log.
remote: Automatic cleanup will not be performed until the file is removed.
remote:
remote: warning: There are too many unreachable loose objects; run 'git prune' to remove them.
```
::: 

进入 git 目录，运行下面的命令，然后重新 push
```
git gc --prune=now
```