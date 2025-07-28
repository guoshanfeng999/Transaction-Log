#!/bin/bash

# 美股投资分析平台 - Render部署脚本
# 使用方法: ./deploy-to-render.sh

echo "🚀 开始部署美股投资分析平台到Render..."

# 检查是否安装了必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    if ! command -v git &> /dev/null; then
        echo "❌ Git未安装，请先安装Git"
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js未安装，请先安装Node.js"
        exit 1
    fi
    
    echo "✅ 依赖检查完成"
}

# 检查项目结构
check_project_structure() {
    echo "📁 检查项目结构..."
    
    if [ ! -f "package.json" ]; then
        echo "❌ 根目录缺少package.json"
        exit 1
    fi
    
    if [ ! -f "client/package.json" ]; then
        echo "❌ client目录缺少package.json"
        exit 1
    fi
    
    if [ ! -f "server/package.json" ]; then
        echo "❌ server目录缺少package.json"
        exit 1
    fi
    
    if [ ! -f "render.yaml" ]; then
        echo "❌ 缺少render.yaml配置文件"
        exit 1
    fi
    
    echo "✅ 项目结构检查完成"
}

# 安装依赖
install_dependencies() {
    echo "📦 安装依赖..."
    
    echo "安装根目录依赖..."
    npm install
    
    echo "安装客户端依赖..."
    cd client && npm install && cd ..
    
    echo "安装服务器依赖..."
    cd server && npm install && cd ..
    
    echo "✅ 依赖安装完成"
}

# 构建项目
build_project() {
    echo "🔨 构建项目..."
    
    echo "构建客户端..."
    cd client && npm run build && cd ..
    
    echo "✅ 构建完成"
}

# 检查Git状态
check_git_status() {
    echo "🔍 检查Git状态..."
    
    if [ ! -d ".git" ]; then
        echo "❌ 当前目录不是Git仓库"
        echo "请先初始化Git仓库: git init"
        exit 1
    fi
    
    # 检查是否有未提交的更改
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  发现未提交的更改"
        echo "请先提交更改:"
        echo "  git add ."
        echo "  git commit -m '准备部署到Render'"
        exit 1
    fi
    
    echo "✅ Git状态检查完成"
}

# 显示部署说明
show_deployment_instructions() {
    echo ""
    echo "🎯 部署说明"
    echo "================"
    echo ""
    echo "1. 确保代码已推送到GitHub仓库"
    echo "2. 登录 https://render.com"
    echo "3. 点击 'New' → 'Blueprint'"
    echo "4. 连接您的GitHub仓库"
    echo "5. Render会自动识别render.yaml并创建服务"
    echo ""
    echo "📝 环境变量配置"
    echo "================"
    echo ""
    echo "后端服务环境变量:"
    echo "  NODE_ENV=production"
    echo "  PORT=10000"
    echo "  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trading-journal"
    echo "  JWT_SECRET=your-secret-key-here"
    echo "  CORS_ORIGIN=https://your-frontend-url.onrender.com"
    echo ""
    echo "前端服务环境变量:"
    echo "  REACT_APP_API_URL=https://your-api-url.onrender.com"
    echo "  REACT_APP_SOCKET_URL=https://your-api-url.onrender.com"
    echo ""
    echo "📚 详细说明请查看 DEPLOYMENT.md"
    echo ""
}

# 主函数
main() {
    echo "美股投资分析平台 - Render部署脚本"
    echo "=================================="
    echo ""
    
    check_dependencies
    check_project_structure
    install_dependencies
    build_project
    check_git_status
    
    echo ""
    echo "✅ 所有检查完成！"
    echo ""
    
    show_deployment_instructions
}

# 运行主函数
main 