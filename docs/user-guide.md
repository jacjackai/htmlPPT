# HTML PPT 用户指南

欢迎使用 HTML PPT！本指南将帮助你快速上手并充分利用这个强大的演示文稿制作工具。

## 目录

- [快速开始](#快速开始)
- [界面介绍](#界面介绍)
- [基本操作](#基本操作)
- [高级功能](#高级功能)
- [快捷键](#快捷键)
- [主题定制](#主题定制)
- [导出分享](#导出分享)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

## 快速开始

### 1. 打开应用

直接在浏览器中打开 `index.html` 文件，或使用开发服务器：

```bash
npm run dev
```

### 2. 创建第一个幻灯片

点击左侧边栏的 "新建幻灯片" 按钮，即可创建你的第一张幻灯片。

### 3. 编辑内容

在编辑区域输入标题和内容，支持富文本编辑。

### 4. 开始演示

点击右上角的 "演示" 按钮或按 `F5` 键进入演示模式。

## 界面介绍

### 主界面

```
┌─────────────────────────────────────────────────────────┐
│  🎨 HTML PPT                    [主题] [演示] [导出]    │  ← 顶部工具栏
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│  幻灯片  │              编辑区域                        │
│  列表    │                                              │
│          │  [标题输入框]                                │
│  [新建]  │                                              │
│          │  [内容编辑器]                                │
│  幻灯片1 │                                              │
│  幻灯片2 │                                              │
│  幻灯片3 │                                              │
│          │                                              │
└──────────┴──────────────────────────────────────────────┘
```

### 侧边栏

- **幻灯片列表**：显示所有幻灯片的预览
- **新建按钮**：创建新幻灯片
- **幻灯片操作**：拖拽排序、删除、导出

### 编辑区域

- **标题输入**：幻灯片标题
- **内容编辑器**：支持富文本编辑
- **实时预览**：即时查看效果

### 顶部工具栏

- **主题切换**：明暗主题切换
- **演示按钮**：进入演示模式
- **导出按钮**：导出为各种格式
- **保存按钮**：手动保存
- **撤销/重做**：历史记录操作

## 基本操作

### 创建幻灯片

1. 点击左侧边栏的 "新建幻灯片" 按钮
2. 或使用快捷键 `Ctrl/Cmd + N`
3. 新幻灯片会自动添加到列表末尾

### 编辑幻灯片

1. 点击幻灯片列表中的幻灯片
2. 在编辑区域修改标题和内容
3. 修改会自动保存

### 删除幻灯片

1. 鼠标悬停在幻灯片上
2. 点击出现的删除按钮（垃圾桶图标）
3. 确认删除

### 重新排序

1. 拖拽幻灯片到目标位置
2. 释放鼠标完成排序
3. 或使用上下箭头按钮

### 切换幻灯片

1. 点击幻灯片列表中的幻灯片
2. 或使用快捷键 `↑` / `↓`
3. 或在演示模式中使用 `←` / `→`

## 高级功能

### 演示模式

#### 进入演示模式

- 点击 "演示" 按钮
- 或按 `F5` 键
- 或使用 URL 参数：`?mode=presentation`

#### 演示模式操作

- **下一页**：点击屏幕右侧、按 `→` 或 `Space`
- **上一页**：点击屏幕左侧、按 `←`
- **退出**：按 `Esc` 或点击退出按钮
- **全屏**：按 `F11`

#### 演示模式设置

```javascript
// 自定义演示设置
app.present({
  startIndex: 0,
  autoPlay: false,
  interval: 5000,
  loop: false
});
```

### 自动保存

#### 启用/禁用自动保存

```javascript
// 启用自动保存
app.enableAutoSave();

// 禁用自动保存
app.disableAutoSave();

// 设置自动保存间隔
app.setAutoSaveInterval(60000); // 60秒
```

#### 手动保存

- 点击 "保存" 按钮
- 或按 `Ctrl/Cmd + S`

### 历史记录

#### 撤销操作

- 点击撤销按钮
- 或按 `Ctrl/Cmd + Z`

#### 重做操作

- 点击重做按钮
- 或按 `Ctrl/Cmd + Y`

#### 清除历史

```javascript
app.clearHistory();
```

### 导出功能

#### 导出为 JSON

```javascript
app.export('json', {
  filename: 'presentation.json'
});
```

#### 导出为 PDF

```javascript
app.export('pdf', {
  filename: 'presentation.pdf',
  format: 'a4',
  orientation: 'landscape'
});
```

#### 导出为图片

```javascript
app.export('image', {
  format: 'png',
  quality: 1.0,
  scale: 2
});
```

### 导入功能

#### 从文件导入

```javascript
app.importFromFile(file);
```

#### 从 URL 导入

```javascript
app.importFromUrl(url);
```

#### 从 JSON 导入

```javascript
const data = {
  slides: [
    { title: '标题', content: '内容' }
  ]
};
app.import(data, 'json');
```

## 快捷键

### 全局快捷键

| 快捷键 | 功能 |
|--------|------|
| `F5` | 进入演示模式 |
| `Esc` | 退出演示模式 |
| `Ctrl/Cmd + S` | 保存 |
| `Ctrl/Cmd + N` | 新建幻灯片 |
| `Ctrl/Cmd + Z` | 撤销 |
| `Ctrl/Cmd + Y` | 重做 |
| `Ctrl/Cmd + D` | 切换主题 |

### 编辑快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + B` | 粗体 |
| `Ctrl/Cmd + I` | 斜体 |
| `Ctrl/Cmd + U` | 下划线 |
| `Ctrl/Cmd + K` | 插入链接 |

### 演示模式快捷键

| 快捷键 | 功能 |
|--------|------|
| `←` / `→` | 上一页/下一页 |
| `↑` / `↓` | 上一页/下一页 |
| `Space` | 下一页 |
| `Home` | 第一页 |
| `End` | 最后一页 |
| `F11` | 全屏切换 |

## 主题定制

### 内置主题

HTML PPT 提供多种内置主题：

- **Light** - 浅色主题（默认）
- **Dark** - 深色主题
- **Business** - 商务主题
- **Creative** - 创意主题
- **Minimal** - 极简主题

### 切换主题

```javascript
// 切换到深色主题
app.setTheme('dark');

// 切换主题
app.toggleTheme();
```

### 自定义主题

你可以创建自定义主题：

```javascript
app.registerTheme('my-theme', {
  colors: {
    primary: '#4a6fa5',
    secondary: '#6e9cd2',
    background: '#f5f5f7',
    text: '#333333'
  },
  fonts: {
    heading: 'Arial, sans-serif',
    body: 'Georgia, serif'
  },
  spacing: {
    padding: '1rem',
    margin: '0.5rem'
  }
});

// 使用自定义主题
app.setTheme('my-theme');
```

### CSS 变量

你也可以通过 CSS 变量自定义样式：

```css
:root {
  --primary-color: #4a6fa5;
  --secondary-color: #6e9cd2;
  --background-color: #f5f5f7;
  --text-color: #333333;
  --border-radius: 12px;
  --transition: all 0.3s ease;
}
```

## 导出分享

### URL 分享

#### 生成分享链接

```javascript
const shareUrl = app.getShareUrl();
console.log(shareUrl);
// 输出: https://example.com?data=eyJzbGlkZXMiOlt7InRpdGxlIjoi...
```

#### 从 URL 加载

访问带有 `data` 参数的 URL 即可加载演示文稿：

```
https://example.com?data=eyJzbGlkZXMiOlt7InRpdGxlIjoi...
```

### 嵌入到网站

```html
<iframe
  src="https://example.com?data=eyJzbGlkZXMiOlt7InRpdGxlIjoi..."
  width="100%"
  height="600"
  frameborder="0">
</iframe>
```

### 社交媒体分享

```javascript
// 分享到 Twitter
app.shareToTwitter('我的演示文稿');

// 分享到 Facebook
app.shareToFacebook('我的演示文稿');

// 复制分享链接
app.copyShareLink();
```

## 常见问题

### Q: 数据保存在哪里？

A: 数据保存在浏览器的 localStorage 中，不会上传到服务器。

### Q: 如何备份数据？

A: 使用导出功能将数据导出为 JSON 文件，需要时可以导入恢复。

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器：Chrome、Firefox、Safari、Edge 等。

### Q: 可以离线使用吗？

A: 可以！HTML PPT 是纯前端应用，完全支持离线使用。

### Q: 如何插入图片？

A: 当前版本支持通过 Markdown 语法插入图片：`![alt](url)`

### Q: 支持协作编辑吗？

A: 当前版本不支持实时协作，但可以通过导出/导入功能分享数据。

### Q: 有文件大小限制吗？

A: localStorage 有约 5MB 的限制，建议定期导出备份。

### Q: 如何恢复误删的幻灯片？

A: 使用撤销功能（Ctrl/Cmd + Z）可以恢复最近删除的幻灯片。

## 最佳实践

### 1. 定期备份

```javascript
// 设置自动备份
setInterval(() => {
  app.export('json', {
    filename: `backup-${Date.now()}.json`
  });
}, 3600000); // 每小时备份一次
```

### 2. 使用快捷键

熟练使用快捷键可以大大提高效率。

### 3. 合理组织幻灯片

- 使用清晰的标题
- 保持每张幻灯片内容简洁
- 使用一致的样式

### 4. 利用主题

选择合适的主题可以让演示文稿更加专业。

### 5. 测试演示

在正式演示前，先在演示模式下测试一遍。

### 6. 准备备用方案

导出为 PDF 作为备用，以防网络问题。

## 进阶技巧

### 1. 批量操作

```javascript
// 批量添加幻灯片
const titles = ['介绍', '功能', '演示', '总结'];
titles.forEach(title => {
  app.addSlide({ title });
});
```

### 2. 自定义事件

```javascript
app.on('slide:change', (index) => {
  console.log(`切换到第 ${index + 1} 张幻灯片`);
  // 自定义逻辑
});
```

### 3. 集成到现有项目

```javascript
// 在 React 中使用
import { useEffect, useRef } from 'react';

function Presentation() {
  const containerRef = useRef(null);

  useEffect(() => {
    const app = new HTMLPPT({
      container: containerRef.current
    });
    return () => app.destroy();
  }, []);

  return <div ref={containerRef} />;
}
```

### 4. 自动化测试

```javascript
// 自动化演示
async function autoPresent() {
  app.present();
  for (let i = 0; i < app.getSlides().length; i++) {
    await new Promise(resolve => setTimeout(resolve, 5000));
    app.nextSlide();
  }
  app.exit();
}
```

## 获取帮助

- 📖 查看 [API 文档](api.md)
- 🤝 查看 [贡献指南](CONTRIBUTING.md)
- 🐛 提交 [Issue](https://github.com/jacjackai/htmlPPT/issues)
- 💬 加入 [讨论](https://github.com/jacjackai/htmlPPT/discussions)

---

祝你使用愉快！🎉
