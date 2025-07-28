# 美股投资分析平台 - Render部署指南

## 项目概述
这是一个专业的美股投资分析平台，包含前端React应用和后端Node.js API服务。

## 部署架构
- **前端**: React静态应用 (部署到Render Static Site)
- **后端**: Node.js Express API (部署到Render Web Service)
- **数据库**: MongoDB Atlas (云数据库)

## 部署步骤

### 1. 准备数据库
1. 注册 [MongoDB Atlas](https://www.mongodb.com/atlas) 账户
2. 创建新的集群
3. 获取连接字符串
4. 设置数据库用户和密码

### 2. 部署后端API服务

#### 在Render上创建Web Service:
1. 登录 [Render](https://render.com)
2. 点击 "New" → "Web Service"
3. 连接GitHub仓库
4. 配置设置:
   - **Name**: `trading-journal-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

#### 环境变量配置:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/trading-journal
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

### 3. 部署前端应用

#### 在Render上创建Static Site:
1. 点击 "New" → "Static Site"
2. 连接GitHub仓库
3. 配置设置:
   - **Name**: `trading-journal-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Plan**: Free

#### 环境变量配置:
```
REACT_APP_API_URL=https://your-api-url.onrender.com
REACT_APP_SOCKET_URL=https://your-api-url.onrender.com
```

### 4. 使用render.yaml自动部署

项目根目录已包含 `render.yaml` 配置文件，可以自动创建两个服务：

1. 上传代码到GitHub
2. 在Render中导入GitHub仓库
3. Render会自动识别 `render.yaml` 并创建服务

## 环境变量说明

### 后端环境变量
- `NODE_ENV`: 运行环境 (production/development)
- `PORT`: 服务器端口
- `MONGODB_URI`: MongoDB连接字符串
- `JWT_SECRET`: JWT签名密钥
- `CORS_ORIGIN`: 允许跨域的前端URL

### 前端环境变量
- `REACT_APP_API_URL`: 后端API地址
- `REACT_APP_SOCKET_URL`: WebSocket连接地址

## 部署后配置

### 1. 更新CORS设置
部署完成后，需要更新后端的环境变量 `CORS_ORIGIN` 为实际的前端URL。

### 2. 数据库初始化
首次部署后，系统会自动创建必要的数据库集合。

### 3. 测试功能
- 用户注册/登录
- 股票数据获取
- 实时价格更新
- 帖子发布和评论

## 故障排除

### 常见问题

1. **构建失败**
   - 检查Node.js版本 (需要 >= 18.0.0)
   - 确认所有依赖都已安装

2. **API连接失败**
   - 检查环境变量配置
   - 确认MongoDB连接字符串正确
   - 检查CORS设置

3. **前端无法连接后端**
   - 确认 `REACT_APP_API_URL` 环境变量正确
   - 检查后端服务是否正常运行

### 日志查看
在Render控制台中可以查看实时日志，帮助诊断问题。

## 性能优化

1. **启用缓存**: 在Render控制台中启用静态资源缓存
2. **CDN**: 使用Cloudflare等CDN服务
3. **数据库索引**: 为常用查询字段创建索引

## 安全注意事项

1. **环境变量**: 不要在代码中硬编码敏感信息
2. **JWT密钥**: 使用强随机字符串作为JWT密钥
3. **CORS**: 只允许必要的域名进行跨域请求
4. **输入验证**: 确保所有用户输入都经过验证

## 监控和维护

1. **健康检查**: 定期检查服务状态
2. **日志监控**: 关注错误日志
3. **性能监控**: 监控响应时间和资源使用
4. **备份**: 定期备份数据库数据

## 联系支持

如果遇到部署问题，请检查：
1. Render官方文档
2. 项目GitHub Issues
3. 相关技术社区 