# 更新日志

本文档记录了 HTML PPT 项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [Unreleased]

### 计划中
- [ ] 添加协作功能
- [ ] 支持更多导出格式
- [ ] 添加动画效果
- [ ] 支持插入图片和视频

## [1.0.0] - 2024-04-18

### 新增
- ✨ 零依赖的纯前端演示文稿制作工具
- ✨ 幻灯片创建、编辑、删除功能
- ✨ 幻灯片重新排序（拖拽）
- ✨ 演示模式（全屏展示）
- ✨ 深色/浅色主题切换
- ✨ 自动保存到 localStorage
- ✨ 历史记录（撤销/重做）
- ✨ 导出为图片功能
- ✨ URL参数分享功能
- ✨ 响应式设计，支持移动设备
- ✨ 丰富的快捷键支持
- ✨ 侧边栏折叠功能
- ✨ 实时预览功能

### 优化
- ⚡ 性能优化，首屏加载 < 1秒
- ⚡ 代码体积优化，核心代码 < 50KB
- ⚡ 流畅的动画效果（60fps）
- 🎨 现代化的UI设计
- 🎨 专业的配色方案
- 🎨 优雅的过渡动画

### 修复
- 🐛 修复深色模式下的显示问题
- 🐛 修复移动端触摸事件问题
- 🐛 修复localStorage容量限制问题
- 🐛 修复URL参数编码问题

### 文档
- 📝 添加完整的README文档
- 📝 添加贡献指南
- 📝 添加API文档
- 📝 添加用户指南

## [0.9.0] - 2024-04-10

### 新增
- ✨ 基础幻灯片功能
- ✨ 简单的编辑器
- ✨ 演示模式
- ✨ 本地存储

### 修复
- 🐛 修复基本的显示问题

## [0.1.0] - 2024-04-01

### 新增
- 🎉 项目初始化
- 🎉 基础HTML结构
- 🎉 基础CSS样式

---

## 版本说明

### 语义化版本

- **主版本号** (MAJOR): 不兼容的API修改
- **次版本号** (MINOR): 向下兼容的功能性新增
- **修订号** (PATCH): 向下兼容的问题修正

### 变更类型

- **新增** (Added): 新功能
- **变更** (Changed): 功能变更
- **弃用** (Deprecated): 即将移除的功能
- **移除** (Removed): 已移除的功能
- **修复** (Fixed): 问题修复
- **安全** (Security): 安全相关的修复

---

[Unreleased]: https://github.com/yourname/htmlppt/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourname/htmlppt/releases/tag/v1.0.0
[0.9.0]: https://github.com/yourname/htmlppt/releases/tag/v0.9.0
[0.1.0]: https://github.com/yourname/htmlppt/releases/tag/v0.1.0
