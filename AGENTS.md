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
- `noRead/` 目录包含旧版本文件（HtmlPPT_v1-v7.html），为历史备份，不应修改
- 测试覆盖率较低，单元测试文件较为基础，未完全覆盖所有模块
- 导出为图片功能依赖 html2canvas 库，但在 `app.js` 中仅做了提示，未实际集成
- PDF 导出通过 `jsPDF` 实现，在 `export.js` 中为 HTML 转 PDF 的简化实现
- 分享功能通过 URL 参数（Base64 编码）传递项目数据，大项目可能超出 URL 长度限制

## Webpack 和构建配置

### Webpack 入口点
- **生产构建入口**: `src/js/app.js` → 输出到 `dist/js/app.js`
- **模块化版本**: `src/js/main.js`（包含 HTMLPPT 主类），用于开发和直接引用
- **DOM 绑定层**: `src/js/app-entry.js` 将 HTMLPPT 绑定到 DOM，由 Webpack 打包时使用

### 构建流程
```bash
npm run build        # 完整构建（CSS + JS）
npm run build:css    # PostCSS 处理（无 postcss.config.js，直接使用 CLI）
npm run build:js     # Webpack 生产构建（mode=production）
```

### Webpack 关键配置
- **Babel 转译**: `@babel/preset-env`，目标浏览器：`>1%`, `last 2 versions`, `not dead`
- **代码分割**: `splitChunks: { chunks: 'all' }`
- **清理输出**: `output.clean: true`，每次构建前清空 dist/
- **性能警告**: 入口和资源超过 512KB 时警告
- **PostCSS**: 使用 PostCSS CLI 直接处理，无独立配置文件

## 测试指南

### Jest 配置
- **环境**: jsdom（模拟浏览器 DOM）
- **Setup 文件**: `tests/setup.js` 提供 localStorage 和 window 方法 mock
- **测试匹配**: `tests/**/*.test.js`
- **覆盖率**: 覆盖 `src/js/**/*.js`，排除测试文件和 vendor 目录
- **CSS Mock**: 所有 `.css` 文件映射到 `tests/__mocks__/styleMock.js`

### 测试运行
```bash
npm test              # 运行所有测试
npm run test:watch    # 监听模式
npm run test:coverage # 生成覆盖率报告
```

### 测试注意事项
- 测试文件较为基础，主要测试数据结构和简单逻辑
- 使用 `jest.fn()` mock window.alert、window.confirm、window.prompt
- localStorage 在测试中完全使用内存实现
- 测试覆盖率不高，新增功能时应补充测试

## Git Hooks 和工作流

### Git Hooks（package.json 中配置）
```bash
precommit    # 提交前自动运行: npm run validate
prepush      # 推送前自动运行: npm run validate
```

`npm run validate` = lint + format:check + test（三个步骤都必须通过）

### 提交工作流
1. 确保代码通过所有检查：`npm run validate`
2. 如果 lint 失败：`npm run lint:fix`
3. 如果格式检查失败：`npm run format`
4. 如果测试失败：修复测试或代码
5. 提交代码（precommit hook 会自动验证）
6. 推送代码（prepush hook 会再次验证）

## 事件系统模式

所有核心模块（SlideManager、Presentation、History、ThemeManager 等）使用统一的自定义事件系统：

```javascript
// 发送事件
this.emit('eventName', data);

// 监听事件
this.on('eventName', (data) => { ... });

// 移除监听
this.off('eventName', handler);
```

### 常用事件
- `SlideManager`: `slideAdded`, `slideRemoved`, `slideUpdated`, `currentSlideChanged`
- `Presentation`: `start`, `end`, `slideChanged`, `pause`, `resume`
- `History`: `statePushed`, `undo`, `redo`
- `ThemeManager`: `themeChanged`
- `AutoSave`: `saveStart`, `saveSuccess`, `saveError`

## 目录说明

### 忽略/备份文件
- `*.bak`: 备份文件，不应修改
- `noRead/`: 旧版本历史文件（HtmlPPT_v1-v7.html），只读参考
- `dist/`: 构建输出（.gitignore）
- `node_modules/`: 依赖（.gitignore）
- `coverage/`: 测试覆盖率报告（.gitignore）

### 文档目录
- `docs/`: 项目文档
  - `archive/`: 归档文档（已完成任务、部署指南等）
  - `quick-start.md`: 快速开始指南
  - `user-guide.md`: 用户手册
  - `api.md`: API 文档

### 脚本目录
- `scripts/`: 辅助脚本
  - `deploy.sh`: gh-pages 部署脚本
  - `build.js`: 自定义构建脚本
  - `test.sh`: 测试运行脚本

## 代码修改检查清单

修改代码时，请确保：
1. [ ] 代码通过 ESLint 检查：`npm run lint`
2. [ ] 代码通过 Prettier 格式化：`npm run format`
3. [ ] 相关测试通过：`npm test`
4. [ ] 如修改了样式，同步更新 `src/index.html` 内嵌 CSS 和 `src/css/styles.css`
5. [ ] 如添加新功能，补充相应测试
6. [ ] 如修改了核心模块，确保事件系统正常工作
7. [ ] 如修改了数据结构，确保 `toJSON()` / `fromJSON()` 正确实现

## 性能优化建议

- 使用 `debounce` 和 `throttle` 工具函数（`utils.js`）处理频繁触发的事件
- 避免在事件处理器中执行同步的耗时操作（如大文件导出）
- 使用 `requestAnimationFrame` 优化动画渲染
- 批量 DOM 操作减少重排重绘
- Webpack 已启用代码分割和 Tree Shaking，无需手动优化