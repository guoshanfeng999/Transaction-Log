// 实时股票数据工具
export const getRealTimeStockData = async (symbol) => {
  try {
    // 模拟实时数据 - 在实际项目中，这里应该调用真实的股票API
    const mockData = generateMockRealTimeData(symbol);
    return mockData;
  } catch (error) {
    console.error('获取实时股票数据失败:', error);
    return null;
  }
};

// 生成模拟的实时股票数据
const generateMockRealTimeData = (symbol) => {
  const now = new Date();
  const basePrice = getBasePrice(symbol);
  const volatility = getVolatility(symbol);
  
  // 生成过去24小时的数据点（每分钟一个点）
  const dataPoints = [];
  for (let i = 1440; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange);
    
    dataPoints.push({
      time: time.toISOString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000
    });
  }
  
  return {
    symbol,
    currentPrice: dataPoints[dataPoints.length - 1].price,
    change: dataPoints[dataPoints.length - 1].price - basePrice,
    changePercent: ((dataPoints[dataPoints.length - 1].price - basePrice) / basePrice * 100).toFixed(2),
    dataPoints,
    lastUpdated: now.toISOString()
  };
};

// 获取基础价格
const getBasePrice = (symbol) => {
  const prices = {
    'AAPL': 180,
    'TSLA': 240,
    'NVDA': 500,
    'MSFT': 350,
    'GOOGL': 140,
    'AMZN': 150,
    'META': 300,
    'NFLX': 400,
    'AMD': 120,
    'CRM': 200,
    'ADBE': 500,
    'PYPL': 60
  };
  return prices[symbol] || 100;
};

// 获取波动率
const getVolatility = (symbol) => {
  const volatilities = {
    'AAPL': 0.02,
    'TSLA': 0.05,
    'NVDA': 0.04,
    'MSFT': 0.015,
    'GOOGL': 0.025,
    'AMZN': 0.03,
    'META': 0.035,
    'NFLX': 0.04,
    'AMD': 0.045,
    'CRM': 0.025,
    'ADBE': 0.02,
    'PYPL': 0.035
  };
  return volatilities[symbol] || 0.02;
};

// 获取实时交易图表数据
export const getRealTimeChartData = async (symbol, hours = 24) => {
  const stockData = await getRealTimeStockData(symbol);
  if (!stockData) return null;
  
  // 根据小时数过滤数据点
  const filteredData = stockData.dataPoints.filter((point, index) => {
    const pointTime = new Date(point.time);
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return pointTime >= cutoffTime;
  });
  
  return {
    ...stockData,
    dataPoints: filteredData
  };
};

// 生成交易案例的实时图表
export const generateTradingCaseChart = async (symbol, tradeType = 'long') => {
  const chartData = await getRealTimeChartData(symbol, 6); // 6小时数据
  if (!chartData) return null;
  
  // 模拟交易入场和出场点
  const dataPoints = chartData.dataPoints;
  const entryIndex = Math.floor(dataPoints.length * 0.2);
  const exitIndex = Math.floor(dataPoints.length * 0.8);
  
  const entryPrice = dataPoints[entryIndex].price;
  const exitPrice = dataPoints[exitIndex].price;
  const profit = tradeType === 'long' ? exitPrice - entryPrice : entryPrice - exitPrice;
  const profitPercent = (profit / entryPrice * 100).toFixed(2);
  
  return {
    symbol,
    chartData,
    tradeType,
    entryPrice: parseFloat(entryPrice.toFixed(2)),
    exitPrice: parseFloat(exitPrice.toFixed(2)),
    profit: parseFloat(profit.toFixed(2)),
    profitPercent: parseFloat(profitPercent),
    entryTime: dataPoints[entryIndex].time,
    exitTime: dataPoints[exitIndex].time
  };
}; 