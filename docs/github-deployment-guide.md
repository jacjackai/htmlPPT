# 🚀 HTML PPT GitHub部署指南

## 📋 部署前检查清单

在部署到GitHub之前，请确保：

- [x] Git仓库已初始化
- [x] 所有文件已提交
- [x] .gitignore已配置
- [x] README.md已完善
- [x] LICENSE已添加
- [x] 所有测试通过

## 🎯 部署步骤

### 第一步：创建GitHub仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `htmlppt` (或你喜欢的名称)
   - **Description**: `HTML PPT - 纯前端演示文稿制作工具`
   - **Visibility**: `Public` (推荐) 或 `Private`
   - **不要勾选**:
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license

3. 点击 "Create repository"

### 第二步：配置远程仓库

在项目目录中运行：

```bash
# 添加远程仓库
git remote add origin https://github.com/yourname/htmlppt.git

# 验证远程仓库
git remote -v
```

### 第三步：推送代码到GitHub

```bash
# 推送代码到GitHub
git push -u origin main
```

如果遇到错误，可能需要：

```bash
# 强制推送（谨慎使用）
git push -u origin main --force

# 或者先拉取再推送
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 第四步：创建版本标签

```bash
# 创建标签
git tag -a v1.0.0 -m "HTML PPT v1.0.0 - 初始版本"

# 推送标签
git push origin v1.0.0
```

### 第五步：创建GitHub Release

1. 访问 https://github.com/yourname/htmlppt/releases/new
2. 选择标签: `v1.0.0`
3. 填写Release信息：

**Release title**: `HTML PPT v1.0.0`

**Description**:
```markdown
🎉 HTML PPT v1.0.0 - 初始版本发布

这是HTML PPT的第一个正式版本！

## 主要功能

- ✨ 幻灯片创建和编辑
- 🎬 演示模式
- 🎨 8种预设主题
- 📋 10种专业模板
- 💾 自动保存
- 🔄 历史记录
- ⌨️ 30+快捷键
- 🤝 协作功能
- 📤 5种导出格式

## 快速开始

```bash
git clone https://github.com/yourname/htmlppt.git
cd htmlppt
open src/index.html
```

## 在线演示

访问演示网站: https://yourname.github.io/htmlppt

## 文档

- [用户指南](docs/user-guide.md)
- [API文档](docs/api.md)
- [贡献指南](CONTRIBUTING.md)

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

⭐ 如果这个项目对你有帮助，请给个 Star！
```

4. 点击 "Publish release"

### 第六步：配置GitHub Pages

1. 访问 https://github.com/yourname/htmlppt/settings/pages
2. 配置Pages：
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/docs` (或 `/root`)
3. 点击 "Save"

等待几分钟后，你的网站将在以下地址可用：
```
https://yourname.github.io/htmlppt
```

### 第七步：启用GitHub Actions

1. 访问 https://github.com/yourname/htmlppt/settings/actions
2. 在 "Actions permissions" 中选择：
   - ✅ Allow all actions and reusable workflows
3. 点击 "Save"

### 第八步：添加项目信息

1. 访问 https://github.com/yourname/htmlppt
2. 点击 "About" 右侧的齿轮图标
3. 填写项目信息：
   - **Description**: `HTML PPT - 纯前端演示文稿制作工具`
   - **Website**: `https://yourname.github.io/htmlppt`
   - **Topics**: `ppt`, `presentation`, `html`, `css`, `javascript`, `web`, `frontend`, `slides`, `demo`
4. 点击 "Save topics"

### 第九步：添加项目截图

1. 在项目根目录创建 `screenshots` 文件夹
2. 添加截图文件：
   - `screenshot1.png` - 主界面
   - `screenshot2.png` - 演示模式
   - `screenshot3.png` - 主题切换
   - `screenshot4.png` - 导出功能
3. 在README.md中添加截图

### 第十步：验证部署

1. 访问你的仓库: https://github.com/yourname/htmlppt
2. 检查：
   - ✅ 所有文件都已上传
   - ✅ README.md显示正确
   - ✅ GitHub Actions正在运行
   - ✅ GitHub Pages已部署
   - ✅ Release已创建

## 🎨 自定义配置

### 添加GitHub徽章

在README.md顶部添加：

```markdown
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/yourname/htmlppt)](https://github.com/yourname/htmlppt/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yourname/htmlppt)](https://github.com/yourname/htmlppt/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yourname/htmlppt)](https://github.com/yourname/htmlppt/issues)
[![GitHub release](https://img.shields.io/github/release/yourname/htmlppt)](https://github.com/yourname/htmlppt/releases)
```

### 配置社交预览

1. 访问 https://github.com/yourname/htmlppt/settings
2. 在 "Social preview" 中：
   - 添加项目截图
   - 设置描述

## 📊 部署后检查清单

- [ ] 仓库已创建
- [ ] 代码已推送
- [ ] Tag已创建
- [ ] Release已发布
- [ ] GitHub Pages已配置
- [ ] GitHub Actions已启用
- [ ] 项目信息已完善
- [ ] 截图已添加
- [ ] 徽章已添加
- [ ] 所有链接正常工作

## 🚀 快速部署脚本

如果你想快速部署，可以使用提供的脚本：

```bash
# 给脚本添加执行权限
chmod +x scripts/deploy.sh

# 运行部署脚本
./scripts/deploy.sh
```

脚本会引导你完成所有部署步骤。

## 📝 常见问题

### Q: 推送时提示"Permission denied"

A: 检查你的GitHub凭据，可能需要配置SSH密钥或使用Personal Access Token。

### Q: GitHub Pages部署失败

A: 检查.github/workflows/deploy.yml配置，确保路径正确。

### Q: GitHub Actions失败

A: 检查.github/workflows/ci.yml配置，确保所有依赖都已安装。

### Q: 如何删除错误的提交

A: 使用以下命令：
```bash
git reset --hard HEAD~1
git push -f origin main
```

## 🎯 下一步

部署完成后，你可以：

1. **推广项目**
   - 分享到社交媒体
   - 发布技术文章
   - 提交到技术社区

2. **收集反馈**
   - 监控Issues
   - 回应PR
   - 收集用户反馈

3. **持续改进**
   - 修复bug
   - 添加新功能
   - 优化性能

## 📞 获取帮助

如果遇到问题：

1. 查看 [GitHub文档](https://docs.github.com)
2. 查看 [项目文档](docs/)
3. 创建 [Issue](https://github.com/yourname/htmlppt/issues)

---

**祝你部署成功！** 🎉
