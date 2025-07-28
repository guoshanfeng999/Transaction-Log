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

// 创建备份目录
const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// 连接数据库
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trading-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB连接成功，开始备份数据...');
  backupAllData();
})
.catch((error) => {
  console.log('MongoDB连接失败，无法备份数据');
  console.log('错误详情:', error.message);
  process.exit(1);
});

async function backupAllData() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // 备份用户数据
    console.log('正在备份用户数据...');
    const users = await User.find({}).lean();
    const usersBackup = {
      timestamp: new Date().toISOString(),
      count: users.length,
      data: users
    };
    fs.writeFileSync(
      path.join(backupDir, `users-backup-${timestamp}.json`),
      JSON.stringify(usersBackup, null, 2)
    );
    console.log(`用户数据备份完成，共 ${users.length} 条记录`);

    // 备份帖子数据
    console.log('正在备份帖子数据...');
    const posts = await Post.find({}).populate('author').lean();
    const postsBackup = {
      timestamp: new Date().toISOString(),
      count: posts.length,
      data: posts
    };
    fs.writeFileSync(
      path.join(backupDir, `posts-backup-${timestamp}.json`),
      JSON.stringify(postsBackup, null, 2)
    );
    console.log(`帖子数据备份完成，共 ${posts.length} 条记录`);

    // 备份评论数据
    console.log('正在备份评论数据...');
    const comments = await Comment.find({}).populate('author').lean();
    const commentsBackup = {
      timestamp: new Date().toISOString(),
      count: comments.length,
      data: comments
    };
    fs.writeFileSync(
      path.join(backupDir, `comments-backup-${timestamp}.json`),
      JSON.stringify(commentsBackup, null, 2)
    );
    console.log(`评论数据备份完成，共 ${comments.length} 条记录`);

    // 备份股票数据
    console.log('正在备份股票数据...');
    const stocks = await Stock.find({}).lean();
    const stocksBackup = {
      timestamp: new Date().toISOString(),
      count: stocks.length,
      data: stocks
    };
    fs.writeFileSync(
      path.join(backupDir, `stocks-backup-${timestamp}.json`),
      JSON.stringify(stocksBackup, null, 2)
    );
    console.log(`股票数据备份完成，共 ${stocks.length} 条记录`);

    // 备份客服数据
    console.log('正在备份客服数据...');
    const customerServices = await CustomerService.find({}).populate('user').lean();
    const customerServicesBackup = {
      timestamp: new Date().toISOString(),
      count: customerServices.length,
      data: customerServices
    };
    fs.writeFileSync(
      path.join(backupDir, `customer-services-backup-${timestamp}.json`),
      JSON.stringify(customerServicesBackup, null, 2)
    );
    console.log(`客服数据备份完成，共 ${customerServices.length} 条记录`);

    // 创建汇总备份文件
    const summaryBackup = {
      timestamp: new Date().toISOString(),
      summary: {
        users: users.length,
        posts: posts.length,
        comments: comments.length,
        stocks: stocks.length,
        customerServices: customerServices.length
      },
      files: [
        `users-backup-${timestamp}.json`,
        `posts-backup-${timestamp}.json`,
        `comments-backup-${timestamp}.json`,
        `stocks-backup-${timestamp}.json`,
        `customer-services-backup-${timestamp}.json`
      ]
    };

    fs.writeFileSync(
      path.join(backupDir, `backup-summary-${timestamp}.json`),
      JSON.stringify(summaryBackup, null, 2)
    );

    console.log('\n=== 数据备份完成 ===');
    console.log(`备份时间: ${new Date().toISOString()}`);
    console.log(`备份目录: ${backupDir}`);
    console.log(`用户数据: ${users.length} 条`);
    console.log(`帖子数据: ${posts.length} 条`);
    console.log(`评论数据: ${comments.length} 条`);
    console.log(`股票数据: ${stocks.length} 条`);
    console.log(`客服数据: ${customerServices.length} 条`);
    console.log('==================\n');

    mongoose.connection.close();
    process.exit(0);

  } catch (error) {
    console.error('备份过程中出现错误:', error);
    mongoose.connection.close();
    process.exit(1);
  }
} 