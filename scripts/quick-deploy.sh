#!/bin/bash

# HTML PPT 一键部署脚本
# 用于快速部署到GitHub

echo "🚀 HTML PPT 一键部署脚本"
echo "========================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查Git状态
echo -e "${BLUE}📋 检查Git状态...${NC}"
if [ ! -d .git ]; then
    echo -e "${RED}❌ Git仓库未初始化${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git仓库已初始化${NC}"
echo ""

# 检查是否有提交
if [ -z "$(git log --oneline 2>/dev/null)" ]; then
    echo -e "${RED}❌ 没有找到提交记录${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git提交已创建${NC}"
echo ""

# 检查代码语法
echo -e "${BLUE}🔍 检查代码语法...${NC}"
cd /Users/jack/Project/htmlPPT

# 检查所有JavaScript文件
js_error=0
for file in src/js/*.js; do
    if [ -f "$file" ]; then
        if ! node -c "$file" > /dev/null 2>&1; then
            echo -e "${RED}❌ $file 语法错误${NC}"
            js_error=1
        fi
    fi
done

if [ $js_error -eq 1 ]; then
    echo -e "${RED}❌ 存在语法错误，请修复后再部署${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 所有JavaScript文件语法正确${NC}"
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
echo -e "GitHub用户名: ${BLUE}$GITHUB_USERNAME${NC}"
echo -e "仓库名称: ${BLUE}$REPO_NAME${NC}"
echo -e "仓库URL: ${BLUE}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""

# 确认部署
echo "确认部署? (y/n)"
read -r CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "部署已取消"
    exit 0
fi

echo ""
echo "📝 开始部署..."
echo "=============="
echo ""

# 步骤1: 配置远程仓库
echo -e "${BLUE}步骤 1/6: 配置远程仓库${NC}"
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✅ 远程仓库已配置${NC}"
echo ""

# 步骤2: 推送代码
echo -e "${BLUE}步骤 2/6: 推送代码到GitHub${NC}"
echo "正在推送代码..."
if git push -u origin main; then
    echo -e "${GREEN}✅ 代码推送成功${NC}"
else
    echo -e "${RED}❌ 代码推送失败${NC}"
    echo ""
    echo "可能的原因:"
    echo "1. GitHub仓库未创建"
    echo "2. GitHub凭据未配置"
    echo "3. 仓库名称错误"
    echo ""
    echo "请检查后重试"
    exit 1
fi
echo ""

# 步骤3: 创建第一个tag
echo -e "${BLUE}步骤 3/6: 创建第一个版本tag${NC}"
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
echo ""

# 步骤4: 显示GitHub Release创建指南
echo -e "${BLUE}步骤 4/6: 创建GitHub Release${NC}"
echo "请访问以下链接创建GitHub Release:"
echo ""
echo -e "${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME/releases/new${NC}"
echo ""
echo "Release信息:"
echo "-----------"
echo "Tag: v1.0.0"
echo "Release title: HTML PPT v1.0.0"
echo ""
echo "Release描述:"
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
echo "git clone https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
echo "cd $REPO_NAME"
echo "open src/index.html"
echo ""
echo "创建完成后按回车继续..."
read -r
echo ""

# 步骤5: 显示GitHub Pages配置指南
echo -e "${BLUE}步骤 5/6: 配置GitHub Pages${NC}"
echo "请访问以下链接配置GitHub Pages:"
echo ""
echo -e "${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages${NC}"
echo ""
echo "配置信息:"
echo "---------"
echo "Source: Deploy from a branch"
echo "Branch: main"
echo "Folder: / (root)"
echo ""
echo "配置完成后按回车继续..."
read -r
echo ""

# 步骤6: 显示项目信息配置指南
echo -e "${BLUE}步骤 6/6: 添加项目信息${NC}"
echo "请访问以下链接添加项目信息:"
echo ""
echo -e "${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo ""
echo "点击About右侧的齿轮，填写以下信息:"
echo "----------------------------------"
echo "Description: HTML PPT - 纯前端演示文稿制作工具"
echo "Website: https://$GITHUB_USERNAME.github.io/$REPO_NAME"
echo "Topics: ppt, presentation, html, css, javascript, web, frontend, slides, demo, open-source"
echo ""
echo "配置完成后按回车继续..."
read -r
echo ""

# 完成
echo ""
echo "========================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo "========================"
echo ""
echo "你的项目已成功部署到GitHub!"
echo ""
echo "📍 仓库地址: ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo "🏷️  Release: ${GREEN}https://github.com/$GITHUB_USERNAME/$REPO_NAME/releases/tag/v1.0.0${NC}"
echo "🌐 网站地址: ${GREEN}https://$GITHUB_USERNAME.github.io/$REPO_NAME${NC}"
echo ""
echo "📋 下一步:"
echo "---------"
echo "1. 等待GitHub Pages部署完成（可能需要几分钟）"
echo "2. 访问网站验证功能"
echo "3. 分享你的项目"
echo "4. 开始推广"
echo ""
echo "📚 相关文档:"
echo "----------"
echo "- 部署指南: ${GREEN}DEPLOYMENT_GUIDE.md${NC}"
echo "- 检查清单: ${GREEN}DEPLOYMENT_CHECKLIST.md${NC}"
echo "- 部署总结: ${GREEN}DEPLOYMENT_SUMMARY.md${NC}"
echo ""
echo "🎊 恭喜！你的HTML PPT项目已经成功发布到GitHub！"
echo ""
echo "⭐ 别忘了给项目加个Star！"
