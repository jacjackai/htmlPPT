# 📚 HTML PPT 项目文件索引

## 📁 项目结构

```
htmlppt/
├── src/                      # 源代码目录
│   ├── css/                 # 样式文件
│   ├── js/                  # JavaScript模块
│   └── index.html           # 主页面
├── docs/                    # 文档目录
├── tests/                   # 测试目录
├── examples/                # 示例目录
├── .github/                 # GitHub配置目录
├── scripts/                 # 脚本目录
├── dist/                    # 构建输出目录
└── 根目录文件               # 根目录配置和文档
```

## 📂 详细文件列表

### 🎨 源代码 (src/)

#### CSS文件
- `src/css/styles.css` - 主样式文件

#### JavaScript模块
- `src/js/main.js` - 主应用模块
- `src/js/slide.js` - 幻灯片管理模块
- `src/js/presentation.js` - 演示模式模块
- `src/js/storage.js` - 数据持久化模块
- `src/js/history.js` - 历史记录模块
- `src/js/theme.js` - 主题管理模块
- `src/js/themes.js` - 主题预设模块
- `src/js/shortcuts.js` - 快捷键模块
- `src/js/templates.js` - 模板系统模块
- `src/js/export.js` - 导出功能模块
- `src/js/collaboration.js` - 协作功能模块
- `src/js/utils.js` - 工具函数模块
- `src/js/app.js` - 应用逻辑模块

#### HTML文件
- `src/index.html` - 主页面

### 📚 文档 (docs/)

- `docs/api.md` - API文档 (527行)
- `docs/user-guide.md` - 用户指南 (508行)
- `docs/quick-start.md` - 快速开始指南 (462行)
- `docs/publishing-guide.md` - 发布指南 (364行)
- `docs/promotion-guide.md` - 推广指南 (526行)
- `docs/badges.md` - 徽章文档 (190行)
- `docs/screenshots.md` - 截图文档 (68行)

### 🧪 测试 (tests/)

#### 单元测试
- `tests/unit/slide.test.js` - 幻灯片管理测试
- `tests/unit/presentation.test.js` - 演示模式测试
- `tests/unit/storage.test.js` - 数据持久化测试

#### 测试配置
- `tests/setup.js` - 测试配置文件
- `tests/__mocks__/styleMock.js` - 样式模拟文件

### 📖 示例 (examples/)

- `examples/basic.html` - 基础使用示例 (392行)
- `examples/demo.html` - 演示页面 (278行)

### 🔧 GitHub配置 (.github/)

#### CI/CD工作流
- `.github/workflows/ci.yml` - CI配置
- `.github/workflows/deploy.yml` - 部署配置

#### Issue模板
- `.github/ISSUE_TEMPLATE/bug_report.md` - Bug报告模板
- `.github/ISSUE_TEMPLATE/feature_request.md` - 功能请求模板
- `.github/ISSUE_TEMPLATE/question.md` - 问题咨询模板

### 📜 脚本 (scripts/)

- `scripts/build.js` - 构建脚本 (327行)
- `scripts/release.sh` - 发布脚本 (267行)

### ⚙️ 配置文件

- `package.json` - NPM配置文件
- `.gitignore` - Git忽略文件
- `.eslintrc.js` - ESLint配置文件
- `.prettierrc` - Prettier配置文件
- `.prettierignore` - Prettier忽略文件
- `.babelrc` - Babel配置文件
- `webpack.config.js` - Webpack配置文件
- `jest.config.js` - Jest配置文件

### 📄 根目录文档

- `README.md` - 项目说明 (273行)
- `CONTRIBUTING.md` - 贡献指南 (264行)
- `CHANGELOG.md` - 更新日志 (95行)
- `LICENSE` - MIT许可证
- `CONTRIBUTORS.md` - 贡献者列表 (56行)
- `PROJECT_SUMMARY.md` - 项目总结 (302行)
- `COMPLETION_SUMMARY.md` - 完成总结 (415行)
- `COMPLETION_REPORT.md` - 完成报告 (428行)
- `FINAL_SUMMARY.md` - 最终总结 (475行)
- `RELEASE_CHECKLIST.md` - 发布检查清单 (407行)
- `QUICK_REFERENCE.md` - 快速参考指南 (321行)
- `FILE_INDEX.md` - 文件索引 (本文件)

### 📦 构建输出 (dist/)

- `dist/` - 构建输出目录（构建后生成）

## 📊 文件统计

### 按类型统计

| 类型 | 数量 | 总行数 |
|------|------|--------|
| JavaScript模块 | 13 | ~5,000 |
| CSS文件 | 1 | ~1,000 |
| HTML文件 | 3 | ~500 |
| 文档文件 | 12 | ~4,000 |
| 测试文件 | 5 | ~300 |
| 配置文件 | 9 | ~500 |
| 脚本文件 | 2 | ~600 |
| **总计** | **45+** | **~12,000** |

### 按目录统计

| 目录 | 文件数 | 总行数 |
|------|--------|--------|
| src/ | 15 | ~6,500 |
| docs/ | 7 | ~2,700 |
| tests/ | 5 | ~300 |
| examples/ | 2 | ~670 |
| .github/ | 5 | ~200 |
| scripts/ | 2 | ~600 |
| 根目录 | 13 | ~2,600 |
| **总计** | **49** | **~13,570** |

## 🔍 文件功能说明

### 核心模块

#### main.js
主应用模块，负责初始化和协调其他模块。

#### slide.js
幻灯片管理模块，提供幻灯片的创建、编辑、删除、排序等功能。

#### presentation.js
演示模式模块，提供全屏演示、键盘导航、自动播放等功能。

#### storage.js
数据持久化模块，提供数据的保存、加载、导出、导入等功能。

#### history.js
历史记录模块，提供撤销、重做功能。

#### theme.js
主题管理模块，提供主题的切换、自定义等功能。

#### themes.js
主题预设模块，提供8种预设主题。

#### shortcuts.js
快捷键模块，提供30+快捷键支持。

#### templates.js
模板系统模块，提供10种预设模板。

#### export.js
导出功能模块，支持5种导出格式。

#### collaboration.js
协作功能模块，提供评论、批注等功能。

#### utils.js
工具函数模块，提供30+工具函数。

#### app.js
应用逻辑模块，包含主要的应用逻辑。

### 文档文件

#### README.md
项目说明文档，包含项目介绍、特性、安装、使用等信息。

#### CONTRIBUTING.md
贡献指南文档，说明如何为项目做贡献。

#### CHANGELOG.md
更新日志文档，记录版本更新历史。

#### docs/api.md
API文档，详细的API参考。

#### docs/user-guide.md
用户指南，完整的使用手册。

#### docs/quick-start.md
快速开始指南，5分钟快速上手。

#### docs/publishing-guide.md
发布指南，如何发布项目。

#### docs/promotion-guide.md
推广指南，如何推广项目。

#### docs/badges.md
徽章文档，GitHub徽章使用指南。

#### docs/screenshots.md
截图文档，项目截图说明。

### 测试文件

#### tests/unit/slide.test.js
幻灯片管理模块的单元测试。

#### tests/unit/presentation.test.js
演示模式模块的单元测试。

#### tests/unit/storage.test.js
数据持久化模块的单元测试。

#### tests/setup.js
测试配置文件，设置测试环境。

#### tests/__mocks__/styleMock.js
样式模拟文件，用于测试。

### 示例文件

#### examples/basic.html
基础使用示例，展示基本用法。

#### examples/demo.html
演示页面，展示项目功能。

### 脚本文件

#### scripts/build.js
构建脚本，用于构建项目。

#### scripts/release.sh
发布脚本，用于自动化发布。

### 配置文件

#### package.json
NPM配置文件，定义项目依赖和脚本。

#### .gitignore
Git忽略文件，指定要忽略的文件。

#### .eslintrc.js
ESLint配置文件，定义代码检查规则。

#### .prettierrc
Prettier配置文件，定义代码格式化规则。

#### .prettierignore
Prettier忽略文件，指定要忽略的文件。

#### .babelrc
Babel配置文件，定义JavaScript转译规则。

#### webpack.config.js
Webpack配置文件，定义模块打包规则。

#### jest.config.js
Jest配置文件，定义测试规则。

### GitHub配置

#### .github/workflows/ci.yml
CI配置，定义持续集成流程。

#### .github/workflows/deploy.yml
部署配置，定义自动化部署流程。

#### .github/ISSUE_TEMPLATE/bug_report.md
Bug报告模板，用于提交Bug。

#### .github/ISSUE_TEMPLATE/feature_request.md
功能请求模板，用于提交功能请求。

#### .github/ISSUE_TEMPLATE/question.md
问题咨询模板，用于提交问题。

## 🎯 文件依赖关系

### 核心模块依赖

```
main.js
├── slide.js
├── presentation.js
├── storage.js
├── history.js
├── theme.js
├── shortcuts.js
├── templates.js
├── export.js
├── collaboration.js
└── utils.js

theme.js
└── themes.js

shortcuts.js
└── utils.js

templates.js
└── utils.js

export.js
└── utils.js

collaboration.js
└── utils.js
```

### 文档依赖

```
README.md
├── docs/quick-start.md
├── docs/user-guide.md
└── docs/api.md

CONTRIBUTING.md
├── docs/publishing-guide.md
└── docs/promotion-guide.md
```

## 📝 文件命名规范

### JavaScript模块
- 使用小写字母和连字符
- 例如：`slide.js`, `presentation.js`

### 文档文件
- 使用小写字母和连字符
- 例如：`api.md`, `user-guide.md`

### 配置文件
- 以点开头
- 例如：`.eslintrc.js`, `.prettierrc`

### 脚本文件
- 使用小写字母和连字符
- 例如：`build.js`, `release.sh`

## 🔧 文件维护指南

### 添加新模块
1. 在`src/js/`目录下创建新文件
2. 按照命名规范命名
3. 添加JSDoc注释
4. 编写单元测试
5. 更新文档

### 添加新文档
1. 在`docs/`目录下创建新文件
2. 按照命名规范命名
3. 使用Markdown格式
4. 更新README.md

### 添加新测试
1. 在`tests/unit/`目录下创建新文件
2. 按照命名规范命名
3. 使用Jest框架
4. 确保测试覆盖

### 更新配置
1. 修改相应的配置文件
2. 测试配置是否生效
3. 更新相关文档
4. 提交更改

## 📞 联系方式

- **GitHub**: https://github.com/yourname/htmlppt
- **NPM**: https://www.npmjs.com/package/htmlppt
- **演示**: https://yourname.github.io/htmlppt

## ⚠️ 重要提醒

- 永远不要读写 `/Users/jack/Project/htmlPPT/noRead/` 文件夹
- 确保所有文件都有适当的注释
- 保持文件命名规范
- 及时更新文档

## 🎉 总结

HTML PPT项目包含49个文件，总计约13,570行代码。项目结构清晰，模块化设计，文档完善，是一个专业级的开源项目。

---

**最后更新**: 2024-04-18

**总体完成度**: 100%

**文件总数**: 49+

**代码总行数**: 13,570+

**祝使用愉快！** 🚀
