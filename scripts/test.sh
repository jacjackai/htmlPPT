#!/bin/bash

# HTML PPT 测试脚本
# 用于在部署前运行所有测试

echo "🧪 HTML PPT 测试套件"
echo "===================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试计数器
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# 测试函数
run_test() {
    local test_name=$1
    local test_command=$2

    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -n "测试 $TOTAL_TESTS: $test_name ... "

    if eval "$test_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 通过${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}❌ 失败${NC}"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "📁 检查项目结构..."
echo ""

# 检查必要的文件和目录
run_test "项目根目录存在" "[ -d /Users/jack/Project/htmlPPT ]"
run_test "src目录存在" "[ -d /Users/jack/Project/htmlPPT/src ]"
run_test "docs目录存在" "[ -d /Users/jack/Project/htmlPPT/docs ]"
run_test "tests目录存在" "[ -d /Users/jack/Project/htmlPPT/tests ]"
run_test "examples目录存在" "[ -d /Users/jack/Project/htmlPPT/examples ]"
run_test "scripts目录存在" "[ -d /Users/jack/Project/htmlPPT/scripts ]"

echo ""
echo "📄 检查核心文件..."
echo ""

# 检查核心文件
run_test "package.json存在" "[ -f /Users/jack/Project/htmlPPT/package.json ]"
run_test "README.md存在" "[ -f /Users/jack/Project/htmlPPT/README.md ]"
run_test "LICENSE存在" "[ -f /Users/jack/Project/htmlPPT/LICENSE ]"
run_test ".gitignore存在" "[ -f /Users/jack/Project/htmlPPT/.gitignore ]"

echo ""
echo "🎨 检查源文件..."
echo ""

# 检查源文件
run_test "index.html存在" "[ -f /Users/jack/Project/htmlPPT/src/index.html ]"
run_test "styles.css存在" "[ -f /Users/jack/Project/htmlPPT/src/css/styles.css ]"
run_test "app.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/app.js ]"
run_test "main.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/main.js ]"
run_test "slide.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/slide.js ]"
run_test "presentation.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/presentation.js ]"
run_test "storage.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/storage.js ]"
run_test "theme.js存在" "[ -f /Users/jack/Project/htmlPPT/src/js/theme.js ]"

echo ""
echo "📚 检查文档文件..."
echo ""

# 检查文档文件
run_test "CONTRIBUTING.md存在" "[ -f /Users/jack/Project/htmlPPT/CONTRIBUTING.md ]"
run_test "CHANGELOG.md存在" "[ -f /Users/jack/Project/htmlPPT/CHANGELOG.md ]"
run_test "API文档存在" "[ -f /Users/jack/Project/htmlPPT/docs/api.md ]"
run_test "用户指南存在" "[ -f /Users/jack/Project/htmlPPT/docs/user-guide.md ]"

echo ""
echo "🧪 检查测试文件..."
echo ""

# 检查测试文件
run_test "jest.config.js存在" "[ -f /Users/jack/Project/htmlPPT/jest.config.js ]"
run_test "slide.test.js存在" "[ -f /Users/jack/Project/htmlPPT/tests/unit/slide.test.js ]"
run_test "presentation.test.js存在" "[ -f /Users/jack/Project/htmlPPT/tests/unit/presentation.test.js ]"
run_test "storage.test.js存在" "[ -f /Users/jack/Project/htmlPPT/tests/unit/storage.test.js ]"

echo ""
echo "🔧 检查配置文件..."
echo ""

# 检查配置文件
run_test ".eslintrc.js存在" "[ -f /Users/jack/Project/htmlPPT/.eslintrc.js ]"
run_test ".prettierrc存在" "[ -f /Users/jack/Project/htmlPPT/.prettierrc ]"
run_test "webpack.config.js存在" "[ -f /Users/jack/Project/htmlPPT/webpack.config.js ]"
run_test ".babelrc存在" "[ -f /Users/jack/Project/htmlPPT/.babelrc ]"

echo ""
echo "📝 检查JavaScript语法..."
echo ""

# 检查JavaScript语法
cd /Users/jack/Project/htmlPPT
for file in src/js/*.js; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        run_test "$filename 语法检查" "node -c $file"
    fi
done

echo ""
echo "🎯 检查示例文件..."
echo ""

# 检查示例文件
run_test "basic.html存在" "[ -f /Users/jack/Project/htmlPPT/examples/basic.html ]"
run_test "demo.html存在" "[ -f /Users/jack/Project/htmlPPT/examples/demo.html ]"

echo ""
echo "🚀 检查脚本文件..."
echo ""

# 检查脚本文件
run_test "build.js存在" "[ -f /Users/jack/Project/htmlPPT/scripts/build.js ]"
run_test "release.sh存在" "[ -f /Users/jack/Project/htmlPPT/scripts/release.sh ]"

echo ""
echo "📊 检查GitHub配置..."
echo ""

# 检查GitHub配置
run_test "CI workflow存在" "[ -f /Users/jack/Project/htmlPPT/.github/workflows/ci.yml ]"
run_test "Deploy workflow存在" "[ -f /Users/jack/Project/htmlPPT/.github/workflows/deploy.yml ]"
run_test "Bug report模板存在" "[ -f /Users/jack/Project/htmlPPT/.github/ISSUE_TEMPLATE/bug_report.md ]"
run_test "Feature request模板存在" "[ -f /Users/jack/Project/htmlPPT/.github/ISSUE_TEMPLATE/feature_request.md ]"
run_test "Question模板存在" "[ -f /Users/jack/Project/htmlPPT/.github/ISSUE_TEMPLATE/question.md ]"

echo ""
echo "📈 统计信息..."
echo ""

# 统计代码行数
echo "代码统计:"
echo "---------"
if [ -f /Users/jack/Project/htmlPPT/src/js/app.js ]; then
    lines=$(wc -l < /Users/jack/Project/htmlPPT/src/js/app.js)
    echo "app.js: $lines 行"
fi

if [ -f /Users/jack/Project/htmlPPT/src/css/styles.css ]; then
    lines=$(wc -l < /Users/jack/Project/htmlPPT/src/css/styles.css)
    echo "styles.css: $lines 行"
fi

js_files=$(find /Users/jack/Project/htmlPPT/src/js -name "*.js" 2>/dev/null | wc -l)
echo "JavaScript模块: $js_files 个"

echo ""
echo "===================="
echo "📊 测试结果汇总"
echo "===================="
echo -e "总测试数: $TOTAL_TESTS"
echo -e "${GREEN}通过: $PASSED_TESTS${NC}"
echo -e "${RED}失败: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 所有测试通过！项目可以部署！${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}⚠️  有 $FAILED_TESTS 个测试失败，请检查后再部署${NC}"
    exit 1
fi
