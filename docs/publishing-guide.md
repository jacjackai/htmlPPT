# 🚀 HTML PPT 发布指南

## 发布前检查清单

### 1. 代码质量检查
- [ ] 所有测试通过
- [ ] 代码格式化完成
- [ ] ESLint检查通过
- [ ] 文档完整更新
- [ ] CHANGELOG更新

### 2. 功能测试
- [ ] 核心功能正常
- [ ] 演示模式正常
- [ ] 主题切换正常
- [ ] 数据保存/加载正常
- [ ] 导出功能正常
- [ ] 快捷键正常

### 3. 浏览器兼容性
- [ ] Chrome/Edge测试
- [ ] Firefox测试
- [ ] Safari测试
- [ ] 移动端测试

### 4. 文档检查
- [ ] README.md完整
- [ ] API文档完整
- [ ] 用户指南完整
- [ ] 贡献指南完整
- [ ] 许可证文件存在

## 发布步骤

### 第一步：准备发布

#### 1.1 更新版本号
```bash
# 编辑 package.json
vim package.json

# 更新版本号
"version": "1.0.0"
```

#### 1.2 更新CHANGELOG
```bash
# 编辑 CHANGELOG.md
vim CHANGELOG.md

# 添加新版本记录
## [1.0.0] - 2024-04-18

### Added
- 初始版本发布
- 完整的幻灯片管理功能
- 演示模式
- 主题系统
- 数据持久化
- 历史记录
- 导出功能
- 协作功能
- 模板系统
- 快捷键支持
```

#### 1.3 运行测试
```bash
# 运行所有测试
npm test

# 运行lint
npm run lint

# 格式化代码
npm run format
```

#### 1.4 构建项目
```bash
# 构建项目
npm run build

# 检查构建输出
ls -la dist/
```

### 第二步：Git操作

#### 2.1 初始化Git仓库（如果还没有）
```bash
# 初始化Git
git init

# 添加所有文件
git add .

# 首次提交
git commit -m "feat: 初始化HTML PPT项目"
```

#### 2.2 创建发布分支
```bash
# 创建发布分支
git checkout -b release/v1.0.0

# 合并最新更改
git merge main
```

#### 2.3 提交更改
```bash
# 添加所有更改
git add .

# 提交
git commit -m "chore: 准备v1.0.0发布"
```

#### 2.4 创建Git标签
```bash
# 创建标签
git tag -a v1.0.0 -m "Release v1.0.0"

# 推送标签
git push origin v1.0.0
```

### 第三步：GitHub发布

#### 3.1 推送到GitHub
```bash
# 添加远程仓库（如果还没有）
git remote add origin https://github.com/jacjackai/htmlPPT.git

# 推送所有分支
git push -u origin main

# 推送所有标签
git push --tags
```

#### 3.2 创建GitHub Release
1. 访问 https://github.com/jacjackai/htmlPPT/releases
2. 点击 "Create a new release"
3. 填写发布信息：
   - **Tag version**: v1.0.0
   - **Release title**: HTML PPT v1.0.0
   - **Description**: 复制CHANGELOG中的内容
4. 点击 "Publish release"

#### 3.3 启用GitHub Pages
1. 访问 https://github.com/jacjackai/htmlPPT/settings/pages
2. **Source**: 选择 "GitHub Actions"
3. 等待部署完成

### 第四步：NPM发布（可选）

#### 4.1 注册NPM账号
1. 访问 https://www.npmjs.com/signup
2. 注册账号

#### 4.2 登录NPM
```bash
npm login
```

#### 4.3 发布到NPM
```bash
# 发布到NPM
npm publish

# 查看发布结果
npm view htmlppt
```

### 第五步：推广

#### 5.1 社交媒体推广
- **Twitter/X**: 发布项目介绍
- **LinkedIn**: 分享项目
- **Reddit**: 提交到相关板块
- **Hacker News**: 提交项目

#### 5.2 技术社区推广
- **掘金**: 发布技术文章
- **CSDN**: 发布教程
- **知乎**: 回答相关问题
- **GitHub**: Star项目

#### 5.3 准备推广素材
- 项目截图
- 演示视频
- 使用教程
- 技术文章

## 发布后维护

### 1. 监控反馈
- 关注GitHub Issues
- 回复用户问题
- 收集功能建议

### 2. 持续改进
- 修复Bug
- 添加新功能
- 优化性能
- 更新文档

### 3. 定期发布
- 每月发布小版本
- 每季度发布大版本
- 及时发布安全更新

## 常见问题

### Q: 如何回滚发布？
```bash
# 删除远程标签
git push origin :refs/tags/v1.0.0

# 删除本地标签
git tag -d v1.0.0

# 重新发布
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### Q: 如何更新GitHub Release？
1. 访问Release页面
2. 点击 "Edit release"
3. 更新内容
4. 保存更改

### Q: 如何取消NPM发布？
```bash
# 取消发布（24小时内）
npm unpublish htmlppt@1.0.0

# 废弃版本
npm deprecate htmlppt@1.0.0 "请使用最新版本"
```

## 发布模板

### Release描述模板
```markdown
# HTML PPT v{VERSION}

## 🎉 新功能

- 功能1描述
- 功能2描述
- 功能3描述

## 🐛 Bug修复

- Bug1修复
- Bug2修复

## 📚 文档更新

- 文档1更新
- 文档2更新

## 🚀 升级指南

### 从v{PREV_VERSION}升级

1. 更新依赖
2. 运行迁移脚本
3. 测试功能

## 📦 下载

- [GitHub Release](https://github.com/jacjackai/htmlPPT/releases/tag/v{VERSION})
- [NPM](https://www.npmjs.com/package/htmlppt)

## 📖 文档

- [用户指南](https://jacjackai.github.io/htmlPPT/docs/user-guide.html)
- [API文档](https://jacjackai.github.io/htmlPPT/docs/api.html)

## 🤝 贡献

欢迎贡献！请查看[贡献指南](https://github.com/jacjackai/htmlPPT/blob/main/CONTRIBUTING.md)

## 📄 许可证

MIT License
```

## 自动化脚本

### 自动发布脚本
```bash
#!/bin/bash

# 自动发布脚本

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "请指定版本号"
    exit 1
fi

echo "开始发布 v$VERSION..."

# 运行测试
echo "运行测试..."
npm test

# 运行lint
echo "运行lint..."
npm run lint

# 构建
echo "构建项目..."
npm run build

# 更新版本
echo "更新版本号..."
npm version $VERSION

# 提交更改
echo "提交更改..."
git add .
git commit -m "chore: 发布v$VERSION"

# 创建标签
echo "创建标签..."
git tag -a v$VERSION -m "Release v$VERSION"

# 推送到GitHub
echo "推送到GitHub..."
git push origin main
git push origin v$VERSION

# 发布到NPM
echo "发布到NPM..."
npm publish

echo "发布完成！"
```

使用方法：
```bash
chmod +x scripts/release.sh
./scripts/release.sh 1.0.0
```

## 总结

发布一个开源项目需要仔细的准备和执行。按照这个指南，你可以确保发布过程顺利进行，并为用户提供高质量的软件。

记住：
- ✅ 充分测试
- ✅ 完整文档
- ✅ 及时响应
- ✅ 持续改进

祝发布顺利！🎉
