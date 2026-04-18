#!/bin/bash

# HTML PPT GitHub部署脚本
# 用于将项目部署到GitHub

echo "🚀 HTML PPT GitHub部署脚本"
echo "=========================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查是否已初始化Git
if [ ! -d .git ]; then
    echo -e "${RED}❌ Git仓库未初始化${NC}"
    echo "请先运行: git init"
    exit 1
fi

echo -e "${GREEN}✅ Git仓库已初始化${NC}"
echo ""

# 检查是否有提交
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo -e "${YELLOW}⚠️  没有找到提交记录${NC}"
    echo "请先创建提交: git add . && git commit -m 'Initial commit'"
    exit 1
fi

echo -e "${GREEN}✅ Git提交已创建${NC}"
echo ""

# 获取GitHub用户名
echo "请输入你的GitHub用户名:"
read -r GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ GitHub用户名不能为空${NC}"
    exit 1
fi

# 获取仓库名称
echo "请输入仓库名称 (默认: htmlppt):"
read -r REPO_NAME

if [ -z "$REPO_NAME" ]; then
    REPO_NAME="htmlppt"
fi

echo ""
echo "部署信息:"
echo "---------"
echo "GitHub用户名: $GITHUB_USERNAME"
echo "仓库名称: $REPO_NAME"
echo "仓库URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo ""

# 确认部署
echo "确认部署? (y/n)"
read -r CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "部署已取消"
    exit 0
fi

echo ""
echo "📝 部署步骤:"
echo "============"
echo ""

# 步骤1: 创建GitHub仓库
echo -e "${BLUE}步骤 1/5: 创建GitHub仓库${NC}"
echo "请访问以下链接创建GitHub仓库:"
echo "https://github.com/new"
echo ""
echo "仓库名称: $REPO_NAME"
echo "描述: HTML PPT - 纯前端演示文稿制作工具"
echo "可见性: Public (推荐) 或 Private"
echo "不要初始化: README, .gitignore, license"
echo ""
echo "创建完成后按回车继续..."
read -r

# 步骤2: 配置远程仓库
echo ""
echo -e "${BLUE}步骤 2/5: 配置远程仓库${NC}"
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✅ 远程仓库已配置${NC}"

# 步骤3: 推送代码
echo ""
echo -e "${BLUE}步骤 3/5: 推送代码到GitHub${NC}"
echo "正在推送代码..."
if git push -u origin main; then
    echo -e "${GREEN}✅ 代码推送成功${NC}"
else
    echo -e "${RED}❌ 代码推送失败${NC}"
    echo "请检查你的GitHub凭据"
    exit 1
fi

# 步骤4: 创建第一个tag
echo ""
echo -e "${BLUE}步骤 4/5: 创建第一个版本tag${NC}"
git tag -a v1.0.0 -m "HTML PPT v1.0.0 - 初始版本

主要功能:
- 幻灯片管理
- 演示模式
- 主题系统 (8种主题)
- 模板系统 (10种模板)
- 数据持久化
- 历史记录
- 快捷键系统 (30+快捷键)
- 协作功能
- 导出功能 (5种格式)
- 工具函数库"

if git push origin v1.0.0; then
    echo -e "${GREEN}✅ Tag创建成功${NC}"
else
    echo -e "${YELLOW}⚠️  Tag推送失败${NC}"
fi

# 步骤5: 创建GitHub Release
echo ""
echo -e "${BLUE}步骤 5/5: 创建GitHub Release${NC}"
echo "请访问以下链接创建GitHub Release:"
echo "https://github.com/$GITHUB_USERNAME/$REPO_NAME/releases/new"
echo ""
echo "Tag: v1.0.0"
echo "Release title: HTML PPT v1.0.0"
echo "描述:"
echo "🎉 HTML PPT v1.0.0 - 初始版本发布"
echo ""
echo "这是HTML PPT的第一个正式版本！"
echo ""
echo "## 主要功能"
echo "- ✨ 幻灯片创建和编辑"
echo "- 🎬 演示模式"
echo "- 🎨 8种预设主题"
echo "- 📋 10种专业模板"
echo "- 💾 自动保存"
echo "- 🔄 历史记录"
echo "- ⌨️ 30+快捷键"
echo "- 🤝 协作功能"
echo "- 📤 5种导出格式"
echo ""
echo "## 快速开始"
echo "```bash"
echo "git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "cd $REPO_NAME"
echo "open src/index.html"
echo "```"
echo ""
echo "创建完成后按回车继续..."
read -r

# 完成
echo ""
echo "=========================="
echo -e "${GREEN}🎉 部署完成！${NC}"
echo "=========================="
echo ""
echo "你的项目已成功部署到GitHub!"
echo ""
echo "📍 仓库地址: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "🏷️  Release: https://github.com/$GITHUB_USERNAME/$REPO_NAME/releases/tag/v1.0.0"
echo ""
echo "📋 下一步:"
echo "---------"
echo "1. 配置GitHub Pages (Settings → Pages → Source: main branch → /docs)"
echo "2. 启用GitHub Actions (Settings → Actions → General)"
echo "3. 添加项目描述和标签"
echo "4. 添加项目截图"
echo "5. 开始推广你的项目"
echo ""
echo "🎊 恭喜！你的HTML PPT项目已经成功发布到GitHub！"
