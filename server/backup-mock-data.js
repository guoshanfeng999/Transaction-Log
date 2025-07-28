const fs = require('fs');
const path = require('path');

// 创建备份目录
const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// 模拟数据
const mockData = {
  users: [
    {
      username: "analyst001",
      email: "analyst@tradingjournal.com",
      role: "analyst",
      profile: {
        name: "专业股票分析师",
        bio: "15年美股市场经验，为您提供专业的美股投资分析和交易指导",
        experience: "15",
        certifications: ["CFA", "FRM", "MBA"],
        achievements: ["年度最佳分析师", "连续5年正收益", "管理资产超过1亿美元"]
      },
      followers: [],
      following: [],
      createdAt: new Date().toISOString()
    },
    {
      username: "trader001",
      email: "trader@example.com",
      role: "user",
      profile: {
        name: "活跃交易者",
        bio: "专注于科技股和成长股投资",
        experience: "5",
        certifications: ["证券从业资格"],
        achievements: ["个人投资组合年化收益25%"]
      },
      followers: [],
      following: [],
      createdAt: new Date().toISOString()
    }
  ],
  
  posts: [
    {
      title: "今日市场分析：科技股强势反弹",
      content: "今日美股市场科技股表现强劲，纳斯达克指数上涨2.5%。重点关注苹果、微软等科技巨头...",
      type: "analysis",
      tags: ["市场分析", "科技股", "纳斯达克"],
      stockCodes: ["AAPL", "MSFT", "GOOGL"],
      images: [],
      video: "",
      likes: [],
      shares: [],
      comments: [],
      views: 156,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      title: "交易日志：买入特斯拉股票",
      content: "今日以$250的价格买入特斯拉股票100股，看好其电动汽车市场前景...",
      type: "trading-log",
      tags: ["交易日志", "特斯拉", "电动汽车"],
      stockCodes: ["TSLA"],
      images: [],
      video: "",
      likes: [],
      shares: [],
      comments: [],
      views: 89,
      isPublished: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  
  comments: [
    {
      content: "分析很到位，我也看好科技股的前景",
      author: "trader001",
      post: "post1",
      likes: [],
      createdAt: new Date().toISOString()
    },
    {
      content: "特斯拉确实有很好的增长潜力",
      author: "analyst001",
      post: "post2",
      likes: [],
      createdAt: new Date().toISOString()
    }
  ],
  
  stocks: [
    {
      code: "AAPL",
      name: "Apple Inc.",
      currentPrice: 175.50,
      changePercent: 2.15,
      volume: 45678900,
      marketCap: 2750000000000,
      pe: 28.5,
      sector: "Technology",
      description: "苹果公司是全球领先的科技公司，专注于设计、开发和销售消费电子产品、计算机软件和在线服务。",
      createdAt: new Date().toISOString()
    },
    {
      code: "TSLA",
      name: "Tesla, Inc.",
      currentPrice: 250.80,
      changePercent: 3.45,
      volume: 23456700,
      marketCap: 800000000000,
      pe: 45.2,
      sector: "Automotive",
      description: "特斯拉是一家电动汽车和清洁能源公司，专注于电动汽车、能源存储和太阳能板的设计、开发、制造、销售和租赁。",
      createdAt: new Date().toISOString()
    },
    {
      code: "MSFT",
      name: "Microsoft Corporation",
      currentPrice: 380.25,
      changePercent: 1.85,
      volume: 34567800,
      marketCap: 2850000000000,
      pe: 32.1,
      sector: "Technology",
      description: "微软是一家跨国科技公司，开发、制造、许可、支持和销售计算机软件、消费电子产品、个人计算机和相关服务。",
      createdAt: new Date().toISOString()
    }
  ],
  
  customerServices: [
    {
      user: "trader001",
      subject: "如何开始股票投资？",
      message: "我是新手，想了解如何开始股票投资，有什么建议吗？",
      status: "open",
      priority: "medium",
      category: "investment",
      createdAt: new Date().toISOString()
    },
    {
      user: "analyst001",
      subject: "平台功能咨询",
      message: "请问平台支持实时股票数据吗？",
      status: "resolved",
      priority: "low",
      category: "platform",
      createdAt: new Date().toISOString()
    }
  ]
};

async function backupMockData() {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    console.log('正在备份模拟数据...');
    
    // 备份用户数据
    const usersBackup = {
      timestamp: new Date().toISOString(),
      count: mockData.users.length,
      data: mockData.users
    };
    fs.writeFileSync(
      path.join(backupDir, `users-backup-${timestamp}.json`),
      JSON.stringify(usersBackup, null, 2)
    );
    console.log(`用户数据备份完成，共 ${mockData.users.length} 条记录`);

    // 备份帖子数据
    const postsBackup = {
      timestamp: new Date().toISOString(),
      count: mockData.posts.length,
      data: mockData.posts
    };
    fs.writeFileSync(
      path.join(backupDir, `posts-backup-${timestamp}.json`),
      JSON.stringify(postsBackup, null, 2)
    );
    console.log(`帖子数据备份完成，共 ${mockData.posts.length} 条记录`);

    // 备份评论数据
    const commentsBackup = {
      timestamp: new Date().toISOString(),
      count: mockData.comments.length,
      data: mockData.comments
    };
    fs.writeFileSync(
      path.join(backupDir, `comments-backup-${timestamp}.json`),
      JSON.stringify(commentsBackup, null, 2)
    );
    console.log(`评论数据备份完成，共 ${mockData.comments.length} 条记录`);

    // 备份股票数据
    const stocksBackup = {
      timestamp: new Date().toISOString(),
      count: mockData.stocks.length,
      data: mockData.stocks
    };
    fs.writeFileSync(
      path.join(backupDir, `stocks-backup-${timestamp}.json`),
      JSON.stringify(stocksBackup, null, 2)
    );
    console.log(`股票数据备份完成，共 ${mockData.stocks.length} 条记录`);

    // 备份客服数据
    const customerServicesBackup = {
      timestamp: new Date().toISOString(),
      count: mockData.customerServices.length,
      data: mockData.customerServices
    };
    fs.writeFileSync(
      path.join(backupDir, `customer-services-backup-${timestamp}.json`),
      JSON.stringify(customerServicesBackup, null, 2)
    );
    console.log(`客服数据备份完成，共 ${mockData.customerServices.length} 条记录`);

    // 创建汇总备份文件
    const summaryBackup = {
      timestamp: new Date().toISOString(),
      summary: {
        users: mockData.users.length,
        posts: mockData.posts.length,
        comments: mockData.comments.length,
        stocks: mockData.stocks.length,
        customerServices: mockData.customerServices.length
      },
      files: [
        `users-backup-${timestamp}.json`,
        `posts-backup-${timestamp}.json`,
        `comments-backup-${timestamp}.json`,
        `stocks-backup-${timestamp}.json`,
        `customer-services-backup-${timestamp}.json`
      ],
      note: "这是模拟数据备份，包含示例用户、帖子、评论、股票和客服数据"
    };

    fs.writeFileSync(
      path.join(backupDir, `backup-summary-${timestamp}.json`),
      JSON.stringify(summaryBackup, null, 2)
    );

    console.log('\n=== 模拟数据备份完成 ===');
    console.log(`备份时间: ${new Date().toISOString()}`);
    console.log(`备份目录: ${backupDir}`);
    console.log(`用户数据: ${mockData.users.length} 条`);
    console.log(`帖子数据: ${mockData.posts.length} 条`);
    console.log(`评论数据: ${mockData.comments.length} 条`);
    console.log(`股票数据: ${mockData.stocks.length} 条`);
    console.log(`客服数据: ${mockData.customerServices.length} 条`);
    console.log('==================\n');

  } catch (error) {
    console.error('备份过程中出现错误:', error);
    process.exit(1);
  }
}

// 运行备份
backupMockData(); 