# HTML PPT 运行指南

## 快速开始

本指南将帮助您在浏览器中运行HTML PPT项目。

---

## 运行方式

### 方式1：直接打开（零依赖）

这是最简单的方式，无需任何服务器或构建步骤：

```bash
# 直接打开src/index.html文件
open src/index.html
```

**特点**：
- 无需构建
- 无需服务器
- 立即可用
- 适用于快速测试

**限制**：
- 无法加载本地文件（由于浏览器安全限制）
- 部分功能可能受限

---

### 方式2：使用开发服务器

推荐的开发方式，支持完整功能：

```bash
# 安装依赖（如果尚未安装）
npm install

# 启动开发服务器
npm run dev
```

这将使用`live-server`在端口8080启动开发服务器。

**访问地址**：http://localhost:8080

**特点**：
- 完整功能支持
- 实时重载
- 文件加载支持
- 适用于开发和测试

---

### 方式3：使用Python简易服务器

如果您没有安装Node.js，可以使用Python：

```bash
# 使用Python 3
python -m http.server 8000 -d src

# 或者使用Python 2
python -m SimpleHTTPServer 8000
```

**访问地址**：http://localhost:8000

**特点**：
- 无需Node.js
- 简单快捷
- 支持文件加载

---

### 方式4：生产构建

用于部署到生产环境：

```bash
# 构建生产版本
npm run build

# 部署到GitHub Pages
npm run deploy

# 或者手动部署dist/目录
```

**特点**：
- 优化的生产代码
- 最小化文件大小
- 适用于生产部署

---

## 运行指南

### 首次运行

1. **克隆仓库**（如果尚未克隆）：
   ```bash
   git clone https://github.com/jacjackai/htmlPPT.git
   cd htmlPPT
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **运行项目**：
   ```bash
   npm run dev
   ```

4. **打开浏览器**：
   - 自动打开：http://localhost:8080
   - 或者手动打开上述地址

---

## 功能测试

### 基本功能

1. **创建幻灯片**：
   - 点击"新建幻灯片"按钮
   - 验证幻灯片列表更新

2. **编辑幻灯片**：
   - 在代码编辑器中输入HTML
   - 验证实时预览更新

3. **演示模式**：
   - 点击"演示模式"按钮
   - 验证全屏显示
   - 测试导航按钮

### 新功能测试

1. **URL参数分享**：
   - 创建一个项目
   - 点击"分享"按钮
   - 复制URL并在新标签页打开

2. **演示控制面板**：
   - 进入演示模式
   - 移动鼠标验证控制面板显示
   - 等待3秒验证自动隐藏

3. **幻灯片拖拽排序**：
   - 创建多个幻灯片
   - 拖动幻灯片到新位置
   - 验证顺序更新

4. **在指定位置添加**：
   - 右键幻灯片或点击"上方添加"/"下方添加"按钮
   - 验证新幻灯片位置正确

5. **自动保存指示器**：
   - 编辑幻灯片内容
   - 等待30秒触发自动保存
   - 验证指示器显示并自动隐藏

6. **空状态提示**：
   - 创建新项目
   - 验证空状态提示显示
   - 添加幻灯片验证提示消失

7. **侧边栏折叠**：
   - 点击侧边栏切换按钮
   - 验证侧边栏折叠/展开
   - 验证按钮图标切换

8. **面板大小调整**：
   - 拖动编辑器和预览之间的分割线
   - 验证面板宽度调整
   - 在移动设备上测试垂直调整

9. **幻灯片图片导出**：
   - 点击幻灯片的"导出为图片"按钮
   - 验证通知显示（需要html2canvas）

---

## 问题排查

### 常见问题

1. **空白页**：
   - 检查浏览器控制台错误
   - 确保使用开发服务器（不是直接打开文件）
   - 清除浏览器缓存

2. **功能不工作**：
   - 检查浏览器兼容性（Chrome/Firefox/Safari/Edge）
   - 确保所有依赖已安装
   - 运行`npm run lint`检查代码错误

3. **构建失败**：
   - 确保Node.js版本≥16.0.0
   - 删除node_modules并重新安装
   - 检查package.json依赖

4. **性能问题**：
   - 关闭其他浏览器标签
   - 清除浏览器缓存
   - 使用Chrome DevTools分析性能

---

## 高级用法

### 使用不同端口

```bash
# 使用live-server指定端口
npx live-server src --port=3000

# 使用Python服务器指定端口
python -m http.server 3000 -d src
```

### 调试模式

```bash
# 使用Chrome调试
npm run dev -- --inspect

# 使用VS Code调试
# 创建launch.json配置
```

### 生产优化

```bash
# 构建并分析包大小
npm run build -- --stats

# 优化图片
# 使用ImageMagick或其他工具
```

---

## 浏览器支持

| 浏览器 | 支持级别 | 备注 |
|--------|----------|------|
| Chrome | ✅ 完全支持 | 推荐 |
| Firefox | ✅ 完全支持 | 推荐 |
| Safari | ✅ 完全支持 | 推荐 |
| Edge | ✅ 完全支持 | 推荐 |
| IE11 | ❌ 不支持 | 不推荐 |

---

## 移动设备

### 测试方法

1. **Chrome移动模拟**：
   - 打开Chrome DevTools
   - 切换到移动视图
   - 选择设备（iPhone, iPad等）

2. **真实设备**：
   - 确保服务器可访问
   - 使用局域网IP访问
   - 测试触摸交互

### 注意事项

- 触摸事件支持
- 响应式布局适应
- 移动性能优化

---

## 部署选项

### GitHub Pages

```bash
npm run deploy
```

访问：https://jacjackai.github.io/htmlPPT

### Netlify/Vercel

1. 拖放dist/目录
2. 配置自动部署
3. 设置自定义域名

### 自托管

```bash
# 复制dist/到服务器
scp -r dist/ user@server:/var/www/html

# 配置Nginx
# 设置HTTPS
```

---

## 更新日志

查看[CHANGELOG.md](CHANGELOG.md)了解最新变更。

---

## 获取帮助

- **文档**：查看docs/目录
- **问题**：提交GitHub Issues
- **讨论**：加入社区讨论
- **贡献**：查看CONTRIBUTING.md

---

## 许可证

本项目采用MIT许可证 - 查看[LICENSE](LICENSE)文件。

---

## 结论

通过本指南，您应该能够成功运行HTML PPT项目并测试所有新功能。如果遇到任何问题，请参考问题排查部分或提交GitHub Issue。