# 🚀 HTML PPT 一键部署指南

## 📋 前提条件

在开始部署之前，请确保：

- ✅ 你有一个GitHub账号
- ✅ 你已经安装了Git
- ✅ 你已经配置了Git用户信息
- ✅ 你已经配置了GitHub凭据（SSH或HTTPS）

## 🎯 快速部署（推荐）

### 使用一键部署脚本

这是最简单、最快速的部署方式：

```bash
cd /Users/jack/Project/htmlPPT

# 运行一键部署脚本
./scripts/quick-deploy.sh
```

脚本会引导你完成所有部署步骤：
1. 检查Git状态
2. 检查代码语法
3. 配置远程仓库
4. 推送代码到GitHub
5. 创建版本标签
6. 创建GitHub Release
7. 配置GitHub Pages
8. 添加项目信息

## 📝 详细部署步骤

如果你想手动部署，请按照以下步骤：

### 第一步：创建GitHub仓库

1. 访问：https://github.com/new
2. 填写仓库信息：
   ```
   Repository name: htmlppt
   Description: HTML PPT - 纯前端演示文稿制作工具
   Visibility: Public
   ```
3. **重要**：不要勾选任何初始化选项
4. 点击 "Create repository"

### 第二步：配置GitHub凭据

#### 方法A：使用Personal Access Token（推荐）

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 填写token信息：
   - Note: HTML PPT Deployment
   - Expiration: No expiration (或选择合适的时间)
   - 勾选权限：`repo`（所有repo权限）
4. 点击 "Generate token"
5. 复制生成的token（只显示一次）

#### 方法B：使用SSH密钥

```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动ssh-agent
eval "$(ssh-agent -s)"

# 添加SSH密钥
ssh-add ~/.ssh/id_ed25519

# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

然后访问：https://github.com/settings/keys
1. 点击 "New SSH key"
2. 填写Title：HTML PPT
3. 粘贴公钥内容
4. 点击 "Add SSH key"

### 第三步：配置远程仓库

```bash
cd /Users/jack/Project/htmlPPT

# 添加远程仓库（替换jacjackai为你的GitHub用户名）
git remote add origin https://github.com/jacjackai/htmlPPT.git

# 验证远程仓库
git remote -v
```

### 第四步：推送代码到GitHub

#### 使用HTTPS（需要token）

```bash
# 推送代码（会提示输入用户名和密码）
git push -u origin main

# 用户名：jacjackai
# 密码：your_personal_access_token
```

#### 使用SSH

```bash
# 推送代码
git push -u origin main
```

如果遇到错误，尝试：

```bash
# 方法1：设置上游分支
git branch -M main
git push -u origin main

# 方法2：强制推送（谨慎使用）
git push -u origin main --force
```

### 第五步：创建版本标签

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

### 第六步：创建GitHub Release

1. 访问：https://github.com/jacjackai/htmlPPT/releases/new
2. 选择标签：`v1.0.0`
3. 填写Release标题：`HTML PPT v1.0.0`
4. 填写描述：

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
git clone https://github.com/jacjackai/htmlPPT.git
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

访问演示网站: https://jacjackai.github.io/htmlPPT

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

🐛 发现问题？请提交 [Issue](https://github.com/jacjackai/htmlPPT/issues)

💡 有好的想法？欢迎提交 [PR](https://github.com/jacjackai/htmlPPT/pulls)
```

5. 点击 "Publish release"

### 第七步：配置GitHub Pages

1. 访问：https://github.com/jacjackai/htmlPPT/settings/pages
2. 配置：
   ```
   Source: Deploy from a branch
   Branch: main
   Folder: / (root)
   ```
3. 点击 "Save"

等待几分钟后，访问：https://jacjackai.github.io/htmlPPT

### 第八步：启用GitHub Actions

1. 访问：https://github.com/jacjackai/htmlPPT/settings/actions
2. 在 "Actions permissions" 中选择：
   ```
   Allow all actions and reusable workflows
   ```
3. 点击 "Save"

### 第九步：添加项目信息

1. 访问：https://github.com/jacjackai/htmlPPT
2. 点击 "About" 右侧的齿轮
3. 填写：
   ```
   Description: HTML PPT - 纯前端演示文稿制作工具
   Website: https://jacjackai.github.io/htmlPPT
   Topics: ppt, presentation, html, css, javascript, web, frontend, slides, demo, open-source
   ```
4. 点击 "Save"

## 🔧 验证部署

### 检查清单

- [ ] 仓库已创建：https://github.com/jacjackai/htmlPPT
- [ ] 代码已推送：检查所有文件
- [ ] Tag已创建：https://github.com/jacjackai/htmlPPT/tags
- [ ] Release已发布：https://github.com/jacjackai/htmlPPT/releases
- [ ] GitHub Pages已部署：https://jacjackai.github.io/htmlPPT
- [ ] GitHub Actions已启用：https://github.com/jacjackai/htmlPPT/actions
- [ ] 项目信息已完善：检查About部分

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
git push https://jacjackai:YOUR_TOKEN@github.com/jacjackai/htmlPPT.git main

# 方法2: 配置SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"
# 然后将公钥添加到GitHub
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
- 📖 [部署指南](DEPLOYMENT_GUIDE.md)
- 📖 [检查清单](DEPLOYMENT_CHECKLIST.md)
- 🐛 [提交Issue](https://github.com/jacjackai/htmlPPT/issues)

---

**🎉 祝你部署成功！**

如有问题，请随时创建Issue寻求帮助。
