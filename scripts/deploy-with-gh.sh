#!/bin/bash

# GitHub自动化部署脚本 - 使用GitHub CLI
# 需要先安装: brew install gh
# 需要先登录: gh auth login

set -e

# 配置
GITHUB_USER="jacjackai"
GITHUB_REPO="htmlPPT"

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

# 检查gh是否安装
if ! command -v gh &> /dev/null; then
    echo -e "${RED}错误: 未安装GitHub CLI (gh)${NC}"
    echo "请安装: brew install gh"
    echo "然后登录: gh auth login"
    exit 1
fi

# 检查是否已登录
if ! gh auth status &> /dev/null; then
    echo -e "${RED}错误: 未登录GitHub CLI${NC}"
    echo "请运行: gh auth login"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI已安装并登录${NC}"
echo ""

# 步骤1: 创建GitHub Release
echo -e "${YELLOW}步骤1: 创建GitHub Release...${NC}"

RELEASE_TAG="v1.0.0"
RELEASE_TITLE="HTML PPT v1.0.0"
RELEASE_NOTES="release-notes.md"

# 检查Release是否已存在
if gh release view "$RELEASE_TAG" --repo "$GITHUB_USER/$GITHUB_REPO" &> /dev/null; then
    echo -e "${YELLOW}Release $RELEASE_TAG 已存在，跳过创建${NC}"
else
    echo "创建Release..."
    gh release create "$RELEASE_TAG" \
        --title "$RELEASE_TITLE" \
        --notes-file "$RELEASE_NOTES" \
        --repo "$GITHUB_USER/$GITHUB_REPO" \
        || echo -e "${YELLOW}Release创建可能失败，请手动检查${NC}"
    echo -e "${GREEN}✓ Release创建完成${NC}"
fi

echo ""

# 步骤2: 更新仓库信息
echo -e "${YELLOW}步骤2: 更新仓库信息...${NC}"

gh repo edit "$GITHUB_USER/$GITHUB_REPO" \
    --description "HTML PPT - 纯前端演示文稿制作工具" \
    --homepage "https://$GITHUB_USER.github.io/$GITHUB_REPO" \
    --enable-issues \
    --enable-wiki \
    --enable-projects || echo -e "${YELLOW}仓库信息更新可能失败${NC}"

echo -e "${GREEN}✓ 仓库信息更新完成${NC}"

echo ""

# 步骤3: 添加仓库标签
echo -e "${YELLOW}步骤3: 添加仓库标签...${NC}"

gh repo edit "$GITHUB_USER/$GITHUB_REPO" \
    --add-topic "ppt" \
    --add-topic "presentation" \
    --add-topic "html" \
    --add-topic "css" \
    --add-topic "javascript" \
    --add-topic "web" \
    --add-topic "frontend" \
    --add-topic "slides" \
    --add-topic "demo" \
    --add-topic "open-source" || echo -e "${YELLOW}标签添加可能失败${NC}"

echo -e "${GREEN}✓ 仓库标签添加完成${NC}"

echo ""

# 步骤4: 配置GitHub Pages（需要手动操作）
echo -e "${YELLOW}步骤4: 配置GitHub Pages...${NC}"
echo -e "${YELLOW}GitHub Pages配置需要手动完成：${NC}"
echo ""
echo "1. 访问: https://github.com/$GITHUB_USER/$GITHUB_REPO/settings/pages"
echo "2. 在 'Source' 下选择:"
echo "   - Branch: main"
echo "   - Folder: / (root)"
echo "3. 点击 Save"
echo ""
echo -e "${GREEN}✓ 配置完成后，访问: https://$GITHUB_USER.github.io/$GITHUB_REPO${NC}"

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
