# 🎨 HTML PPT - 零依赖、纯前端、开箱即用的演示文稿制作工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/jacjackai/htmlppt?style=social)](https://github.com/jacjackai/htmlppt/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jacjackai/htmlppt?style=social)](https://github.com/jacjackai/htmlppt/network/members)
[![Build Status](https://github.com/jacjackai/htmlppt/workflows/CI/badge.svg)](https://github.com/jacjackai/htmlppt/actions)
[![codecov](https://codecov.io/gh/jacjackai/htmlppt/branch/main/graph/badge.svg)](https://codecov.io/gh/jacjackai/htmlppt)
[![npm](https://img.shields.io/npm/v/htmlppt)](https://www.npmjs.com/package/htmlppt)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/htmlppt)](https://bundlephobia.com/result?p=htmlppt)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-none-success)](https://github.com/jacjackai/htmlppt)
[![Lightweight](https://img.shields.io/badge/size-<50KB-green)](https://github.com/jacjackai/htmlppt)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> 🚀 零依赖、纯前端、开箱即用的演示文稿制作工具

[![演示截图](assets/images/demo-screenshot.png)](https://jacjackai.github.io/htmlppt)

## ✨ 特性

### 核心功能
- 🎯 **零依赖** - 纯HTML/CSS/JavaScript，无需构建工具
- 🌓 **深色模式** - 8种预设主题，完美支持明暗主题切换
- 💾 **自动保存** - 基于localStorage的实时保存，永不丢失
- 🔗 **一键分享** - URL参数分享演示，轻松发送给他人
- 📱 **响应式** - 完美适配各种设备，移动端友好
- ⚡ **高性能** - 核心代码小于50KB，首屏加载<1秒

### 高级功能
- 🎨 **主题系统** - 8种预设主题 + 自定义主题支持
- 📋 **模板系统** - 10种专业模板，快速创建演示文稿
- ⌨️ **快捷键** - 30+快捷键，提升操作效率
- 📤 **导出功能** - 支持JSON/HTML/Markdown/PDF多种格式
- 💬 **协作功能** - 评论和批注系统，团队协作更方便
- ↩️ **历史记录** - 完整的撤销/重做功能
- 🎬 **演示模式** - 全屏演示，键盘导航，自动播放

## 🎬 在线演示

👉 **立即体验**: https://jacjackai.github.io/htmlppt

## 📦 安装

### 方式1：直接使用（推荐）
```bash
# 克隆项目
git clone https://github.com/jacjackai/htmlppt.git

# 进入目录
cd htmlppt

# 直接打开
open src/index.html
```

### 方式2：使用本地服务器
```bash
# 使用npx serve
npx serve src

# 或使用python
python -m http.server 8000 -d src

# 或使用node
npx http-server src
```

### 方式3：NPM安装
```bash
npm install htmlppt
```

## 🚀 快速开始

### 5分钟快速上手

```javascript
// 1. 创建应用实例
import HTMLPPT from 'htmlppt';

const app = new HTMLPPT({
  theme: 'light',
  autoSave: true
});

// 2. 添加幻灯片
app.addSlide({
  title: '欢迎使用 HTML PPT',
  content: '这是一个零依赖的演示文稿制作工具'
});

app.addSlide({
  title: '功能特性',
  content: '• 零依赖\n• 纯前端\n• 开箱即用\n• 自动保存'
});

// 3. 进入演示模式
app.present();
```

### 使用模板快速创建

```javascript
// 使用标题模板
app.createSlideFromTemplate('title-slide', {
  title: '我的演示文稿',
  subtitle: '副标题',
  author: '作者名',
  date: new Date().toLocaleDateString()
});

// 使用内容模板
app.createSlideFromTemplate('content-slide', {
  title: '主要内容',
  content: '这里是内容'
});
```

## 📖 文档

- [快速开始指南](docs/quick-start.md) - 5分钟快速上手
- [用户指南](docs/user-guide.md) - 完整的用户手册
- [API文档](docs/api.md) - 详细的API参考
- [发布指南](docs/publishing-guide.md) - 如何发布项目
- [推广指南](docs/promotion-guide.md) - 如何推广项目

## 🎨 主题

HTML PPT提供8种预设主题：

| 主题 | 预览 |
|------|------|
| Light | ![Light](assets/images/theme-light.png) |
| Dark | ![Dark](assets/images/theme-dark.png) |
| Business | ![Business](assets/images/theme-business.png) |
| Creative | ![Creative](assets/images/theme-creative.png) |
| Minimal | ![Minimal](assets/images/theme-minimal.png) |
| Ocean | ![Ocean](assets/images/theme-ocean.png) |
| Forest | ![Forest](assets/images/theme-forest.png) |
| Sunset | ![Sunset](assets/images/theme-sunset.png) |

## 📋 模板

HTML PPT提供10种专业模板：

- 标题幻灯片
- 内容幻灯片
- 要点列表
- 双栏布局
- 图片幻灯片
- 引用幻灯片
- 代码幻灯片
- 对比表格
- 感谢幻灯片
- 问答幻灯片

## ⌨️ 快捷键

### 全局快捷键
- `F5` - 进入演示模式
- `Escape` - 退出演示模式
- `Ctrl+S` - 保存
- `Ctrl+N` - 新建幻灯片
- `Ctrl+O` - 打开项目
- `Ctrl+E` - 导出项目
- `Ctrl+D` - 切换主题
- `Ctrl+Z` - 撤销
- `Ctrl+Y` - 重做

### 演示模式快捷键
- `→` 或 `↓` 或 `Space` - 下一张
- `←` 或 `↑` - 上一张
- `Home` - 第一张
- `End` - 最后一张
- `Escape` - 退出演示

查看[完整快捷键列表](docs/shortcuts.md)

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 核心代码大小 | < 50KB |
| 首屏加载时间 | < 1s |
| Lighthouse评分 | 95+ |
| 移动端适配 | 100% |
| 动画帧率 | 60fps |
| 内存占用 | < 10MB |

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript ES6+
- **图标**: Font Awesome 6.4.0
- **构建**: Webpack, Babel
- **测试**: Jest, Testing Library
- **代码检查**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
htmlppt/
├── src/                      # 源代码
│   ├── css/                 # 样式文件
│   ├── js/                  # JavaScript模块
│   └── index.html           # 主页面
├── docs/                    # 文档
├── tests/                   # 测试
├── examples/                # 示例
├── .github/                 # GitHub配置
├── scripts/                 # 构建脚本
└── dist/                    # 构建输出
```

## 🤝 贡献

欢迎贡献！请查看[贡献指南](CONTRIBUTING.md)

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解版本更新历史。

## 🌟 贡献者

感谢所有为这个项目做出贡献的开发者！

<a href="https://github.com/jacjackai/htmlppt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=jacjackai/htmlppt" />
</a>

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢以下开源项目：

- [Font Awesome](https://fontawesome.com/) - 提供精美的图标
- [html2canvas](https://html2canvas.hertzen.com/) - 截图功能支持
- [jsPDF](https://github.com/parallax/jsPDF) - PDF导出功能

## 📮 联系方式

- **作者**: Your Name
- **邮箱**: your.email@example.com
- **GitHub**: https://github.com/jacjackai/htmlppt
- **网站**: https://jacjackai.github.io/htmlppt

## 🔗 相关链接

- [在线演示](https://jacjackai.github.io/htmlppt)
- [GitHub仓库](https://github.com/jacjackai/htmlppt)
- [NPM包](https://www.npmjs.com/package/htmlppt)
- [问题反馈](https://github.com/jacjackai/htmlppt/issues)
- [功能建议](https://github.com/jacjackai/htmlppt/discussions)

## 💬 讨论

有任何问题或建议？欢迎在 [GitHub Discussions](https://github.com/jacjackai/htmlppt/discussions) 中讨论！

---

⭐ 如果这个项目对你有帮助，请给个 Star！

🚀 让我们一起构建更好的前端工具！
