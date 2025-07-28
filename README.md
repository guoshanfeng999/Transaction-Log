# 美股投资分析平台

一个专业的美股投资分析平台，提供实时股票数据、技术分析、交易日志和社区交流功能。

## 🚀 快速部署到Render

### 方法一：使用Blueprint（推荐）

1. **准备代码**
   ```bash
   # 确保代码已推送到GitHub仓库
   git add .
   git commit -m "准备部署到Render"
   git push origin main
   ```

2. **在Render上部署**
   - 登录 [Render](https://render.com)
   - 点击 "New" → "Blueprint"
   - 连接您的GitHub仓库
   - Render会自动识别 `render.yaml` 并创建两个服务

3. **配置环境变量**
   - 后端服务：设置MongoDB连接字符串和JWT密钥
   - 前端服务：设置API地址

### 方法二：手动部署

详细步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🏗️ 项目架构

```
gupiao/
├── client/                 # React前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── pages/         # 页面组件
│   │   ├── contexts/      # React Context
│   │   └── utils/         # 工具函数
│   └── public/            # 静态资源
├── server/                # Node.js后端API
│   ├── routes/            # API路由
│   ├── models/            # 数据模型
│   └── index.js           # 服务器入口
├── render.yaml            # Render部署配置
└── package.json           # 项目配置
```

## 🛠️ 技术栈

### 前端
- **React 18** - 用户界面框架
- **React Router** - 路由管理
- **Tailwind CSS** - 样式框架
- **Recharts** - 图表库
- **Socket.io Client** - 实时通信
- **React Icons** - 图标库

### 后端
- **Node.js** - 运行环境
- **Express.js** - Web框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **Socket.io** - 实时通信
- **JWT** - 身份认证
- **bcryptjs** - 密码加密

## 📋 功能特性

### 🎯 核心功能
- **实时股票数据** - 获取美股实时价格和走势
- **技术分析** - 提供专业的技术分析工具
- **交易日志** - 记录和管理交易历史
- **社区交流** - 用户分享和讨论
- **专业分析** - 资深分析师观点

### 📊 数据展示
- 热门股票排行
- 涨幅榜/跌幅榜
- 板块分析
- 实时价格图表
- 交易量分析

### 👥 用户系统
- 用户注册/登录
- 个人资料管理
- 交易记录追踪
- 收藏股票功能

## 🚀 本地开发

### 环境要求
- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB (可选，支持模拟数据)

### 安装依赖
```bash
# 安装所有依赖
npm run install-all

# 或者分别安装
npm install
cd server && npm install
cd ../client && npm install
```

### 启动开发服务器
```bash
# 同时启动前端和后端
npm run dev

# 或者分别启动
npm run server  # 后端 (端口 5001)
npm run client  # 前端 (端口 3000)
```

### 构建生产版本
```bash
npm run build
```

## 🌐 部署配置

### 环境变量

#### 后端环境变量
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trading-journal
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

#### 前端环境变量
```env
REACT_APP_API_URL=https://your-api-url.onrender.com
REACT_APP_SOCKET_URL=https://your-api-url.onrender.com
```

## 📱 页面结构

- **首页** - 平台概览和热门内容
- **股票分析** - 详细股票信息和图表
- **交易日志** - 个人交易记录
- **市场分析** - 市场趋势和新闻
- **社区** - 用户交流和分享
- **个人中心** - 用户资料和设置

## 🔧 开发指南

### 添加新功能
1. 在 `client/src/pages/` 创建新页面
2. 在 `client/src/components/` 创建组件
3. 在 `server/routes/` 添加API路由
4. 在 `server/models/` 定义数据模型

### 代码规范
- 使用ES6+语法
- 遵循React Hooks最佳实践
- 使用Tailwind CSS进行样式设计
- 保持代码注释清晰

## 🐛 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本
   - 清除node_modules重新安装

2. **API连接失败**
   - 检查环境变量配置
   - 确认MongoDB连接

3. **实时数据不更新**
   - 检查Socket.io连接
   - 确认网络连接

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📞 支持

如有问题，请查看：
- [部署文档](./DEPLOYMENT.md)
- [Render官方文档](https://render.com/docs)
- [项目Issues](../../issues) 