# 贡献指南

感谢你对 HTML PPT 项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议：

1. 先检查 [Issues](https://github.com/yourname/htmlppt/issues) 确认问题是否已被报告
2. 如果没有，创建一个新的 Issue
3. 使用合适的模板填写详细信息
4. 提供重现步骤、截图或代码示例

### 提交代码

#### 开发环境设置

```bash
# 1. Fork 并克隆仓库
git clone https://github.com/your-username/htmlppt.git
cd htmlppt

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 运行测试
npm test

# 5. 代码检查
npm run lint
npm run format
```

#### 代码规范

我们使用 ESLint 和 Prettier 来保持代码风格一致：

```bash
# 检查代码风格
npm run format:check

# 自动格式化代码
npm run format

# 修复 lint 错误
npm run lint:fix
```

#### 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```bash
git commit -m "feat: 添加导出PDF功能"
git commit -m "fix: 修复深色模式下的显示问题"
```

#### Pull Request 流程

1. 从主分支创建新分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. 进行开发和测试
   ```bash
   npm run test
   npm run lint
   ```

3. 提交代码
   ```bash
   git add .
   git commit -m "feat: 添加你的功能描述"
   git push origin feature/your-feature-name
   ```

4. 在 GitHub 上创建 Pull Request
   - 填写 PR 模板
   - 关联相关的 Issue
   - 等待代码审查

## 📋 开发指南

### 项目结构

```
htmlppt/
├── src/              # 源代码
│   ├── css/         # 样式文件
│   ├── js/          # JavaScript 文件
│   └── index.html   # 主页面
├── docs/            # 文档
├── tests/           # 测试文件
└── dist/            # 构建输出
```

### 代码风格

#### JavaScript

```javascript
// ✅ 好的示例
const createSlide = (title, content) => {
  const slide = {
    id: generateId(),
    title,
    content,
    createdAt: new Date()
  };

  return slide;
};

// ❌ 不好的示例
function createslide(t,c){
  var s={id:gen(),title:t,content:c};
  return s;
}
```

#### CSS

```css
/* ✅ 好的示例 */
.slide-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

/* ❌ 不好的示例 */
.slideContainer{display:flex;align-items:center;padding:10px;}
```

### 测试

我们使用 Jest 进行测试：

```javascript
// tests/unit/slide.test.js
describe('Slide', () => {
  test('should create a new slide', () => {
    const slide = createSlide('Test', 'Content');
    expect(slide.title).toBe('Test');
    expect(slide.content).toBe('Content');
  });
});
```

运行测试：
```bash
npm test              # 运行所有测试
npm run test:watch    # 监听模式
npm run test:coverage # 生成覆盖率报告
```

## 🎯 贡献类型

### 代码贡献
- 修复 bug
- 添加新功能
- 性能优化
- 代码重构

### 文档贡献
- 改进文档
- 添加示例
- 翻译文档
- 修正错误

### 设计贡献
- UI/UX 改进
- 主题设计
- 图标设计
- 截图优化

### 测试贡献
- 添加测试用例
- 提高测试覆盖率
- 修复测试问题

## 📝 Issue 模板

### Bug 报告

```markdown
**问题描述**
简要描述遇到的问题

**复现步骤**
1. 步骤一
2. 步骤二
3. 步骤三

**预期行为**
描述你期望发生什么

**实际行为**
描述实际发生了什么

**截图**
如果可能，添加截图

**环境信息**
- OS: [e.g. Windows 10, macOS 11]
- Browser: [e.g. Chrome 90, Firefox 88]
- Version: [e.g. v1.0.0]
```

### 功能请求

```markdown
**功能描述**
简要描述你想要的功能

**使用场景**
描述这个功能的使用场景

**建议的实现**
如果有想法，描述如何实现

**替代方案**
描述其他可能的解决方案
```

## 🏆 贡献者

感谢所有贡献者！

<a href="https://github.com/yourname/htmlppt/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourname/htmlppt" />
</a>

## 📧 联系方式

如果你有任何问题：

- 创建 [Issue](https://github.com/yourname/htmlppt/issues)
- 发送邮件至 your.email@example.com
- 在 [Discussions](https://github.com/yourname/htmlppt/discussions) 中讨论

## 📜 行为准则

请尊重所有贡献者，保持友好和专业的态度。

---

再次感谢你的贡献！🎉
