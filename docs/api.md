# API 文档

HTML PPT 提供了完整的 JavaScript API，让你可以 programmatically 控制演示文稿。

## 目录

- [初始化](#初始化)
- [幻灯片管理](#幻灯片管理)
- [演示控制](#演示控制)
- [主题管理](#主题管理)
- [数据持久化](#数据持久化)
- [事件系统](#事件系统)
- [工具函数](#工具函数)

## 初始化

### HTMLPPT

创建 HTML PPT 实例。

```javascript
const app = new HTMLPPT(options);
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `container` | `string \| HTMLElement` | `'#app'` | 容器选择器或元素 |
| `theme` | `string` | `'light'` | 主题：`'light'` 或 `'dark'` |
| `autoSave` | `boolean` | `true` | 是否自动保存 |
| `autoSaveInterval` | `number` | `30000` | 自动保存间隔（毫秒） |
| `maxHistory` | `number` | `50` | 最大历史记录数 |

#### 示例

```javascript
const app = new HTMLPPT({
  container: '#presentation',
  theme: 'dark',
  autoSave: true,
  autoSaveInterval: 60000
});
```

## 幻灯片管理

### addSlide

添加新幻灯片。

```javascript
app.addSlide(options);
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `title` | `string` | `''` | 幻灯片标题 |
| `content` | `string` | `''` | 幻灯片内容 |
| `position` | `number` | `null` | 插入位置（null表示末尾） |
| `theme` | `string` | `null` | 幻灯片主题 |

#### 返回值

返回新创建的幻灯片对象。

#### 示例

```javascript
// 在末尾添加
const slide = app.addSlide({
  title: '欢迎使用',
  content: '这是第一张幻灯片'
});

// 在指定位置添加
app.addSlide({
  title: '目录',
  content: '这是第二张幻灯片'
}, 1);
```

### getSlide

获取指定幻灯片。

```javascript
const slide = app.getSlide(index);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `index` | `number` | 幻灯片索引 |

#### 返回值

返回幻灯片对象，如果不存在返回 `null`。

### updateSlide

更新幻灯片内容。

```javascript
app.updateSlide(index, options);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `index` | `number` | 幻灯片索引 |
| `options` | `object` | 更新选项 |

#### 示例

```javascript
app.updateSlide(0, {
  title: '新标题',
  content: '新内容'
});
```

### deleteSlide

删除幻灯片。

```javascript
app.deleteSlide(index);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `index` | `number` | 幻灯片索引 |

### moveSlide

移动幻灯片位置。

```javascript
app.moveSlide(fromIndex, toIndex);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `fromIndex` | `number` | 原位置 |
| `toIndex` | `number` | 目标位置 |

### getSlides

获取所有幻灯片。

```javascript
const slides = app.getSlides();
```

#### 返回值

返回幻灯片数组。

### getCurrentSlide

获取当前幻灯片。

```javascript
const slide = app.getCurrentSlide();
```

#### 返回值

返回当前幻灯片对象。

### getCurrentSlideIndex

获取当前幻灯片索引。

```javascript
const index = app.getCurrentSlideIndex();
```

#### 返回值

返回当前幻灯片索引。

## 演示控制

### present

进入演示模式。

```javascript
app.present(startIndex);
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `startIndex` | `number` | `0` | 开始幻灯片索引 |

### exit

退出演示模式。

```javascript
app.exit();
```

### nextSlide

下一张幻灯片。

```javascript
app.nextSlide();
```

### previousSlide

上一张幻灯片。

```javascript
app.previousSlide();
```

### goToSlide

跳转到指定幻灯片。

```javascript
app.goToSlide(index);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `index` | `number` | 目标幻灯片索引 |

## 主题管理

### setTheme

设置主题。

```javascript
app.setTheme(theme);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `theme` | `string` | 主题名称：`'light'` 或 `'dark'` |

### getTheme

获取当前主题。

```javascript
const theme = app.getTheme();
```

#### 返回值

返回当前主题名称。

### toggleTheme

切换主题。

```javascript
app.toggleTheme();
```

## 数据持久化

### save

保存当前状态。

```javascript
app.save();
```

### load

加载保存的状态。

```javascript
app.load();
```

### export

导出演示文稿。

```javascript
app.export(format, options);
```

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `format` | `string` | `'json'` | 导出格式：`'json'`, `'pdf'`, `'image'` |
| `options` | `object` | `{}` | 导出选项 |

#### 示例

```javascript
// 导出为JSON
app.export('json');

// 导出为PDF
app.export('pdf', { filename: 'presentation.pdf' });

// 导出为图片
app.export('image', { format: 'png', quality: 1.0 });
```

### import

导入演示文稿。

```javascript
app.import(data, format);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `data` | `string \| object` | 导入数据 |
| `format` | `string` | 数据格式 |

## 事件系统

### on

监听事件。

```javascript
app.on(event, callback);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `event` | `string` | 事件名称 |
| `callback` | `function` | 回调函数 |

#### 事件列表

| 事件名称 | 描述 | 回调参数 |
|----------|------|----------|
| `slide:change` | 幻灯片切换 | `(index, slide)` |
| `slide:add` | 添加幻灯片 | `(slide, index)` |
| `slide:delete` | 删除幻灯片 | `(index)` |
| `slide:update` | 更新幻灯片 | `(slide, index)` |
| `present:start` | 开始演示 | `(startIndex)` |
| `present:end` | 结束演示 | `()` |
| `theme:change` | 主题切换 | `(theme)` |
| `save` | 保存数据 | `(data)` |
| `load` | 加载数据 | `(data)` |

#### 示例

```javascript
app.on('slide:change', (index, slide) => {
  console.log(`切换到幻灯片 ${index}:`, slide.title);
});

app.on('present:start', (startIndex) => {
  console.log(`开始演示，从第 ${startIndex} 张幻灯片`);
});
```

### off

移除事件监听。

```javascript
app.off(event, callback);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `event` | `string` | 事件名称 |
| `callback` | `function` | 回调函数（可选） |

### emit

触发事件。

```javascript
app.emit(event, data);
```

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| `event` | `string` | 事件名称 |
| `data` | `any` | 事件数据 |

## 工具函数

### undo

撤销操作。

```javascript
app.undo();
```

### redo

重做操作。

```javascript
app.redo();
```

### canUndo

检查是否可以撤销。

```javascript
const canUndo = app.canUndo();
```

#### 返回值

返回布尔值。

### canRedo

检查是否可以重做。

```javascript
const canRedo = app.canRedo();
```

#### 返回值

返回布尔值。

### clearHistory

清除历史记录。

```javascript
app.clearHistory();
```

## 完整示例

```javascript
// 初始化
const app = new HTMLPPT({
  container: '#presentation',
  theme: 'dark',
  autoSave: true
});

// 添加幻灯片
app.addSlide({
  title: '欢迎使用 HTML PPT',
  content: '这是一个零依赖的演示文稿制作工具'
});

app.addSlide({
  title: '功能特性',
  content: '• 零依赖\n• 纯前端\n• 开箱即用'
});

// 监听事件
app.on('slide:change', (index, slide) => {
  console.log(`当前幻灯片: ${slide.title}`);
});

// 开始演示
app.present();

// 导出
setTimeout(() => {
  app.export('pdf', { filename: 'my-presentation.pdf' });
}, 5000);
```

## TypeScript 支持

如果你使用 TypeScript，可以安装类型定义：

```bash
npm install @types/htmlppt
```

```typescript
import HTMLPPT from 'htmlppt';

const app: HTMLPPT = new HTMLPPT({
  container: '#presentation',
  theme: 'light'
});

const slide = app.addSlide({
  title: 'TypeScript 支持',
  content: '完整的类型定义'
});
```

---

## 许可证

MIT License
