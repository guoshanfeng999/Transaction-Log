const express = require('express');
const Stock = require('../models/Stock');
const axios = require('axios');
const router = express.Router();

// 模拟实时股票数据（美国市场）
const mockStockData = [
  // 科技股
  {
    code: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 185.92,
    change: 6.45,
    changePercent: 3.60,
    volume: 45000000,
    marketCap: 2900000000000,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    isHot: true,
    type: 'stock'
  },
  {
    code: 'MSFT',
    name: 'Microsoft Corporation',
    currentPrice: 378.85,
    change: 12.30,
    changePercent: 3.36,
    volume: 28000000,
    marketCap: 2810000000000,
    sector: 'Technology',
    industry: 'Software',
    isHot: true,
    type: 'stock'
  },
  {
    code: 'GOOGL',
    name: 'Alphabet Inc.',
    currentPrice: 142.56,
    change: 5.20,
    changePercent: 3.78,
    volume: 32000000,
    marketCap: 1790000000000,
    sector: 'Technology',
    industry: 'Internet Services',
    isHot: true,
    type: 'stock'
  },
  {
    code: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 155.20,
    change: 7.85,
    changePercent: 5.33,
    volume: 38000000,
    marketCap: 1610000000000,
    sector: 'Consumer Discretionary',
    industry: 'E-commerce',
    isHot: true,
    type: 'stock'
  },
  {
    code: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 245.80,
    change: 12.30,
    changePercent: 5.27,
    volume: 65000000,
    marketCap: 780000000000,
    sector: 'Consumer Discretionary',
    industry: 'Automotive',
    isHot: true,
    type: 'stock'
  },
  {
    code: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 485.09,
    change: 25.60,
    changePercent: 5.58,
    volume: 42000000,
    marketCap: 1190000000000,
    sector: 'Technology',
    industry: 'Semiconductors',
    isHot: true,
    type: 'stock'
  },
  // 加密货币
  {
    code: 'BTC',
    name: 'Bitcoin',
    currentPrice: 43250.85,
    change: 1250.30,
    changePercent: 2.98,
    volume: 28000000000,
    marketCap: 850000000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'ETH',
    name: 'Ethereum',
    currentPrice: 2650.45,
    change: 85.20,
    changePercent: 3.32,
    volume: 15000000000,
    marketCap: 320000000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'BNB',
    name: 'Binance Coin',
    currentPrice: 315.80,
    change: 12.45,
    changePercent: 4.10,
    volume: 2800000000,
    marketCap: 48000000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'SOL',
    name: 'Solana',
    currentPrice: 98.75,
    change: 5.20,
    changePercent: 5.56,
    volume: 3200000000,
    marketCap: 42000000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'ADA',
    name: 'Cardano',
    currentPrice: 0.485,
    change: 0.025,
    changePercent: 5.43,
    volume: 850000000,
    marketCap: 17000000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: false,
    type: 'crypto'
  },
  {
    code: 'DOT',
    name: 'Polkadot',
    currentPrice: 7.85,
    change: 0.35,
    changePercent: 4.67,
    volume: 650000000,
    marketCap: 9800000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: false,
    type: 'crypto'
  },
  {
    code: 'LINK',
    name: 'Chainlink',
    currentPrice: 15.20,
    change: 0.85,
    changePercent: 5.92,
    volume: 450000000,
    marketCap: 8500000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: false,
    type: 'crypto'
  },
  {
    code: 'MATIC',
    name: 'Polygon',
    currentPrice: 0.95,
    change: 0.08,
    changePercent: 9.20,
    volume: 380000000,
    marketCap: 8500000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'AVAX',
    name: 'Avalanche',
    currentPrice: 28.50,
    change: 2.10,
    changePercent: 7.95,
    volume: 520000000,
    marketCap: 10500000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: true,
    type: 'crypto'
  },
  {
    code: 'UNI',
    name: 'Uniswap',
    currentPrice: 6.85,
    change: 0.45,
    changePercent: 7.03,
    volume: 280000000,
    marketCap: 4100000000,
    sector: 'Cryptocurrency',
    industry: 'Digital Currency',
    isHot: false,
    type: 'crypto'
  }
];

// 获取热门股票
router.get('/hot', async (req, res) => {
  try {
    // 首先尝试从数据库获取
    let hotStocks = await Stock.find({ isHot: true })
      .sort({ changePercent: -1 })
      .limit(10);

    // 如果数据库中没有数据，使用模拟数据
    if (hotStocks.length === 0) {
      hotStocks = mockStockData.slice(0, 10);
    }

    res.json(hotStocks);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取涨幅榜（当日涨幅最高的十只股票）
router.get('/top-gainers', async (req, res) => {
  try {
    // 使用模拟数据作为涨幅榜
    const topGainers = mockStockData
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 10)
      .map((stock, index) => ({
        ...stock,
        rank: index + 1,
        lastUpdated: new Date()
      }));

    res.json(topGainers);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取热门板块（按美元交易量计算）
router.get('/hot-sectors', async (req, res) => {
  try {
    // 计算每个板块的总交易量
    const sectorVolume = {};
    const sectorStocks = {};
    
    // 合并所有股票数据（包括涨幅榜和跌幅榜）
    const allStocks = [
      ...mockStockData,
      {
        code: 'NFLX',
        name: 'Netflix Inc.',
        currentPrice: 485.09,
        change: -12.50,
        changePercent: -2.51,
        volume: 8500000,
        marketCap: 215000000000,
        sector: 'Communication Services',
        industry: 'Entertainment'
      },
      {
        code: 'DIS',
        name: 'Walt Disney Co.',
        currentPrice: 92.45,
        change: -3.20,
        changePercent: -3.34,
        volume: 12000000,
        marketCap: 169000000000,
        sector: 'Communication Services',
        industry: 'Entertainment'
      },
      {
        code: 'KO',
        name: 'Coca-Cola Co.',
        currentPrice: 58.75,
        change: -1.85,
        changePercent: -3.05,
        volume: 15000000,
        marketCap: 254000000000,
        sector: 'Consumer Staples',
        industry: 'Beverages'
      },
      {
        code: 'PEP',
        name: 'PepsiCo Inc.',
        currentPrice: 168.90,
        change: -5.20,
        changePercent: -2.99,
        volume: 8500000,
        marketCap: 233000000000,
        sector: 'Consumer Staples',
        industry: 'Beverages'
      },
      {
        code: 'WMT',
        name: 'Walmart Inc.',
        currentPrice: 162.35,
        change: -4.15,
        changePercent: -2.49,
        volume: 9500000,
        marketCap: 410000000000,
        sector: 'Consumer Staples',
        industry: 'Retail'
      }
    ];

    // 计算每个板块的总交易量
    allStocks.forEach(stock => {
      const sector = stock.sector;
      const dollarVolume = stock.currentPrice * stock.volume;
      
      if (!sectorVolume[sector]) {
        sectorVolume[sector] = 0;
        sectorStocks[sector] = [];
      }
      
      sectorVolume[sector] += dollarVolume;
      sectorStocks[sector].push(stock);
    });

    // 转换为数组并排序
    const hotSectors = Object.keys(sectorVolume).map(sector => {
      const stocks = sectorStocks[sector];
      const avgChangePercent = stocks.reduce((sum, stock) => sum + stock.changePercent, 0) / stocks.length;
      const totalMarketCap = stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
      
      return {
        sector,
        dollarVolume: sectorVolume[sector],
        stockCount: stocks.length,
        avgChangePercent: parseFloat(avgChangePercent.toFixed(2)),
        totalMarketCap,
        topStocks: stocks
          .sort((a, b) => b.volume - a.volume)
          .slice(0, 3)
          .map(stock => ({
            code: stock.code,
            name: stock.name,
            currentPrice: stock.currentPrice,
            changePercent: stock.changePercent,
            volume: stock.volume
          }))
      };
    }).sort((a, b) => b.dollarVolume - a.dollarVolume);

    res.json(hotSectors);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取跌幅榜
router.get('/top-losers', async (req, res) => {
  try {
    // 模拟跌幅榜数据（美国市场）
    const mockLosers = [
      {
        code: 'NFLX',
        name: 'Netflix Inc.',
        currentPrice: 485.09,
        change: -12.50,
        changePercent: -2.51,
        volume: 8500000,
        marketCap: 215000000000,
        sector: 'Communication Services',
        industry: 'Entertainment'
      },
      {
        code: 'DIS',
        name: 'Walt Disney Co.',
        currentPrice: 92.45,
        change: -3.20,
        changePercent: -3.34,
        volume: 12000000,
        marketCap: 169000000000,
        sector: 'Communication Services',
        industry: 'Entertainment'
      },
      {
        code: 'KO',
        name: 'Coca-Cola Co.',
        currentPrice: 58.75,
        change: -1.85,
        changePercent: -3.05,
        volume: 15000000,
        marketCap: 271000000000,
        sector: 'Consumer Staples',
        industry: 'Beverages'
      },
      {
        code: 'PEP',
        name: 'PepsiCo Inc.',
        currentPrice: 165.30,
        change: -4.20,
        changePercent: -2.48,
        volume: 8500000,
        marketCap: 238000000000,
        sector: 'Consumer Staples',
        industry: 'Beverages'
      },
      {
        code: 'WMT',
        name: 'Walmart Inc.',
        currentPrice: 162.85,
        change: -2.15,
        changePercent: -1.30,
        volume: 6500000,
        marketCap: 410000000000,
        sector: 'Consumer Staples',
        industry: 'Retail'
      }
    ];

    const topLosers = mockLosers
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, 10)
      .map((stock, index) => ({
        ...stock,
        rank: index + 1,
        lastUpdated: new Date()
      }));

    res.json(topLosers);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取单个股票详情
router.get('/:code', async (req, res) => {
  try {
    let stock = null;
    try {
      stock = await Stock.findOne({ code: req.params.code.toUpperCase() });
    } catch (dbError) {
      console.log('数据库查询失败，使用模拟数据:', dbError.message);
    }
    
    if (!stock) {
      // 如果数据库中没有，从模拟数据中查找
      const mockStock = mockStockData.find(s => s.code === req.params.code.toUpperCase());
      if (mockStock) {
        return res.json({
          ...mockStock,
          lastUpdated: new Date()
        });
      }
      return res.status(404).json({ message: '股票不存在' });
    }

    res.json(stock);
  } catch (error) {
    console.error('获取股票详情时发生错误:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 搜索股票和加密货币
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query.toUpperCase();
    
    // 从数据库搜索
    let stocks = [];
    try {
      stocks = await Stock.find({
        $or: [
          { code: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } }
        ]
      }).limit(15);
    } catch (dbError) {
      console.log('数据库搜索失败，使用模拟数据:', dbError.message);
    }

    // 如果数据库中没有结果，从模拟数据中搜索
    if (stocks.length === 0) {
      stocks = mockStockData.filter(stock => 
        stock.code.toUpperCase().includes(query) || 
        stock.name.toUpperCase().includes(query)
      ).slice(0, 15);
    }

    // 按相关性排序：精确匹配优先，然后按类型排序（股票在前，加密货币在后）
    stocks.sort((a, b) => {
      const aCodeMatch = a.code.toUpperCase() === query;
      const bCodeMatch = b.code.toUpperCase() === query;
      const aNameMatch = a.name.toUpperCase().includes(query);
      const bNameMatch = b.name.toUpperCase().includes(query);
      
      // 精确匹配优先
      if (aCodeMatch && !bCodeMatch) return -1;
      if (!aCodeMatch && bCodeMatch) return 1;
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // 按类型排序：股票在前，加密货币在后
      if (a.type === 'stock' && b.type === 'crypto') return -1;
      if (a.type === 'crypto' && b.type === 'stock') return 1;
      
      return 0;
    });

    res.json(stocks);
  } catch (error) {
    console.error('搜索股票和加密货币时发生错误:', error);
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 更新股票数据（管理员功能）
router.put('/:code', async (req, res) => {
  try {
    const { currentPrice, change, changePercent, volume, marketCap, news, analysis } = req.body;
    
    const stock = await Stock.findOneAndUpdate(
      { code: req.params.code.toUpperCase() },
      {
        currentPrice,
        change,
        changePercent,
        volume,
        marketCap,
        news,
        analysis,
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!stock) {
      return res.status(404).json({ message: '股票不存在' });
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 添加新股票
router.post('/', async (req, res) => {
  try {
    const {
      code,
      name,
      currentPrice,
      sector,
      industry,
      description
    } = req.body;

    const existingStock = await Stock.findOne({ code: code.toUpperCase() });
    if (existingStock) {
      return res.status(400).json({ message: '股票代码已存在' });
    }

    const stock = new Stock({
      code: code.toUpperCase(),
      name,
      currentPrice,
      sector,
      industry,
      description
    });

    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

module.exports = router; 