# 🎯 HTML PPT GitHub部署快速指南

## 📋 部署前准备

### 1. 确认Git状态
```bash
cd /Users/jack/Project/htmlPPT
git status
```

### 2. 查看提交历史
```bash
git log --oneline
```

### 3. 查看远程仓库
```bash
git remote -v
```

## 🚀 部署步骤

### 步骤1: 创建GitHub仓库

#### 方法A: 通过网页创建（推荐）

1. 访问: https://github.com/new
2. 填写信息:
   ```
   Repository name: htmlppt
   Description: HTML PPT - 纯前端演示文稿制作工具
   Visibility: Public
   ```
3. **重要**: 不要勾选任何初始化选项
4. 点击 "Create repository"

#### 方法B: 使用GitHub CLI（如果已安装）

```bash
# 安装GitHub CLI（如果未安装）
brew install gh

# 登录GitHub
gh auth login

# 创建仓库
gh repo create htmlppt --public --description "HTML PPT - 纯前端演示文稿制作工具"
```

### 步骤2: 配置远程仓库

```bash
# 添加远程仓库（替换jacjackai为你的GitHub用户名）
git remote add origin https://github.com/jacjackai/htmlppt.git

# 验证远程仓库
git remote -v
```

### 步骤3: 推送代码到GitHub

```bash
# 推送到GitHub
git push -u origin main
```

如果遇到错误，尝试：

```bash
# 方法1: 强制推送
git push -u origin main --force

# 方法2: 设置上游分支
git branch -M main
git push -u origin main
```

### 步骤4: 创建版本标签

```bash
# 创建v1.0.0标签
git tag -a v1.0.0 -m "HTML PPT v1.0.0 - 初始版本

主要功能:
- 幻灯片管理
- 演示模式
- 主题系统 (8种主题)
- 模板系统 (10种模板)
- 数据持久化
- 历史记录
- 快捷键系统 (30+快捷键)
- 协作功能
- 导出功能 (5种格式)
- 工具函数库"

# 推送标签
git push origin v1.0.0
```

### 步骤5: 创建GitHub Release

1. 访问: https://github.com/jacjackai/htmlppt/releases/new
2. 选择标签: `v1.0.0`
3. 填写Release标题: `HTML PPT v1.0.0`
4. 填写描述:

```markdown
🎉 HTML PPT v1.0.0 - 初始版本发布

这是HTML PPT的第一个正式版本！

## ✨ 主要功能

- 🎯 **幻灯片管理** - 创建、编辑、删除、排序幻灯片
- 🎬 **演示模式** - 全屏演示，支持键盘控制
- 🎨 **主题系统** - 8种预设主题（浅色、深色、商务、创意等）
- 📋 **模板系统** - 10种专业模板（标题、内容、图片、图表等）
- 💾 **自动保存** - 本地存储，永不丢失
- 🔄 **历史记录** - 支持撤销/重做
- ⌨️ **快捷键** - 30+快捷键，提升效率
- 🤝 **协作功能** - 评论和批注系统
- 📤 **导出功能** - 支持JSON、HTML、Markdown、PDF等格式
- 🛠️ **工具函数** - 丰富的工具函数库

## 🚀 快速开始

### 克隆项目
```bash
git clone https://github.com/jacjackai/htmlppt.git
cd htmlppt
```

### 直接使用
```bash
# 打开主应用
open src/index.html

# 或者使用Python启动本地服务器
python -m http.server 8000
# 然后访问 http://localhost:8000/src/index.html
```

### 使用示例
```bash
# 查看基础示例
open examples/basic.html

# 查看演示页面
open examples/demo.html
```

## 📚 文档

- [用户指南](docs/user-guide.md) - 详细的使用说明
- [API文档](docs/api.md) - 完整的API参考
- [贡献指南](CONTRIBUTING.md) - 如何贡献代码
- [快速开始](docs/quick-start.md) - 快速上手指南

## 🎨 特性

- ✅ **零依赖** - 纯HTML/CSS/JavaScript，无需构建工具
- ✅ **响应式** - 完美适配各种设备
- ✅ **高性能** - 轻量级，秒级加载
- ✅ **易扩展** - 模块化设计，易于扩展
- ✅ **开源** - MIT许可证，自由使用

## 📊 技术栈

- **前端**: HTML5, CSS3, JavaScript ES6+
- **存储**: localStorage API
- **图标**: Font Awesome 6.4.0
- **测试**: Jest
- **构建**: Webpack, Babel

## 🌐 在线演示

访问演示网站: https://jacjackai.github.io/htmlppt

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解详细更新记录。

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有贡献者和使用者！

---

⭐ 如果这个项目对你有帮助，请给个 Star！

🐛 发现问题？请提交 [Issue](https://github.com/jacjackai/htmlppt/issues)

💡 有好的想法？欢迎提交 [PR](https://github.com/jacjackai/htmlppt/pulls)
```

5. 点击 "Publish release"

### 步骤6: 配置GitHub Pages

1. 访问: https://github.com/jacjackai/htmlppt/settings/pages
2. 配置:
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root) 或 /docs
   ```
3. 点击 "Save"

等待几分钟后，访问: https://jacjackai.github.io/htmlppt

### 步骤7: 启用GitHub Actions

1. 访问: https://github.com/jacjackai/htmlppt/settings/actions
2. 在 "Actions permissions" 中选择:
   ```
   Allow all actions and reusable workflows
   ```
3. 点击 "Save"

### 步骤8: 添加项目信息

1. 访问: https://github.com/jacjackai/htmlppt
2. 点击 "About" 右侧的齿轮
3. 填写:
   ```
   Description: HTML PPT - 纯前端演示文稿制作工具
   Website: https://jacjackai.github.io/htmlppt
   Topics: ppt, presentation, html, css, javascript, web, frontend, slides, demo, open-source
   ```
4. 点击 "Save"

## 🔧 验证部署

### 检查清单

- [ ] 仓库已创建: https://github.com/jacjackai/htmlppt
- [ ] 代码已推送: 检查所有文件
- [ ] Tag已创建: https://github.com/jacjackai/htmlppt/tags
- [ ] Release已发布: https://github.com/jacjackai/htmlppt/releases
- [ ] GitHub Pages已部署: https://jacjackai.github.io/htmlppt
- [ ] GitHub Actions已启用: https://github.com/jacjackai/htmlppt/actions
- [ ] 项目信息已完善: 检查About部分

### 测试命令

```bash
# 测试远程仓库连接
git remote show origin

# 测试推送
git push origin main --dry-run

# 查看所有标签
git tag -l

# 查看远程标签
git ls-remote --tags origin
```

## 📝 常见问题

### Q: 推送时提示"Permission denied"

**A**: 检查GitHub凭据

```bash
# 方法1: 使用Personal Access Token
# 1. 访问 https://github.com/settings/tokens
# 2. 创建新的token，选择repo权限
# 3. 使用token推送
git push https://jacjackai:YOUR_TOKEN@github.com/jacjackai/htmlppt.git main

# 方法2: 配置SSH密钥
# 1. 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 添加到GitHub
# 复制 ~/.ssh/id_ed25519.pub 的内容到 https://github.com/settings/keys

# 3. 测试连接
ssh -T git@github.com

# 4. 更改远程URL
git remote set-url origin git@github.com:jacjackai/htmlppt.git
```

### Q: GitHub Pages部署失败

**A**: 检查配置文件

```bash
# 检查deploy.yml
cat .github/workflows/deploy.yml

# 检查路径是否正确
ls -la docs/
```

### Q: 如何删除错误的提交

**A**: 使用git reset

```bash
# 软重置（保留更改）
git reset --soft HEAD~1

# 硬重置（删除更改）
git reset --hard HEAD~1

# 强制推送
git push -f origin main
```

### Q: 如何更新README.md

**A**: 编辑后提交

```bash
# 编辑README.md
vim README.md

# 提交更改
git add README.md
git commit -m "docs: 更新README"
git push origin main
```

## 🎯 下一步

部署完成后：

1. **分享项目**
   - 分享到社交媒体
   - 发布到技术社区
   - 告诉朋友和同事

2. **收集反馈**
   - 监控Issues
   - 回应评论
   - 收集用户反馈

3. **持续改进**
   - 修复bug
   - 添加新功能
   - 优化性能

4. **推广项目**
   - 发布技术文章
   - 录制视频教程
   - 参与开源社区

## 📞 获取帮助

- 📖 [GitHub文档](https://docs.github.com)
- 📖 [项目文档](docs/)
- 🐛 [提交Issue](https://github.com/jacjackai/htmlppt/issues)
- 💬 [GitHub Discussions](https://github.com/jacjackai/htmlppt/discussions)

---

**祝你部署成功！** 🎉

如有问题，请随时创建Issue寻求帮助。
