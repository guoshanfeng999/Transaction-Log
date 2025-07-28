# 美股投资分析平台 - Render部署脚本 (Windows PowerShell版本)
# 使用方法: .\deploy-to-render.ps1

Write-Host "🚀 开始部署美股投资分析平台到Render..." -ForegroundColor Green

# 检查是否安装了必要的工具
function Check-Dependencies {
    Write-Host "📋 检查依赖..." -ForegroundColor Yellow
    
    if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Git未安装，请先安装Git" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js未安装，请先安装Node.js" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 依赖检查完成" -ForegroundColor Green
}

# 检查项目结构
function Check-ProjectStructure {
    Write-Host "📁 检查项目结构..." -ForegroundColor Yellow
    
    if (-not (Test-Path "package.json")) {
        Write-Host "❌ 根目录缺少package.json" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Test-Path "client/package.json")) {
        Write-Host "❌ client目录缺少package.json" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Test-Path "server/package.json")) {
        Write-Host "❌ server目录缺少package.json" -ForegroundColor Red
        exit 1
    }
    
    if (-not (Test-Path "render.yaml")) {
        Write-Host "❌ 缺少render.yaml配置文件" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 项目结构检查完成" -ForegroundColor Green
}

# 安装依赖
function Install-Dependencies {
    Write-Host "📦 安装依赖..." -ForegroundColor Yellow
    
    Write-Host "安装根目录依赖..." -ForegroundColor Cyan
    npm install
    
    Write-Host "安装客户端依赖..." -ForegroundColor Cyan
    Set-Location client
    npm install
    Set-Location ..
    
    Write-Host "安装服务器依赖..." -ForegroundColor Cyan
    Set-Location server
    npm install
    Set-Location ..
    
    Write-Host "✅ 依赖安装完成" -ForegroundColor Green
}

# 构建项目
function Build-Project {
    Write-Host "🔨 构建项目..." -ForegroundColor Yellow
    
    Write-Host "构建客户端..." -ForegroundColor Cyan
    Set-Location client
    npm run build
    Set-Location ..
    
    Write-Host "✅ 构建完成" -ForegroundColor Green
}

# 检查Git状态
function Check-GitStatus {
    Write-Host "🔍 检查Git状态..." -ForegroundColor Yellow
    
    if (-not (Test-Path ".git")) {
        Write-Host "❌ 当前目录不是Git仓库" -ForegroundColor Red
        Write-Host "请先初始化Git仓库: git init" -ForegroundColor Yellow
        exit 1
    }
    
    # 检查是否有未提交的更改
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "⚠️  发现未提交的更改" -ForegroundColor Yellow
        Write-Host "请先提交更改:" -ForegroundColor Cyan
        Write-Host "  git add ." -ForegroundColor White
        Write-Host "  git commit -m '准备部署到Render'" -ForegroundColor White
        exit 1
    }
    
    Write-Host "✅ Git状态检查完成" -ForegroundColor Green
}

# 显示部署说明
function Show-DeploymentInstructions {
    Write-Host ""
    Write-Host "🎯 部署说明" -ForegroundColor Green
    Write-Host "================" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. 确保代码已推送到GitHub仓库" -ForegroundColor White
    Write-Host "2. 登录 https://render.com" -ForegroundColor White
    Write-Host "3. 点击 'New' → 'Blueprint'" -ForegroundColor White
    Write-Host "4. 连接您的GitHub仓库" -ForegroundColor White
    Write-Host "5. Render会自动识别render.yaml并创建服务" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 环境变量配置" -ForegroundColor Green
    Write-Host "================" -ForegroundColor Green
    Write-Host ""
    Write-Host "后端服务环境变量:" -ForegroundColor Yellow
    Write-Host "  NODE_ENV=production" -ForegroundColor White
    Write-Host "  PORT=10000" -ForegroundColor White
    Write-Host "  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trading-journal" -ForegroundColor White
    Write-Host "  JWT_SECRET=your-secret-key-here" -ForegroundColor White
    Write-Host "  CORS_ORIGIN=https://your-frontend-url.onrender.com" -ForegroundColor White
    Write-Host ""
    Write-Host "前端服务环境变量:" -ForegroundColor Yellow
    Write-Host "  REACT_APP_API_URL=https://your-api-url.onrender.com" -ForegroundColor White
    Write-Host "  REACT_APP_SOCKET_URL=https://your-api-url.onrender.com" -ForegroundColor White
    Write-Host ""
    Write-Host "📚 详细说明请查看 DEPLOYMENT.md" -ForegroundColor Cyan
    Write-Host ""
}

# 主函数
function Main {
    Write-Host "美股投资分析平台 - Render部署脚本" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    
    Check-Dependencies
    Check-ProjectStructure
    Install-Dependencies
    Build-Project
    Check-GitStatus
    
    Write-Host ""
    Write-Host "✅ 所有检查完成！" -ForegroundColor Green
    Write-Host ""
    
    Show-DeploymentInstructions
}

# 运行主函数
Main 