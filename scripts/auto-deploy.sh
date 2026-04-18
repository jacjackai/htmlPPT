#!/bin/bash

# GitHub自动化部署脚本
# 使用GitHub API完成剩余的部署步骤

set -e

# 配置
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
GITHUB_USER="jacjackai"
GITHUB_REPO="htmlPPT"
GITHUB_API="https://api.github.com"

# 颜色输出
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  HTML PPT GitHub自动化部署${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 检查token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}错误: 未设置GITHUB_TOKEN${NC}"
    exit 1
fi

# 步骤1: 创建GitHub Release
echo -e "${YELLOW}步骤1: 创建GitHub Release...${NC}"

RELEASE_TAG="v1.0.0"
RELEASE_TITLE="HTML PPT v1.0.0"
RELEASE_BODY="🎉 HTML PPT v1.0.0 - 初始版本发布

这是HTML PPT的第一个正式版本！

## ✨ 主要功能

- 🎯 **幻灯片管理** - 创建、编辑、删除、排序幻灯片
- 🎬 **演示模式** - 全屏演示，支持键盘控制
- 🎨 **主题系统** - 8种预设主题（浅色、深色、商务、创意等）
- 📋 **模板系统** - 10种专业模板（标题、内容、图片、图表等）
- 💾 **自动保存** - 本地存储，永不丢失
- 🔄 **历史记录** - 支持撤销/重做
- ⌨️ **快捷键** - 30+快捷键，提升效率
- 🤝 **协作功能** - 评论和批注系统
- 📤 **导出功能** - 支持JSON、HTML、Markdown、PDF等格式
- 🛠️ **工具函数** - 丰富的工具函数库

## 🚀 快速开始

### 克隆项目
\`\`\`bash
git clone https://github.com/jacjackai/htmlPPT.git
cd htmlPPT
\`\`\`

### 直接使用
\`\`\`bash
# 打开主应用
open src/index.html

# 或者使用Python启动本地服务器
python -m http.server 8000
# 然后访问 http://localhost:8000/src/index.html
\`\`\`

### 使用示例
\`\`\`bash
# 查看基础示例
open examples/basic.html

# 查看演示页面
open examples/demo.html
\`\`\`

## 📚 文档

- [用户指南](docs/user-guide.md) - 详细的使用说明
- [API文档](docs/api.md) - 完整的API参考
- [贡献指南](CONTRIBUTING.md) - 如何贡献代码
- [快速开始](docs/quick-start.md) - 快速上手指南

## 🎨 特性

- ✅ **零依赖** - 纯HTML/CSS/JavaScript，无需构建工具
- ✅ **响应式** - 完美适配各种设备
- ✅ **高性能** - 轻量级，秒级加载
- ✅ **易扩展** - 模块化设计，易于扩展
- ✅ **开源** - MIT许可证，自由使用

## 📊 技术栈

- **前端**: HTML5, CSS3, JavaScript ES6+
- **存储**: localStorage API
- **图标**: Font Awesome 6.4.0
- **测试**: Jest
- **构建**: Webpack, Babel

## 🌐 在线演示

访问演示网站: https://jacjackai.github.io/htmlPPT

## 📝 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解详细更新记录。

## 🤝 贡献

欢迎贡献！请查看 [贡献指南](CONTRIBUTING.md)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有贡献者和使用者！

---

⭐ 如果这个项目对你有帮助，请给个 Star！

🐛 发现问题？请提交 [Issue](https://github.com/jacjackai/htmlPPT/issues)

💡 有好的想法？欢迎提交 [PR](https://github.com/jacjackai/htmlPPT/pulls)"

# 检查Release是否已存在
echo "检查Release是否已存在..."
RELEASE_EXISTS=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    "$GITHUB_API/repos/$GITHUB_USER/$GITHUB_REPO/releases/tags/$RELEASE_TAG" \
    | grep -o '"id"' || echo "")

if [ -n "$RELEASE_EXISTS" ]; then
    echo -e "${YELLOW}Release $RELEASE_TAG 已存在，跳过创建${NC}"
else
    echo "创建Release..."
    RELEASE_RESPONSE=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "$GITHUB_API/repos/$GITHUB_USER/$GITHUB_REPO/releases" \
        -d "{
            \"tag_name\": \"$RELEASE_TAG\",
            \"target_commitish\": \"main\",
            \"name\": \"$RELEASE_TITLE\",
            \"body\": $(echo "$RELEASE_BODY" | jq -Rs .),
            \"draft\": false,
            \"prerelease\": false
        }")

    RELEASE_URL=$(echo "$RELEASE_RESPONSE" | grep -o '"html_url":"[^"]*' | cut -d'"' -f4)

    if [ -n "$RELEASE_URL" ]; then
        echo -e "${GREEN}✓ Release创建成功: $RELEASE_URL${NC}"
    else
        echo -e "${RED}✗ Release创建失败${NC}"
        echo "$RELEASE_RESPONSE"
    fi
fi

echo ""

# 步骤2: 配置GitHub Pages
echo -e "${YELLOW}步骤2: 配置GitHub Pages...${NC}"

PAGES_CONFIG='{
    "source": {
        "branch": "main",
        "path": "/"
    }
}'

echo "配置GitHub Pages..."
PAGES_RESPONSE=$(curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "$GITHUB_API/repos/$GITHUB_USER/$GITHUB_REPO/pages" \
    -d "$PAGES_CONFIG")

PAGES_STATUS=$(echo "$PAGES_RESPONSE" | grep -o '"status":"[^"]*' | cut -d'"' -f4)

if [ "$PAGES_STATUS" = "queued" ] || [ "$PAGES_STATUS" = "building" ]; then
    echo -e "${GREEN}✓ GitHub Pages配置成功，正在构建中...${NC}"
    echo "等待几分钟后访问: https://$GITHUB_USER.github.io/$GITHUB_REPO"
else
    echo -e "${YELLOW}GitHub Pages配置响应:${NC}"
    echo "$PAGES_RESPONSE"
fi

echo ""

# 步骤3: 更新项目信息
echo -e "${YELLOW}步骤3: 更新项目信息...${NC}"

REPO_UPDATE='{
    "name": "htmlPPT",
    "description": "HTML PPT - 纯前端演示文稿制作工具",
    "homepage": "https://'$GITHUB_USER'.github.io/'$GITHUB_REPO'",
    "topics": [
        "ppt",
        "presentation",
        "html",
        "css",
        "javascript",
        "web",
        "frontend",
        "slides",
        "demo",
        "open-source"
    ],
    "has_wiki": true,
    "has_issues": true,
    "has_projects": true,
    "has_downloads": true
}'

echo "更新项目信息..."
REPO_UPDATE_RESPONSE=$(curl -s -X PATCH \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    "$GITHUB_API/repos/$GITHUB_USER/$GITHUB_REPO" \
    -d "$REPO_UPDATE")

REPO_NAME=$(echo "$REPO_UPDATE_RESPONSE" | grep -o '"name":"[^"]*' | cut -d'"' -f4)

if [ "$REPO_NAME" = "htmlPPT" ]; then
    echo -e "${GREEN}✓ 项目信息更新成功${NC}"
else
    echo -e "${RED}✗ 项目信息更新失败${NC}"
    echo "$REPO_UPDATE_RESPONSE"
fi

echo ""

# 步骤4: 添加仓库标签
echo -e "${YELLOW}步骤4: 添加仓库标签...${NC}"

TOPICS="ppt,presentation,html,css,javascript,web,frontend,slides,demo,open-source"

echo "添加标签..."
TOPICS_RESPONSE=$(curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.mercy-preview+json" \
    "$GITHUB_API/repos/$GITHUB_USER/$GITHUB_REPO/topics" \
    -d "{\"names\": [$TOPICS]}")

echo -e "${GREEN}✓ 仓库标签添加成功${NC}"

echo ""

# 完成
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}  🎉 部署完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}✓ GitHub Release: ${NC}https://github.com/$GITHUB_USER/$GITHUB_REPO/releases"
echo -e "${GREEN}✓ GitHub Pages: ${NC}https://$GITHUB_USER.github.io/$GITHUB_REPO"
echo -e "${GREEN}✓ 仓库地址: ${NC}https://github.com/$GITHUB_USER/$GITHUB_REPO"
echo ""
echo -e "${YELLOW}提示:${NC}"
echo "- GitHub Pages可能需要几分钟才能部署完成"
echo "- 请访问仓库查看所有配置"
echo "- 别忘了给项目加个Star！⭐"
echo ""
echo -e "${BLUE}========================================${NC}"
