# 部署指南

## 方法1: 使用GitHub CLI（推荐）

### 前置要求

1. 安装GitHub CLI:
```bash
brew install gh
```

2. 登录GitHub:
```bash
gh auth login
```

### 执行部署

```bash
./scripts/deploy-with-gh.sh
```

这个脚本会自动完成:
- ✅ 创建GitHub Release
- ✅ 更新仓库信息
- ✅ 添加仓库标签
- ⚠️ GitHub Pages需要手动配置（脚本会给出提示）

## 方法2: 手动部署

### 1. 推送代码到GitHub

```bash
git add .
git commit -m "Update project"
git push origin main
```

### 2. 创建GitHub Release

访问: https://github.com/jacjackai/htmlPPT/releases/new

填写:
- Tag: `v1.0.0`
- Title: `HTML PPT v1.0.0`
- Description: 复制 `release-notes.md` 的内容

### 3. 配置GitHub Pages

访问: https://github.com/jacjackai/htmlPPT/settings/pages

设置:
- Source: Branch
- Branch: `main`
- Folder: `/ (root)`

点击 Save

### 4. 等待部署完成

GitHub Pages会自动构建，通常需要1-5分钟。

完成后访问: https://jacjackai.github.io/htmlPPT

## 常见问题

### Q: 为什么会出现 "Rate limit exceeded" 错误?

A: 这是GitHub API的速率限制。未认证的请求每小时只允许60次。使用GitHub CLI可以避免这个问题。

### Q: GitHub Pages显示404怎么办?

A: 等待几分钟让GitHub完成构建。如果还是404，检查:
1. 仓库是否公开
2. Pages配置是否正确
3. 是否有index.html文件

### Q: 如何更新部署?

A: 只需要:
```bash
git add .
git commit -m "Update"
git push origin main
```

GitHub Pages会自动重新构建。
