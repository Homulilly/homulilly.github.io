# My Config

### ZSH

```bash
apt install curl git zsh -y

# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

curl https://m.nep.me/s/zsh > ~/.oh-my-zsh/themes/my.zsh-theme 

sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="my"/' ~/.zshrc

source ~/.zshrc
```

### .vimrc

```bash
syntax on
set mouse-=a
set ts=4
set expandtab
```