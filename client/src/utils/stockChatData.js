// 股票交流模拟数据生成器
class StockChatDataGenerator {
  constructor() {
    this.users = [
      { 
        name: 'Michael Chen', 
        title: 'Senior Analyst', 
        avatar: 'MC', 
        color: 'bg-blue-500',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Sarah Johnson', 
        title: 'Technical Analyst', 
        avatar: 'SJ', 
        color: 'bg-green-500',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'David Rodriguez', 
        title: 'Investment Advisor', 
        avatar: 'DR', 
        color: 'bg-purple-500',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Jennifer Williams', 
        title: 'Day Trader', 
        avatar: 'JW', 
        color: 'bg-orange-500',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Robert Thompson', 
        title: 'Strategy Analyst', 
        avatar: 'RT', 
        color: 'bg-red-500',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Emily Davis', 
        title: 'Fundamental Analyst', 
        avatar: 'ED', 
        color: 'bg-indigo-500',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'James Wilson', 
        title: 'Quantitative Analyst', 
        avatar: 'JW', 
        color: 'bg-teal-500',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Lisa Anderson', 
        title: 'Swing Trader', 
        avatar: 'LA', 
        color: 'bg-pink-500',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Kevin Martinez', 
        title: 'Sector Researcher', 
        avatar: 'KM', 
        color: 'bg-yellow-500',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Amanda Taylor', 
        title: 'Macro Analyst', 
        avatar: 'AT', 
        color: 'bg-gray-500',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Christopher Brown', 
        title: 'Value Investor', 
        avatar: 'CB', 
        color: 'bg-blue-600',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Rachel Garcia', 
        title: 'Options Trader', 
        avatar: 'RG', 
        color: 'bg-green-600',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Daniel Lee', 
        title: 'Technical Analyst', 
        avatar: 'DL', 
        color: 'bg-purple-600',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Jessica Moore', 
        title: 'Growth Investor', 
        avatar: 'JM', 
        color: 'bg-orange-600',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Andrew Jackson', 
        title: 'Hedge Fund Manager', 
        avatar: 'AJ', 
        color: 'bg-red-600',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Nicole White', 
        title: 'AI Industry Expert', 
        avatar: 'NW', 
        color: 'bg-cyan-500',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Ryan Clark', 
        title: 'Clean Energy Analyst', 
        avatar: 'RC', 
        color: 'bg-emerald-500',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Stephanie Lewis', 
        title: 'Healthcare Specialist', 
        avatar: 'SL', 
        color: 'bg-rose-500',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Mark Hall', 
        title: 'Futures Trader', 
        avatar: 'MH', 
        color: 'bg-violet-500',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Ashley Young', 
        title: 'Consumer Analyst', 
        avatar: 'AY', 
        color: 'bg-amber-500',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Brandon Scott', 
        title: 'Crypto Analyst', 
        avatar: 'BS', 
        color: 'bg-slate-500',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Megan King', 
        title: 'Biotech Researcher', 
        avatar: 'MK', 
        color: 'bg-lime-500',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Tyler Adams', 
        title: 'Fintech Expert', 
        avatar: 'TA', 
        color: 'bg-sky-500',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Lauren Baker', 
        title: 'ESG Analyst', 
        avatar: 'LB', 
        color: 'bg-green-400',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
      },
      { 
        name: 'Jordan Mitchell', 
        title: 'Retail Investor', 
        avatar: 'JM', 
        color: 'bg-orange-400',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
      }
    ];

    this.stocks = [
      'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'CRM',
      'ADBE', 'PYPL', 'INTC', 'ORCL', 'CSCO', 'IBM', 'QCOM', 'AVGO', 'TXN', 'MU',
      'AMD', 'NVDA', 'TSLA', 'NIO', 'XPEV', 'LI', 'RIVN', 'LCID', 'FSR', 'WKHS',
      'SPY', 'QQQ', 'IWM', 'DIA', 'VTI', 'VEA', 'VWO', 'BND', 'GLD', 'SLV',
      'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'USB', 'PNC', 'TFC', 'COF',
      'JNJ', 'PFE', 'UNH', 'ABBV', 'MRK', 'TMO', 'ABT', 'DHR', 'BMY', 'AMGN',
      'XOM', 'CVX', 'COP', 'EOG', 'SLB', 'PSX', 'VLO', 'MPC', 'HAL', 'BKR'
    ];

    this.topics = [
      '技术分析', '基本面分析', '市场情绪', '宏观经济', '行业趋势', '财报分析',
      '政策影响', '资金流向', '技术指标', '支撑阻力', '趋势分析', '风险控制',
      'AI概念', '新能源', '医疗健康', '消费升级', '金融科技', '芯片半导体',
      '云计算', '大数据', '物联网', '区块链', '元宇宙', '自动驾驶'
    ];

    this.messageTemplates = {
      technical: [
        '{stock}突破{price}美元阻力位，技术面看涨，建议关注',
        '{stock}形成双底形态，反弹概率较大',
        '{stock}MACD金叉，短期有望上涨',
        '{stock}RSI超卖，存在反弹机会',
        '{stock}成交量放大，突破确认有效',
        '{stock}均线多头排列，趋势向好',
        '{stock}布林带收窄，即将选择方向',
        '{stock}KDJ指标显示超买，注意回调风险',
        '{stock}在{price}美元附近形成支撑，可考虑逢低买入',
        '{stock}突破下降趋势线，反转信号明显',
        '{stock}量价配合良好，上涨动能充足',
        '{stock}技术指标背离，需警惕回调',
        '{stock}形成头肩底形态，中期看涨',
        '{stock}突破前期高点，创历史新高',
        '{stock}回调至关键支撑位，反弹在即',
        '{stock}技术面改善，有望突破盘整区间'
      ],
      fundamental: [
        '{stock}财报超预期，营收增长{percent}%，股价有望继续上涨',
        '{stock}新产品发布，市场反应积极',
        '{stock}市场份额扩大，竞争优势明显',
        '{stock}成本控制良好，利润率提升',
        '{stock}管理层变动，战略调整利好',
        '{stock}行业地位稳固，护城河深厚',
        '{stock}现金流充裕，分红潜力大',
        '{stock}研发投入加大，长期竞争力增强',
        '{stock}海外业务扩张，增长潜力巨大',
        '{stock}并购重组完成，协同效应显现',
        '{stock}行业政策利好，发展前景广阔',
        '{stock}客户粘性高，商业模式优秀',
        '{stock}资产负债表健康，财务风险低',
        '{stock}估值处于历史低位，投资价值凸显',
        '{stock}行业龙头地位，定价能力强',
        '{stock}技术壁垒高，竞争对手难以追赶',
        '{stock}品牌价值提升，消费者认可度高'
      ],
      market: [
        '市场情绪转好，建议关注{category}的投资机会',
        '资金流向{category}，板块轮动明显',
        '{category}估值合理，配置价值凸显',
        '政策利好{category}，长期看好',
        '机构增持{category}，信心增强',
        '{category}技术面改善，反弹可期',
        '市场风格切换，{category}受益',
        '{category}基本面稳健，防御性配置',
        '{category}业绩超预期，板块整体走强',
        '外资持续流入{category}，看好中国资产',
        '{category}估值修复行情启动',
        '市场风险偏好提升，{category}弹性较大',
        '{category}行业景气度回升',
        '政策支持力度加大，{category}受益明显',
        '{category}技术突破，应用前景广阔',
        '消费升级趋势下，{category}需求增长'
      ],
      macro: [
        '美联储会议纪要公布，市场预期降息，{category}受益',
        '通胀数据低于预期，市场对降息预期升温，利好{category}',
        '就业数据强劲，经济复苏信号明确',
        'GDP增长超预期，市场信心恢复',
        '贸易数据改善，出口相关股票受益',
        '美元指数走弱，新兴市场资产受益',
        '油价波动，能源股表现分化',
        '地缘政治风险缓解，市场风险偏好提升',
        '央行政策宽松，流动性充裕',
        '经济数据向好，企业盈利预期上调',
        '财政政策发力，基建相关板块受益',
        '货币政策转向，成长股估值修复',
        '汇率稳定，外资流入增加',
        '经济结构优化，新经济板块崛起',
        '供给侧改革深化，传统行业整合',
        '创新驱动发展，科技股长期看好'
      ],
      news: [
        '{stock}宣布重大合作，股价大涨',
        '{stock}获得重要订单，业绩预期上调',
        '{stock}管理层增持，信心信号强烈',
        '{stock}分析师评级上调，目标价{price}美元',
        '{stock}新产品获得市场认可',
        '{stock}海外业务扩张，增长潜力大',
        '{stock}成本优化措施见效',
        '{stock}行业政策利好，发展前景广阔',
        '{stock}技术突破，竞争优势增强',
        '{stock}市场份额提升，行业地位巩固',
        '{stock}获得专利授权，技术壁垒提高',
        '{stock}供应链优化，成本控制改善',
        '{stock}客户满意度提升，品牌价值增长',
        '{stock}环保认证通过，可持续发展',
        '{stock}数字化转型成功，效率提升',
        '{stock}人才引进计划，创新能力增强'
      ],
      ai: [
        '{stock}AI技术突破，应用场景扩大',
        '{stock}大模型商业化落地，收入增长加速',
        '{stock}AI芯片需求旺盛，产能供不应求',
        '{stock}AI算法优化，性能显著提升',
        '{stock}AI+行业应用，市场空间巨大',
        '{stock}AI算力基础设施完善',
        '{stock}AI人才储备丰富，技术领先',
        '{stock}AI生态建设完善，合作伙伴众多',
        '{stock}AI安全技术突破，合规性提升',
        '{stock}AI边缘计算布局，应用更广泛',
        '{stock}AI云服务增长强劲，客户粘性高',
        '{stock}AI硬件产品线丰富，覆盖全面',
        '{stock}AI软件平台成熟，开发者生态活跃',
        '{stock}AI投资加大，研发实力增强',
        '{stock}AI专利数量领先，技术壁垒高',
        '{stock}AI商业化模式清晰，盈利能力强'
      ],
      energy: [
        '{stock}新能源业务增长强劲，转型成功',
        '{stock}储能技术突破，成本大幅下降',
        '{stock}光伏产能扩张，规模效应显现',
        '{stock}风电项目进展顺利，收入增长',
        '{stock}氢能源布局领先，技术优势明显',
        '{stock}新能源汽车销量超预期',
        '{stock}充电桩网络完善，用户体验提升',
        '{stock}电池技术升级，续航里程增加',
        '{stock}能源互联网建设，智能化水平高',
        '{stock}碳中和技术领先，政策支持',
        '{stock}清洁能源占比提升，环保效益显著',
        '{stock}能源存储解决方案创新',
        '{stock}智能电网建设，效率提升',
        '{stock}能源管理系统优化，成本控制',
        '{stock}可再生能源投资加大',
        '{stock}能源转型战略清晰，执行力强'
      ],
      healthcare: [
        '{stock}新药研发进展顺利，临床试验成功',
        '{stock}医疗器械创新，市场需求旺盛',
        '{stock}生物技术突破，治疗效果好',
        '{stock}医疗服务数字化，效率提升',
        '{stock}基因治疗技术领先，前景广阔',
        '{stock}疫苗研发成功，市场空间大',
        '{stock}医疗AI应用，诊断准确率提高',
        '{stock}远程医疗普及，便利性增强',
        '{stock}医疗设备国产化，成本优势明显',
        '{stock}医药供应链优化，稳定性提升',
        '{stock}医疗数据安全，隐私保护完善',
        '{stock}精准医疗技术，个性化治疗',
        '{stock}医疗机器人应用，手术精度提高',
        '{stock}医疗耗材创新，使用体验改善',
        '{stock}医疗信息化建设，管理效率提升',
        '{stock}医疗健康生态完善，服务全面'
      ]
    };

    this.categories = [
      '科技股', '金融股', '消费股', '医疗股', '能源股', '工业股', '材料股', '公用事业股',
      '房地产股', '通信股', '中小盘股', '大盘股', '成长股', '价值股', '蓝筹股', '概念股',
      'AI概念股', '新能源股', '芯片股', '云计算股', '生物科技股', '金融科技股', '电动汽车股', '元宇宙股'
    ];
  }

  // 生成随机价格
  generatePrice(stock) {
    const basePrices = {
      'AAPL': 185, 'MSFT': 378, 'GOOGL': 142, 'AMZN': 155, 'TSLA': 245,
      'NVDA': 485, 'META': 332, 'NFLX': 503, 'AMD': 128, 'CRM': 263,
      'ADBE': 520, 'PYPL': 58, 'INTC': 45, 'ORCL': 125, 'CSCO': 48,
      'IBM': 165, 'QCOM': 135, 'AVGO': 890, 'TXN': 165, 'MU': 85
    };
    const basePrice = basePrices[stock] || 100;
    const variation = (Math.random() - 0.5) * 0.2; // ±10%变化
    return Math.round((basePrice * (1 + variation)) * 100) / 100;
  }

  // 生成随机百分比
  generatePercent() {
    return (Math.random() * 20 + 5).toFixed(1); // 5-25%
  }

  // 生成随机消息
  generateMessage() {
    const user = this.users[Math.floor(Math.random() * this.users.length)];
    const messageTypes = Object.keys(this.messageTemplates);
    const messageType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    const templates = this.messageTemplates[messageType];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    let message = template;
    const stock = this.stocks[Math.floor(Math.random() * this.stocks.length)];
    const category = this.categories[Math.floor(Math.random() * this.categories.length)];
    
    // 替换模板变量
    message = message.replace(/{stock}/g, stock);
    message = message.replace(/{category}/g, category);
    message = message.replace(/{price}/g, this.generatePrice(stock));
    message = message.replace(/{percent}/g, this.generatePercent());
    
    // 添加一些随机变化
    const variations = [
      '目标价看高一线',
      '建议分批建仓',
      '注意风险控制',
      '长期持有为主',
      '短线操作需谨慎',
      '关注量能配合',
      '等待回调机会',
      '逢低吸纳策略',
      '设置止损位',
      '关注市场情绪',
      '技术面配合良好',
      '基本面支撑强劲',
      '估值仍有提升空间',
      '行业景气度持续',
      '政策环境有利',
      '资金面充裕'
    ];
    
    if (Math.random() > 0.6) {
      message += '，' + variations[Math.floor(Math.random() * variations.length)];
    }
    
    return {
      user,
      message,
      timestamp: new Date(Date.now() - Math.random() * 60 * 60 * 1000) // 随机时间，最多1小时前
    };
  }

  // 生成多条消息
  generateMessages(count = 10) {
    const messages = [];
    for (let i = 0; i < count; i++) {
      messages.push(this.generateMessage());
    }
    // 按时间排序
    return messages.sort((a, b) => a.timestamp - b.timestamp);
  }

  // 获取相对时间
  getRelativeTime(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days}天前`;
    } else if (hours > 0) {
      return `${hours}小时前`;
    } else if (minutes > 0) {
      return `${minutes}分钟前`;
    } else {
      return '刚刚';
    }
  }

  // 生成实时消息流
  generateRealTimeStream() {
    const messages = this.generateMessages(20);
    return messages.map(msg => ({
      ...msg,
      relativeTime: this.getRelativeTime(msg.timestamp)
    }));
  }
}

// 创建单例实例
const stockChatGenerator = new StockChatDataGenerator();

export default stockChatGenerator; 