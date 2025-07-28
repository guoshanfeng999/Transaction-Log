const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 导入模型
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Stock = require('./models/Stock');
const CustomerService = require('./models/CustomerService');

// 备份目录
const backupDir = path.join(__dirname, 'backups');

// 连接数据库
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trading-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB连接成功，准备恢复数据...');
  restoreData();
})
.catch((error) => {
  console.log('MongoDB连接失败，无法恢复数据');
  console.log('错误详情:', error.message);
  process.exit(1);
});

async function restoreData() {
  try {
    // 检查备份目录是否存在
    if (!fs.existsSync(backupDir)) {
      console.log('备份目录不存在，请先运行备份脚本');
      process.exit(1);
    }

    // 获取最新的备份文件
    const files = fs.readdirSync(backupDir);
    const backupFiles = files.filter(file => file.startsWith('backup-summary-'));
    
    if (backupFiles.length === 0) {
      console.log('没有找到备份文件');
      process.exit(1);
    }

    // 按时间排序，获取最新的备份
    backupFiles.sort().reverse();
    const latestBackupFile = backupFiles[0];
    const backupSummary = JSON.parse(
      fs.readFileSync(path.join(backupDir, latestBackupFile), 'utf8')
    );

    console.log(`正在恢复备份: ${latestBackupFile}`);
    console.log(`备份时间: ${backupSummary.timestamp}`);

    // 清空现有数据
    console.log('正在清空现有数据...');
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await Stock.deleteMany({});
    await CustomerService.deleteMany({});
    console.log('现有数据已清空');

    // 恢复用户数据
    if (backupSummary.files.includes('users-backup-')) {
      const userBackupFile = backupSummary.files.find(file => file.startsWith('users-backup-'));
      if (userBackupFile && fs.existsSync(path.join(backupDir, userBackupFile))) {
        console.log('正在恢复用户数据...');
        const userBackup = JSON.parse(
          fs.readFileSync(path.join(backupDir, userBackupFile), 'utf8')
        );
        
        for (const userData of userBackup.data) {
          // 移除MongoDB的_id字段，让MongoDB生成新的
          const { _id, ...userWithoutId } = userData;
          await User.create(userWithoutId);
        }
        console.log(`用户数据恢复完成，共 ${userBackup.data.length} 条记录`);
      }
    }

    // 恢复帖子数据
    if (backupSummary.files.includes('posts-backup-')) {
      const postBackupFile = backupSummary.files.find(file => file.startsWith('posts-backup-'));
      if (postBackupFile && fs.existsSync(path.join(backupDir, postBackupFile))) {
        console.log('正在恢复帖子数据...');
        const postBackup = JSON.parse(
          fs.readFileSync(path.join(backupDir, postBackupFile), 'utf8')
        );
        
        for (const postData of postBackup.data) {
          const { _id, ...postWithoutId } = postData;
          await Post.create(postWithoutId);
        }
        console.log(`帖子数据恢复完成，共 ${postBackup.data.length} 条记录`);
      }
    }

    // 恢复评论数据
    if (backupSummary.files.includes('comments-backup-')) {
      const commentBackupFile = backupSummary.files.find(file => file.startsWith('comments-backup-'));
      if (commentBackupFile && fs.existsSync(path.join(backupDir, commentBackupFile))) {
        console.log('正在恢复评论数据...');
        const commentBackup = JSON.parse(
          fs.readFileSync(path.join(backupDir, commentBackupFile), 'utf8')
        );
        
        for (const commentData of commentBackup.data) {
          const { _id, ...commentWithoutId } = commentData;
          await Comment.create(commentWithoutId);
        }
        console.log(`评论数据恢复完成，共 ${commentBackup.data.length} 条记录`);
      }
    }

    // 恢复股票数据
    if (backupSummary.files.includes('stocks-backup-')) {
      const stockBackupFile = backupSummary.files.find(file => file.startsWith('stocks-backup-'));
      if (stockBackupFile && fs.existsSync(path.join(backupDir, stockBackupFile))) {
        console.log('正在恢复股票数据...');
        const stockBackup = JSON.parse(
          fs.readFileSync(path.join(backupDir, stockBackupFile), 'utf8')
        );
        
        for (const stockData of stockBackup.data) {
          const { _id, ...stockWithoutId } = stockData;
          await Stock.create(stockWithoutId);
        }
        console.log(`股票数据恢复完成，共 ${stockBackup.data.length} 条记录`);
      }
    }

    // 恢复客服数据
    if (backupSummary.files.includes('customer-services-backup-')) {
      const customerServiceBackupFile = backupSummary.files.find(file => file.startsWith('customer-services-backup-'));
      if (customerServiceBackupFile && fs.existsSync(path.join(backupDir, customerServiceBackupFile))) {
        console.log('正在恢复客服数据...');
        const customerServiceBackup = JSON.parse(
          fs.readFileSync(path.join(backupDir, customerServiceBackupFile), 'utf8')
        );
        
        for (const customerServiceData of customerServiceBackup.data) {
          const { _id, ...customerServiceWithoutId } = customerServiceData;
          await CustomerService.create(customerServiceWithoutId);
        }
        console.log(`客服数据恢复完成，共 ${customerServiceBackup.data.length} 条记录`);
      }
    }

    console.log('\n=== 数据恢复完成 ===');
    console.log(`恢复时间: ${new Date().toISOString()}`);
    console.log(`恢复的备份: ${latestBackupFile}`);
    console.log('==================\n');

    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('恢复过程中出现错误:', error);
    mongoose.connection.close();
    process.exit(1);
  }
} 