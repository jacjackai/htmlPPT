# AGENTS.md - HTML PPT 项目上下文

## 项目概述

HTML PPT 是一个零依赖、纯前端的演示文稿制作工具。用户通过 HTML/CSS/JavaScript 代码编写幻灯片内容，工具提供实时预览、演示模式、主题切换、自动保存、导出等功能。项目无需构建即可直接运行（`src/index.html`），同时提供 Webpack 构建用于生产部署。

- **仓库**: https://github.com/jacjackai/htmlPPT
- **在线演示**: https://jacjackai.github.io/htmlPPT
- **许可证**: MIT
- **版本**: 1.0.0
- **语言**: 中文（界面和文档均为中文）

## 技术栈

- **前端核心**: HTML5, CSS3, JavaScript ES6+（无框架）
- **图标**: Font Awesome 6.4.0（CDN 引入）
- **构建工具**: Webpack 5 + Babel（生产打包）
- **CSS 处理**: PostCSS + PostCSS CLI
- **测试**: Jest 29 + jsdom 环境
- **代码规范**: ESLint 8 + eslint-config-prettier + eslint-plugin-prettier
- **格式化**: Prettier 3
- **版本管理**: standard-version
- **部署**: gh-pages（dist 目录）
- **依赖**: html2canvas（截图）、jsPDF（PDF 导出）
- **Node 要求**: >= 16.0.0, npm >= 8.0.0

## 项目结构

```
htmlppt/
├── src/                        # 源代码
│   ├── index.html              # 主页面（可直接运行，内嵌完整 CSS）
│   ├── css/
│   │   └── styles.css          # 独立样式文件（与 index.html 内嵌样式同步）
│   └── js/                     # JavaScript 模块（ES6 class 风格）
│       ├── main.js             # 主入口：HTMLPPT 类，整合所有模块
│       ├── app.js              # 独立运行版（非模块化，直接操作 DOM）
│       ├── slide.js            # Slide 类 + SlideManager 类
│       ├── presentation.js     # Presentation 类 + PresentationController 类
│       ├── storage.js          # Storage + ProjectStorage + AutoSave 类
│       ├── history.js          # History 类 + Command/CommandHistory 类
│       ├── theme.js            # Theme 类 + ThemeManager 类
│       ├── themes.js           # 主题定义（8 种预设主题）
│       ├── templates.js        # Template + TemplateManager 类（10 种模板）
│       ├── shortcuts.js        # ShortcutManager 类 + 快捷键配置
│       ├── collaboration.js    # Comment 类 + CollaborationManager 类
│       ├── export.js           # Exporter 类 + 多格式导出
│       └── utils.js            # 工具函数（debounce、throttle、颜色处理等）
├── dist/                       # Webpack 构建输出
├── tests/                      # 测试
│   ├── setup.js                # Jest setup
│   ├── __mocks__/styleMock.js  # CSS mock
│   └── unit/                   # 单元测试
│       ├── presentation.test.js
│       ├── slide.test.js
│       └── storage.test.js
├── examples/                   # 示例文件
│   ├── basic.html
│   └── demo.html
├── docs/                       # 文档
├── scripts/                    # 构建和部署脚本
└── webpack.config.js           # Webpack 配置
```

## 构建和运行

### 开发模式

```bash
# 直接打开（零依赖方式）
open src/index.html

# 本地开发服务器
npm run dev          # live-server src --port=8080

# Python 简易服务器
python -m http.server 8000 -d src
```

### 构建

```bash
npm run build        # 等价于 build:css && build:js
npm run build:css    # PostCSS 处理 CSS
npm run build:js     # Webpack 生产构建
```

Webpack 入口: `src/js/app.js` → 输出: `dist/js/app.js`

### 测试

```bash
npm test             # 运行 Jest
npm run test:watch   # 监听模式
npm run test:coverage # 覆盖率报告
```

### 代码质量

```bash
npm run lint         # ESLint 检查 src/js/**/*.js
npm run lint:fix     # ESLint 自动修复
npm run format       # Prettier 格式化 src/**/*.{js,css,html}
npm run format:check # Prettier 检查
npm run validate     # lint + format:check + test
```

### 部署

```bash
npm run deploy       # gh-pages -d dist
npm run release      # standard-version 生成版本号
```

## 架构说明

项目存在两套并行的实现：

1. **模块化版本**（`src/js/main.js` 为入口）：使用 ES6 `import/export`，包含 `HTMLPPT` 主类，整合 `SlideManager`、`Presentation`、`ProjectStorage`、`History`、`ThemeManager` 等模块。通过 Webpack 打包用于生产环境。

2. **独立运行版本**（`src/js/app.js`）：非模块化，直接操作 DOM，所有逻辑写在一个文件中。`src/index.html` 内嵌了完整的 CSS 和 HTML 结构，可直接在浏览器中运行。

两套版本的 UI 交互逻辑基本一致，包括：侧边栏幻灯片列表、代码编辑器 + 实时预览、演示模式、主题切换、自动保存、撤销/重做、分享功能等。

## 核心模块

| 模块 | 文件 | 说明 |
|------|------|------|
| HTMLPPT | `main.js` | 主应用类，事件系统，整合所有模块 |
| Slide / SlideManager | `slide.js` | 幻灯片 CRUD、排序、序列化 |
| Presentation / PresentationController | `presentation.js` | 演示模式、自动播放、键盘导航 |
| Storage / ProjectStorage / AutoSave | `storage.js` | localStorage 持久化、自动保存 |
| History / CommandHistory | `history.js` | 撤销/重做栈、命令模式 |
| Theme / ThemeManager | `theme.js` | 主题注册、CSS 变量应用、持久化 |
| Template / TemplateManager | `templates.js` | 10 种预设模板、模板搜索和分类 |
| ShortcutManager | `shortcuts.js` | 30+ 快捷键、模式切换 |
| CollaborationManager | `collaboration.js` | 评论系统、协作模式 |
| Exporter | `export.js` | JSON/HTML/Markdown/PDF/Base64 导出 |

## 编码规范

### ESLint 规则（`.eslintrc.js`）

- `no-var`: 禁止使用 `var`，必须用 `let`/`const`
- `prefer-const`: 优先使用 `const`
- `eqeqeq`: 必须使用严格相等 `===`
- `curly`: 所有块必须使用花括号
- `no-unused-vars`: 错误级别，`_` 前缀参数除外
- `no-console`: 警告级别
- `space-before-function-paren`: 匿名函数空格，命名函数无空格

### Prettier 配置（`.prettierrc`）

- 单引号，分号结尾
- 缩进 2 空格，行宽 100
- 尾随逗号 `es5`
- 换行符 `lf`

### 模块设计模式

所有核心模块采用统一的模式：
- ES6 `class` + `export`
- 构造函数接收 `options` 对象
- 自定义事件系统（`on`/`off`/`emit`）
- `toJSON()` / `static fromJSON()` 序列化
- `destroy()` 清理方法

### CSS 规范

- 使用 CSS 自定义属性（变量），定义在 `:root` 和 `[data-theme="dark"]`
- 深色模式通过 `data-theme="dark"` 属性切换
- 响应式断点：`900px`（移动端适配）
- 圆角: `12px`，阴影/过渡统一使用变量

## 关键数据结构

### 幻灯片 (Slide)

```javascript
{
  id: 'slide_<timestamp>_<random>',  // 唯一 ID
  title: '',                          // 标题
  content: '',                        // 内容（HTML 或 Markdown）
  theme: null,                        // 主题覆盖
  createdAt: Date,
  updatedAt: Date
}
```

### 项目文件 (.htmlppt)

```javascript
{
  version: '1.0',
  savedAt: 'ISO-8601',
  slides: [{ id, title, content, ... }]
}
```

## 注意事项

- `src/index.html` 包含内嵌的完整 CSS（约 700 行），修改样式时需同步更新 `src/css/styles.css`
- `app.js` 是非模块化的独立版本，与模块化版本（`main.js` 等）功能重叠但实现独立
- `.bak` 文件是备份文件（`index.html.bak`、`app.js.bak`、`styles.css.bak`），非活动代码
- 测试覆盖率较低，仅有 3 个单元测试文件
- 导出为图片功能依赖 html2canvas 库，但在 `app.js` 中仅做了提示，未实际集成
- PDF 导出通过 `jsPDF` 实现，在 `export.js` 中为 HTML 转 PDF 的简化实现
- 分享功能通过 URL 参数（Base64 编码）传递项目数据，大项目可能超出 URL 长度限制