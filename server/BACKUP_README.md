# 数据备份和恢复说明

## 概述
本项目提供了完整的数据备份和恢复功能，可以将所有MongoDB数据导出为JSON文件，并在需要时恢复数据。

## 功能特点
- 自动备份所有数据模型（用户、帖子、评论、股票、客服）
- 备份文件包含时间戳，便于管理
- 支持完整的数据恢复
- 备份文件存储在 `server/backups/` 目录中

## 使用方法

### 1. 数据备份
在server目录下运行以下命令来备份所有数据：

```bash
npm run backup
```

或者直接运行：
```bash
node backup-data.js
```

备份完成后，会在 `server/backups/` 目录中生成以下文件：
- `users-backup-[时间戳].json` - 用户数据备份
- `posts-backup-[时间戳].json` - 帖子数据备份
- `comments-backup-[时间戳].json` - 评论数据备份
- `stocks-backup-[时间戳].json` - 股票数据备份
- `customer-services-backup-[时间戳].json` - 客服数据备份
- `backup-summary-[时间戳].json` - 备份汇总信息

### 2. 数据恢复
在server目录下运行以下命令来恢复最新的备份数据：

```bash
npm run restore
```

或者直接运行：
```bash
node restore-data.js
```

**注意：恢复操作会清空现有数据，请谨慎操作！**

### 3. 查看备份文件
备份文件存储在 `server/backups/` 目录中，每个备份都包含：
- 备份时间戳
- 数据记录数量
- 完整的数据内容

## 备份文件结构

### 用户数据备份 (users-backup-[时间戳].json)
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "count": 10,
  "data": [
    {
      "username": "user1",
      "email": "user1@example.com",
      "role": "user",
      "profile": {
        "name": "用户名",
        "bio": "用户简介"
      }
    }
  ]
}
```

### 帖子数据备份 (posts-backup-[时间戳].json)
```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "count": 5,
  "data": [
    {
      "title": "帖子标题",
      "content": "帖子内容",
      "type": "trading-log",
      "tags": ["股票", "分析"],
      "author": "用户ID"
    }
  ]
}
```

## 注意事项

1. **数据库连接**：确保MongoDB服务正在运行
2. **权限**：确保有足够的文件系统权限来创建备份目录和文件
3. **存储空间**：备份文件可能较大，确保有足够的磁盘空间
4. **数据安全**：备份文件包含敏感信息，请妥善保管
5. **恢复风险**：恢复操作会覆盖现有数据，请先备份重要数据

## 自动化备份

可以设置定时任务来自动备份数据：

### Windows (使用任务计划程序)
```cmd
schtasks /create /tn "TradingJournalBackup" /tr "cd /d C:\path\to\server && npm run backup" /sc daily /st 02:00
```

### Linux/Mac (使用cron)
```bash
# 编辑crontab
crontab -e

# 添加每日凌晨2点备份
0 2 * * * cd /path/to/server && npm run backup
```

## 故障排除

### 常见问题

1. **MongoDB连接失败**
   - 检查MongoDB服务是否运行
   - 检查连接字符串是否正确

2. **备份目录创建失败**
   - 检查文件系统权限
   - 确保有足够的磁盘空间

3. **恢复数据失败**
   - 检查备份文件是否完整
   - 确保MongoDB服务正在运行

### 日志查看
备份和恢复过程中的详细日志会输出到控制台，包括：
- 连接状态
- 备份/恢复进度
- 错误信息
- 完成统计

## 联系支持
如果遇到问题，请检查：
1. MongoDB服务状态
2. 网络连接
3. 文件系统权限
4. 磁盘空间 