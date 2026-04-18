#!/bin/bash

# HTML PPT 发布脚本
# 用于自动化发布流程

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查函数
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 未安装"
        exit 1
    fi
}

# 检查Git状态
check_git_status() {
    log_info "检查Git状态..."
    
    if [ -n "$(git status --porcelain)" ]; then
        log_warning "有未提交的更改"
        git status
        read -p "是否继续？(y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        log_success "Git状态正常"
    fi
}

# 运行测试
run_tests() {
    log_info "运行测试..."
    
    if [ -f "package.json" ]; then
        npm test
        log_success "所有测试通过"
    else
        log_warning "未找到package.json，跳过测试"
    fi
}

# 运行代码检查
run_lint() {
    log_info "运行代码检查..."
    
    if [ -f "package.json" ] && grep -q "lint" package.json; then
        npm run lint
        log_success "代码检查通过"
    else
        log_warning "未配置lint，跳过"
    fi
}

# 构建项目
build_project() {
    log_info "构建项目..."
    
    if [ -f "scripts/build.js" ]; then
        node scripts/build.js build
    elif [ -f "package.json" ] && grep -q "build" package.json; then
        npm run build
    else
        log_warning "未找到构建脚本，跳过"
    fi
    
    log_success "构建完成"
}

# 更新版本号
update_version() {
    local version=$1
    
    if [ -z "$version" ]; then
        log_error "请指定版本号"
        exit 1
    fi
    
    log_info "更新版本号到 $version..."
    
    # 更新package.json
    if [ -f "package.json" ]; then
        npm version $version --no-git-tag-version
        log_success "package.json已更新"
    fi
    
    # 更新其他文件中的版本号
    # 这里可以添加更多需要更新版本号的文件
}

# 创建Git标签
create_git_tag() {
    local version=$1
    
    log_info "创建Git标签 v$version..."
    
    git tag -a "v$version" -m "Release v$version"
    log_success "Git标签已创建"
}

# 推送到GitHub
push_to_github() {
    log_info "推送到GitHub..."
    
    # 推送当前分支
    git push
    
    # 推送标签
    git push --tags
    
    log_success "已推送到GitHub"
}

# 发布到NPM
publish_to_npm() {
    log_info "发布到NPM..."
    
    if [ -f "package.json" ]; then
        npm publish
        log_success "已发布到NPM"
    else
        log_warning "未找到package.json，跳过NPM发布"
    fi
}

# 创建GitHub Release
create_github_release() {
    local version=$1
    
    log_info "创建GitHub Release..."
    
    # 使用gh命令行工具创建release
    if command -v gh &> /dev/null; then
        gh release create "v$version" \
            --title "HTML PPT v$version" \
            --notes "Release v$version"
        log_success "GitHub Release已创建"
    else
        log_warning "未安装gh命令行工具，跳过"
        log_info "请手动创建GitHub Release: https://github.com/yourname/htmlppt/releases/new"
    fi
}

# 主函数
main() {
    local version=$1
    local skip_tests=${2:-false}
    local skip_lint=${3:-false}
    local publish_npm=${4:-false}
    
    log_info "开始发布流程..."
    log_info "版本号: $version"
    
    # 检查必要的命令
    check_command git
    check_command node
    
    # 检查Git状态
    check_git_status
    
    # 运行测试
    if [ "$skip_tests" = "false" ]; then
        run_tests
    else
        log_warning "跳过测试"
    fi
    
    # 运行代码检查
    if [ "$skip_lint" = "false" ]; then
        run_lint
    else
        log_warning "跳过代码检查"
    fi
    
    # 构建项目
    build_project
    
    # 更新版本号
    if [ -n "$version" ]; then
        update_version $version
    fi
    
    # 提交更改
    log_info "提交更改..."
    git add .
    git commit -m "chore: 发布 v$version"
    
    # 创建Git标签
    if [ -n "$version" ]; then
        create_git_tag $version
    fi
    
    # 推送到GitHub
    push_to_github
    
    # 发布到NPM
    if [ "$publish_npm" = "true" ]; then
        publish_to_npm
    fi
    
    # 创建GitHub Release
    if [ -n "$version" ]; then
        create_github_release $version
    fi
    
    log_success "发布完成！"
    log_info "版本: v$version"
    log_info "GitHub: https://github.com/yourname/htmlppt"
    log_info "NPM: https://www.npmjs.com/package/htmlppt"
}

# 显示帮助信息
show_help() {
    cat << EOF
HTML PPT 发布脚本

用法:
    ./scripts/release.sh [版本号] [选项]

选项:
    --skip-tests      跳过测试
    --skip-lint       跳过代码检查
    --publish-npm     发布到NPM
    --help            显示帮助信息

示例:
    ./scripts/release.sh 1.0.0
    ./scripts/release.sh 1.0.0 --skip-tests
    ./scripts/release.sh 1.0.0 --publish-npm

EOF
}

# 解析参数
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

# 运行主函数
main "$@"
