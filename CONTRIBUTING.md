# 贡献指南

感谢你对 HTML PPT 项目的关注！我们欢迎任何形式的贡献。

## 🤝 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议，请：

1. 检查 [Issues](https://github.com/yourname/htmlppt/issues) 确保问题未被报告
2. 使用合适的 [Issue 模板](https://github.com/yourname/htmlppt/issues/new/choose)
3. 提供详细的信息：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 截图（如果适用）
   - 环境信息（浏览器、操作系统等）

### 提交代码

#### 开发环境设置

1. Fork 项目仓库
2. 克隆你的 fork：
   ```bash
   git clone https://github.com/yourname/htmlppt.git
   cd htmlppt
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

4. 创建开发分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### 代码规范

- 遵循现有的代码风格
- 使用 ESLint 和 Prettier 进行代码格式化
   ```bash
   npm run lint
   npm run format
   ```

- 编写清晰的提交信息：
   ```bash
   git commit -m "feat: 添加新功能描述"
   ```

#### 提交类型

使用以下前缀来标识提交类型：

- `feat:` - 新功能
- `fix:` - Bug 修复
- `docs:` - 文档更新
- `style:` - 代码格式（不影响功能）
- `refactor:` - 重构
- `test:` - 测试相关
- `chore:` - 构建/工具相关

#### 测试

在提交代码前，请确保：

1. 所有测试通过：
   ```bash
   npm test
   ```

2. 代码覆盖率不降低：
   ```bash
   npm run test:coverage
   ```

3. 手动测试你的更改

#### 提交 Pull Request

1. 推送到你的 fork：
   ```bash
   git push origin feature/your-feature-name
   ```

2. 在 GitHub 上创建 Pull Request

3. 填写 PR 模板，提供：
   - 清晰的标题和描述
   - 相关的 Issue 链接
   - 截图（如果适用）
   - 测试说明

4. 等待代码审查

## 📋 开发指南

### 项目结构

```
htmlppt/
├── src/              # 源代码
│   ├── css/         # 样式文件
│   ├── js/          # JavaScript 模块
│   └── index.html   # 主页面
├── docs/            # 文档
├── tests/           # 测试
├── examples/        # 示例
└── scripts/         # 脚本
```

### 添加新功能

1. 在 `src/js/` 中创建新模块
2. 在 `src/css/` 中添加样式
3. 编写单元测试
4. 更新文档
5. 提交 PR

### 修复 Bug

1. 在 `tests/` 中添加失败的测试
2. 修复代码
3. 确保所有测试通过
4. 提交 PR

## 🎨 设计指南

### UI/UX 原则

- 保持简洁和直观
- 遵循现有的设计语言
- 确保响应式设计
- 考虑可访问性

### 主题

项目支持多种主题，添加新主题：

1. 在 `src/js/themes.js` 中定义主题
2. 在 `src/css/styles.css` 中添加样式变量
3. 测试所有主题

## 📝 文档

### 更新文档

当你添加新功能时，请更新：

- README.md（如果需要）
- docs/api.md（API 变更）
- docs/user-guide.md（用户指南）
- CHANGELOG.md（更新日志）

### 文档风格

- 使用清晰简洁的语言
- 提供代码示例
- 包含截图
- 保持文档同步

## 🧪 测试

### 编写测试

- 为新功能编写单元测试
- 确保测试覆盖率不降低
- 使用描述性的测试名称

### 测试命令

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- slide.test.js

# 生成覆盖率报告
npm run test:coverage

# 监听模式
npm test -- --watch
```

## 🚀 发布流程

只有维护者可以发布新版本：

1. 更新版本号
2. 更新 CHANGELOG.md
3. 创建 Git 标签
4. 发布到 GitHub
5. 发布到 npm（如果适用）

## 💬 交流

- GitHub Issues：问题和建议
- GitHub Discussions：讨论和交流
- Pull Requests：代码贡献

## 📄 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。

## 🙏 致谢

感谢所有贡献者！你的贡献让这个项目变得更好。

---

有任何问题？请随时通过 [Issues](https://github.com/yourname/htmlppt/issues) 联系我们。
