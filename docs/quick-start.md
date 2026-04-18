# 🚀 HTML PPT 快速开始指南

## 5分钟快速上手

### 第一步：获取项目

```bash
# 克隆项目
git clone https://github.com/yourname/htmlppt.git

# 进入项目目录
cd htmlppt
```

### 第二步：打开应用

```bash
# 直接打开（推荐）
open src/index.html

# 或者使用本地服务器
npx serve src
```

### 第三步：创建第一个演示文稿

1. 点击"新建幻灯片"按钮
2. 输入标题和内容
3. 点击"更新"按钮
4. 点击"演示模式"开始展示

就这么简单！🎉

## 📖 详细使用指南

### 基础操作

#### 创建幻灯片
```javascript
// 方法1：使用界面
点击"新建幻灯片"按钮

// 方法2：使用代码
app.addSlide({
  title: '欢迎使用',
  content: '这是一个零依赖的PPT工具'
});
```

#### 编辑幻灯片
```javascript
// 方法1：使用界面
在编辑器中修改内容，点击"更新"

// 方法2：使用代码
app.updateSlide(0, {
  title: '新标题',
  content: '新内容'
});
```

#### 删除幻灯片
```javascript
// 方法1：使用界面
点击幻灯片列表中的删除按钮

// 方法2：使用代码
app.deleteSlide(0);
```

#### 移动幻灯片
```javascript
// 方法1：使用界面
拖拽幻灯片到新位置

// 方法2：使用代码
app.moveSlide(0, 2); // 将第1张移到第3张
```

### 演示模式

#### 进入演示模式
```javascript
// 方法1：使用界面
点击"演示模式"按钮或按F5

// 方法2：使用代码
app.present();
```

#### 演示模式快捷键
- `→` 或 `↓` 或 `Space` - 下一张
- `←` 或 `↑` - 上一张
- `Home` - 第一张
- `End` - 最后一张
- `Escape` - 退出演示

### 主题切换

#### 切换主题
```javascript
// 方法1：使用界面
点击主题切换按钮

// 方法2：使用代码
app.setTheme('dark'); // 切换到深色主题
```

#### 可用主题
- `light` - 浅色主题
- `dark` - 深色主题
- `business` - 商务主题
- `creative` - 创意主题
- `minimal` - 极简主题
- `ocean` - 海洋主题
- `forest` - 森林主题
- `sunset` - 日落主题

### 模板使用

#### 使用模板
```javascript
// 方法1：使用界面
点击"模板"按钮，选择模板

// 方法2：使用代码
const slide = app.createSlideFromTemplate('title-slide', {
  title: '我的演示文稿',
  subtitle: '副标题',
  author: '作者名',
  date: '2024-04-18'
});
```

#### 可用模板
- `title-slide` - 标题幻灯片
- `content-slide` - 内容幻灯片
- `bullet-points` - 要点列表
- `two-column` - 双栏布局
- `image-slide` - 图片幻灯片
- `quote-slide` - 引用幻灯片
- `code-slide` - 代码幻灯片
- `comparison` - 对比表格
- `thank-you` - 感谢幻灯片
- `question` - 问答幻灯片

### 数据保存

#### 自动保存
```javascript
// 自动保存已启用，无需手动操作
// 数据会自动保存到localStorage
```

#### 手动保存
```javascript
// 方法1：使用界面
点击"保存"按钮或按Ctrl+S

// 方法2：使用代码
await app.save();
```

#### 导出数据
```javascript
// 导出为JSON
const json = await app.export('json');

// 导出为HTML
const html = await app.export('html');

// 导出为Markdown
const md = await app.export('markdown');

// 导出为PDF
const pdf = await app.export('pdf');
```

#### 导入数据
```javascript
// 导入JSON数据
await app.import(jsonData, 'json');

// 导入Base64数据
await app.import(base64Data, 'base64');
```

### 历史记录

#### 撤销操作
```javascript
// 方法1：使用界面
点击"撤销"按钮或按Ctrl+Z

// 方法2：使用代码
app.undo();
```

#### 重做操作
```javascript
// 方法1：使用界面
点击"重做"按钮或按Ctrl+Y

// 方法2：使用代码
app.redo();
```

### 快捷键

#### 全局快捷键
- `F5` - 进入演示模式
- `Escape` - 退出演示模式
- `Ctrl+S` - 保存
- `Ctrl+N` - 新建幻灯片
- `Ctrl+O` - 打开项目
- `Ctrl+E` - 导出项目
- `Ctrl+D` - 切换主题
- `Ctrl+Z` - 撤销
- `Ctrl+Y` - 重做

#### 编辑器快捷键
- `Ctrl+B` - 粗体
- `Ctrl+I` - 斜体
- `Ctrl+U` - 下划线
- `Ctrl+K` - 插入链接

## 💡 使用技巧

### 1. 快速创建演示文稿
```javascript
// 创建应用
const app = new HTMLPPT();

// 批量添加幻灯片
const slides = [
  { title: '介绍', content: '项目介绍' },
  { title: '功能', content: '功能列表' },
  { title: '总结', content: '项目总结' }
];

slides.forEach(slide => app.addSlide(slide));

// 开始演示
app.present();
```

### 2. 使用模板快速开始
```javascript
// 使用标题模板
app.createSlideFromTemplate('title-slide', {
  title: '我的演示文稿',
  subtitle: '副标题',
  author: '作者名',
  date: new Date().toLocaleDateString()
});

// 使用内容模板
app.createSlideFromTemplate('content-slide', {
  title: '主要内容',
  content: '这里是内容'
});
```

### 3. 自定义主题
```javascript
// 创建自定义主题
const customTheme = {
  name: 'custom',
  colors: {
    'primary-color': '#ff6b6b',
    'bg-color': '#f8f9fa',
    'text-color': '#2d3436'
  }
};

// 应用主题
app.themeManager.register('custom', new Theme(customTheme));
app.setTheme('custom');
```

### 4. 监听事件
```javascript
// 监听幻灯片变化
app.on('slide:change', (index, slide) => {
  console.log('当前幻灯片:', slide.title);
});

// 监听保存事件
app.on('save', (data) => {
  console.log('数据已保存');
});

// 监听错误事件
app.on('error', (error) => {
  console.error('发生错误:', error);
});
```

### 5. 分享演示文稿
```javascript
// 获取分享链接
const shareUrl = app.getShareUrl();

// 复制到剪贴板
navigator.clipboard.writeText(shareUrl);

// 发送给他人
console.log('分享链接:', shareUrl);
```

## 🎯 常见场景

### 场景1：快速制作演示文稿
```javascript
// 1. 创建应用
const app = new HTMLPPT();

// 2. 添加幻灯片
app.addSlide({ title: '项目介绍', content: '项目背景和目标' });
app.addSlide({ title: '功能特性', content: '主要功能列表' });
app.addSlide({ title: '技术架构', content: '技术栈和架构' });
app.addSlide({ title: '演示', content: '实际演示' });
app.addSlide({ title: '总结', content: '项目总结和展望' });

// 3. 开始演示
app.present();
```

### 场景2：使用模板制作专业演示文稿
```javascript
// 1. 创建应用
const app = new HTMLPPT();

// 2. 使用标题模板
app.createSlideFromTemplate('title-slide', {
  title: '年度报告',
  subtitle: '2024年度工作总结',
  author: '张三',
  date: '2024-04-18'
});

// 3. 使用内容模板
app.createSlideFromTemplate('content-slide', {
  title: '工作成果',
  content: '• 完成项目A\n• 完成项目B\n• 完成项目C'
});

// 4. 使用对比模板
app.createSlideFromTemplate('comparison', {
  title: '数据对比',
  leftLabel: '去年',
  rightLabel: '今年',
  item1Left: '100万',
  item1Right: '150万',
  item2Left: '50个',
  item2Right: '80个',
  item3Left: '10个',
  item3Right: '15个'
});

// 5. 使用感谢模板
app.createSlideFromTemplate('thank-you', {
  message: '感谢大家的支持！',
  contact: '联系方式：xxx@xxx.com',
  website: 'https://example.com'
});

// 6. 开始演示
app.present();
```

### 场景3：协作编辑
```javascript
// 1. 创建应用
const app = new HTMLPPT();

// 2. 启用协作
app.collaboration.setMode(CollaborationModes.COMMENT);

// 3. 添加评论
app.collaboration.addComment({
  slideId: 'slide_1',
  content: '这里需要修改'
});

// 4. 导出评论
const comments = app.collaboration.exportComments();
console.log('所有评论:', comments);
```

## 🔧 高级用法

### 1. 自定义快捷键
```javascript
// 添加自定义快捷键
app.shortcutManager.addShortcut('global', 'Ctrl+Shift+P', 'customAction');

// 注册处理函数
app.shortcutManager.register('customAction', () => {
  console.log('自定义快捷键被触发');
});
```

### 2. 自定义导出格式
```javascript
// 创建自定义导出器
const exporter = new Exporter({
  data: app.slideManager.toJSON(),
  format: 'custom',
  options: { /* 自定义选项 */ }
});

// 导出数据
const data = await exporter.export();
```

### 3. 插件系统
```javascript
// 创建插件
const myPlugin = {
  name: 'my-plugin',
  init(app) {
    console.log('插件已初始化');
    // 添加自定义功能
  }
};

// 注册插件
app.registerPlugin(myPlugin);
```

## 📚 更多资源

- [API文档](./api.md) - 详细的API参考
- [用户指南](./user-guide.md) - 完整的用户指南
- [示例代码](../examples/) - 更多使用示例
- [GitHub仓库](https://github.com/yourname/htmlppt) - 源代码和问题反馈

## ❓ 常见问题

### Q: 数据保存在哪里？
A: 数据保存在浏览器的localStorage中，不会上传到服务器。

### Q: 如何导出为PDF？
A: 点击"导出"按钮，选择PDF格式，或者使用`app.export('pdf')`。

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器（Chrome、Firefox、Safari、Edge）。

### Q: 如何自定义主题？
A: 可以通过`app.themeManager.register()`注册自定义主题。

### Q: 数据会丢失吗？
A: 不会，数据会自动保存到localStorage，除非清除浏览器缓存。

## 🎉 开始使用

现在你已经了解了HTML PPT的基本用法，开始创建你的第一个演示文稿吧！

如果遇到问题，请查看[文档](./)或在[GitHub](https://github.com/yourname/htmlppt)上提问。

祝你使用愉快！🚀
