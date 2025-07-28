// 美股大盘走势数据工具
import realTimeStockService from './realTimeStockService';

// 主要美股指数
const MAJOR_INDICES = {
  'SPY': '标普500指数ETF',
  'QQQ': '纳斯达克100指数ETF', 
  'IWM': '罗素2000指数ETF',
  'DIA': '道琼斯工业平均指数ETF',
  'VTI': '全市场ETF',
  'VEA': '发达市场ETF',
  'VWO': '新兴市场ETF'
};

// 获取美股大盘走势数据
export const getMarketTrendData = async (symbol = 'SPY') => {
  try {
    // 尝试获取实时数据
    const realTimeData = await realTimeStockService.getStockDetail(symbol);
    if (realTimeData && realTimeData.priceData) {
      return {
        symbol,
        name: MAJOR_INDICES[symbol] || symbol,
        currentPrice: realTimeData.currentPrice,
        change: realTimeData.change,
        changePercent: realTimeData.changePercent,
        priceData: realTimeData.priceData,
        lastUpdated: new Date().toISOString(),
        isRealTime: true
      };
    }
  } catch (error) {
    console.error('获取实时大盘数据失败:', error);
  }

  // 降级到模拟数据
  return generateMockMarketData(symbol);
};

// 生成模拟的大盘走势数据
const generateMockMarketData = (symbol) => {
  const now = new Date();
  const basePrice = getMarketBasePrice(symbol);
  const volatility = getMarketVolatility(symbol);
  
  // 添加一些随机性，让每次生成的数据都不同
  const timeOffset = Math.random() * 1000; // 随机时间偏移
  const priceOffset = (Math.random() - 0.5) * 0.02; // 随机价格偏移
  
  // 生成过去24小时的数据点（每5分钟一个点）
  const dataPoints = [];
  for (let i = 288; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000 + timeOffset);
    const randomChange = (Math.random() - 0.5) * volatility + priceOffset;
    const price = basePrice * (1 + randomChange);
    
    dataPoints.push({
      time: time.toISOString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 5000000) + 1000000
    });
  }
  
  const currentPrice = dataPoints[dataPoints.length - 1].price;
  const change = currentPrice - basePrice;
  const changePercent = (change / basePrice * 100).toFixed(2);
  
  return {
    symbol,
    name: MAJOR_INDICES[symbol] || symbol,
    currentPrice,
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent),
    priceData: dataPoints,
    lastUpdated: now.toISOString(),
    isRealTime: false
  };
};

// 获取大盘基础价格
const getMarketBasePrice = (symbol) => {
  const prices = {
    'SPY': 450,    // 标普500
    'QQQ': 380,    // 纳斯达克100
    'IWM': 180,    // 罗素2000
    'DIA': 350,    // 道琼斯
    'VTI': 240,    // 全市场
    'VEA': 45,     // 发达市场
    'VWO': 40      // 新兴市场
  };
  return prices[symbol] || 100;
};

// 获取大盘波动率
const getMarketVolatility = (symbol) => {
  const volatilities = {
    'SPY': 0.015,  // 标普500相对稳定
    'QQQ': 0.025,  // 纳斯达克波动较大
    'IWM': 0.03,   // 小盘股波动最大
    'DIA': 0.012,  // 道琼斯相对稳定
    'VTI': 0.018,  // 全市场中等波动
    'VEA': 0.02,   // 发达市场
    'VWO': 0.035   // 新兴市场波动最大
  };
  return volatilities[symbol] || 0.02;
};

// 获取多个大盘指数的对比数据
export const getMarketComparison = async () => {
  const symbols = ['SPY', 'QQQ', 'IWM', 'DIA'];
  const marketData = {};
  
  for (const symbol of symbols) {
    try {
      marketData[symbol] = await getMarketTrendData(symbol);
    } catch (error) {
      console.error(`获取${symbol}数据失败:`, error);
      marketData[symbol] = generateMockMarketData(symbol);
    }
  }
  
  return marketData;
};

// 获取市场整体趋势
export const getMarketTrend = async () => {
  const marketData = await getMarketComparison();
  const trends = Object.values(marketData).map(data => data.changePercent);
  const avgTrend = trends.reduce((sum, trend) => sum + trend, 0) / trends.length;
  
  return {
    overallTrend: avgTrend,
    marketData,
    timestamp: new Date().toISOString()
  };
};

// 生成交易策略库的大盘走势图
export const generateMarketStrategyChart = async (strategyType = 'trend') => {
  // 根据策略类型选择合适的大盘指数
  let symbol = 'SPY';
  switch (strategyType) {
    case 'growth':
      symbol = 'QQQ'; // 成长股策略用纳斯达克
      break;
    case 'value':
      symbol = 'DIA'; // 价值股策略用道琼斯
      break;
    case 'smallcap':
      symbol = 'IWM'; // 小盘股策略用罗素2000
      break;
    default:
      symbol = 'SPY'; // 默认用标普500
  }
  
  const marketData = await getMarketTrendData(symbol);
  if (!marketData) return null;
  
  // 分析市场趋势
  const dataPoints = marketData.priceData;
  const recentPrices = dataPoints.slice(-20); // 最近20个数据点
  const trend = analyzeTrend(recentPrices);
  
  return {
    symbol,
    name: marketData.name,
    currentPrice: marketData.currentPrice,
    change: marketData.change,
    changePercent: marketData.changePercent,
    priceData: marketData.priceData,
    trend: trend,
    strategyType,
    lastUpdated: marketData.lastUpdated,
    isRealTime: marketData.isRealTime
  };
};

// 分析价格趋势
const analyzeTrend = (priceData) => {
  if (priceData.length < 2) return 'neutral';
  
  const firstPrice = priceData[0].price;
  const lastPrice = priceData[priceData.length - 1].price;
  const change = lastPrice - firstPrice;
  const changePercent = (change / firstPrice) * 100;
  
  if (changePercent > 1) return 'bullish';
  if (changePercent < -1) return 'bearish';
  return 'neutral';
};

// 获取市场情绪指标
export const getMarketSentiment = async () => {
  const marketTrend = await getMarketTrend();
  const overallTrend = marketTrend.overallTrend;
  
  let sentiment = 'neutral';
  let description = '市场情绪中性';
  
  if (overallTrend > 2) {
    sentiment = 'bullish';
    description = '市场情绪乐观，主要指数普遍上涨';
  } else if (overallTrend > 0.5) {
    sentiment = 'slightly_bullish';
    description = '市场情绪略微乐观';
  } else if (overallTrend < -2) {
    sentiment = 'bearish';
    description = '市场情绪悲观，主要指数普遍下跌';
  } else if (overallTrend < -0.5) {
    sentiment = 'slightly_bearish';
    description = '市场情绪略微悲观';
  }
  
  return {
    sentiment,
    description,
    overallTrend,
    timestamp: new Date().toISOString()
  };
}; 