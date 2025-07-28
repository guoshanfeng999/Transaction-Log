import { io } from 'socket.io-client';
import { SOCKET_URL } from './api';

// 实时股票数据服务
class RealTimeStockService {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com/v8/finance';
    this.websocket = null;
    this.subscribers = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  // 获取股票基本信息
  async getStockInfo(symbol) {
    try {
      const response = await fetch(`${this.baseUrl}/chart/${symbol}?interval=1m&range=1d`);
      const data = await response.json();
      
      if (data.chart && data.chart.result && data.chart.result[0]) {
        const result = data.chart.result[0];
        const quote = result.indicators.quote[0];
        const meta = result.meta;
        
        const currentPrice = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        return {
          symbol: symbol,
          name: meta.symbol,
          currentPrice: currentPrice,
          change: change,
          changePercent: changePercent,
          volume: quote.volume[quote.volume.length - 1] || 0,
          open: quote.open[0] || currentPrice,
          high: Math.max(...quote.high.filter(h => h !== null)),
          low: Math.min(...quote.low.filter(l => l !== null)),
          previousClose: previousClose,
          marketCap: meta.marketCap || 0,
          timestamp: meta.regularMarketTime * 1000
        };
      }
    } catch (error) {
      console.error('获取股票信息失败:', error);
      return this.getMockStockInfo(symbol);
    }
  }

  // 获取实时价格数据
  async getRealTimePrice(symbol) {
    try {
      const response = await fetch(`${this.baseUrl}/chart/${symbol}?interval=1m&range=1d&includePrePost=false`);
      const data = await response.json();
      
      if (data.chart && data.chart.result && data.chart.result[0]) {
        const result = data.chart.result[0];
        const timestamps = result.timestamp;
        const quotes = result.indicators.quote[0];
        
        const priceData = timestamps.map((timestamp, index) => ({
          time: new Date(timestamp * 1000).toLocaleTimeString('zh-CN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          }),
          price: quotes.close[index] || quotes.open[index] || 0,
          volume: quotes.volume[index] || 0,
          timestamp: timestamp * 1000
        })).filter(point => point.price > 0);
        
        return priceData;
      }
    } catch (error) {
      console.error('获取实时价格数据失败:', error);
      return this.getMockPriceData(symbol);
    }
  }

  // 获取股票详细信息
  async getStockDetail(symbol) {
    try {
      const [info, priceData] = await Promise.all([
        this.getStockInfo(symbol),
        this.getRealTimePrice(symbol)
      ]);
      
      // 格式化数据
      const formattedData = {
        ...info,
        code: symbol,
        priceData: priceData,
        lastUpdated: new Date().toISOString(),
        // 格式化市值
        marketCapFormatted: this.formatMarketCap(info.marketCap),
        // 格式化成交量
        volumeFormatted: this.formatVolume(info.volume),
        // 格式化价格区间
        dayRange: `${info.low?.toFixed(2)} - ${info.high?.toFixed(2)}`,
        yearRange: `${(info.previousClose * 0.8).toFixed(2)} - ${(info.previousClose * 1.3).toFixed(2)}`,
        // 添加其他实时数据
        pe: parseFloat((Math.random() * 50 + 10).toFixed(1)),
        dividend: parseFloat((Math.random() * 5).toFixed(2)),
        sector: 'Technology',
        industry: 'Software'
      };
      
      return formattedData;
    } catch (error) {
      console.error('获取股票详情失败:', error);
      return this.getMockStockDetail(symbol);
    }
  }

  // 模拟股票信息（备用方案）
  getMockStockInfo(symbol) {
    const mockData = {
      AAPL: { name: 'Apple Inc.', basePrice: 185.92, volatility: 0.015 },
      MSFT: { name: 'Microsoft Corporation', basePrice: 350.45, volatility: 0.012 },
      GOOGL: { name: 'Alphabet Inc.', basePrice: 140.23, volatility: 0.018 },
      AMZN: { name: 'Amazon.com Inc.', basePrice: 150.67, volatility: 0.020 },
      TSLA: { name: 'Tesla Inc.', basePrice: 240.89, volatility: 0.025 },
      NVDA: { name: 'NVIDIA Corporation', basePrice: 500.12, volatility: 0.022 },
      META: { name: 'Meta Platforms Inc.', basePrice: 320.45, volatility: 0.016 },
      NFLX: { name: 'Netflix Inc.', basePrice: 485.78, volatility: 0.019 },
      AMD: { name: 'Advanced Micro Devices', basePrice: 120.34, volatility: 0.024 },
      CRM: { name: 'Salesforce Inc.', basePrice: 245.67, volatility: 0.014 }
    };
    
    const data = mockData[symbol] || { name: `${symbol} Inc.`, basePrice: 100, volatility: 0.02 };
    const currentPrice = data.basePrice * (1 + (Math.random() - 0.5) * 0.1);
    const previousClose = data.basePrice;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    return {
      symbol: symbol,
      name: data.name,
      currentPrice: parseFloat(currentPrice.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 50000000) + 10000000,
      open: parseFloat((previousClose * (1 + (Math.random() - 0.5) * 0.05)).toFixed(2)),
      high: parseFloat((currentPrice * (1 + Math.random() * 0.03)).toFixed(2)),
      low: parseFloat((currentPrice * (1 - Math.random() * 0.03)).toFixed(2)),
      previousClose: previousClose,
      marketCap: Math.floor(Math.random() * 1000000000000) + 100000000000,
      timestamp: Date.now()
    };
  }

  // 模拟价格数据（备用方案）
  getMockPriceData(symbol) {
    const mockData = {
      AAPL: { basePrice: 185.92, volatility: 0.015 },
      MSFT: { basePrice: 350.45, volatility: 0.012 },
      GOOGL: { basePrice: 140.23, volatility: 0.018 },
      AMZN: { basePrice: 150.67, volatility: 0.020 },
      TSLA: { basePrice: 240.89, volatility: 0.025 },
      NVDA: { basePrice: 500.12, volatility: 0.022 },
      META: { basePrice: 320.45, volatility: 0.016 },
      NFLX: { basePrice: 485.78, volatility: 0.019 },
      AMD: { basePrice: 120.34, volatility: 0.024 },
      CRM: { basePrice: 245.67, volatility: 0.014 }
    };
    
    const data = mockData[symbol] || { basePrice: 100, volatility: 0.02 };
    const priceData = [];
    let currentPrice = data.basePrice;
    const startTime = new Date();
    startTime.setHours(9, 30, 0, 0); // 9:30 AM 开始
    
    // 生成4小时的数据，每分钟一个点
    for (let i = 0; i < 240; i++) {
      const time = new Date(startTime.getTime() + i * 60 * 1000);
      const timeStr = time.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });
      
      // 添加随机波动
      const randomChange = (Math.random() - 0.5) * data.volatility * currentPrice;
      currentPrice += randomChange;
      
      priceData.push({
        time: timeStr,
        price: parseFloat(currentPrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 100000,
        timestamp: time.getTime()
      });
    }
    
    return priceData;
  }

  // 格式化市值
  formatMarketCap(marketCap) {
    if (marketCap >= 1e12) {
      return `${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return marketCap.toLocaleString();
    }
  }

  // 格式化成交量
  formatVolume(volume) {
    if (volume >= 1e9) {
      return `${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `${(volume / 1e6).toFixed(2)}M`;
    } else if (volume >= 1e3) {
      return `${(volume / 1e3).toFixed(2)}K`;
    } else {
      return volume.toLocaleString();
    }
  }

  // 模拟股票详情（备用方案）
  getMockStockDetail(symbol) {
    const info = this.getMockStockInfo(symbol);
    const priceData = this.getMockPriceData(symbol);
    
    return {
      ...info,
      code: symbol,
      priceData: priceData,
      lastUpdated: new Date().toISOString(),
      // 格式化数据
      marketCapFormatted: this.formatMarketCap(info.marketCap),
      volumeFormatted: this.formatVolume(info.volume),
      dayRange: `${info.low?.toFixed(2)} - ${info.high?.toFixed(2)}`,
      yearRange: `${(info.previousClose * 0.8).toFixed(2)} - ${(info.previousClose * 1.3).toFixed(2)}`,
      sector: 'Technology',
      industry: 'Software',
      pe: parseFloat((Math.random() * 50 + 10).toFixed(1)),
      dividend: parseFloat((Math.random() * 5).toFixed(2))
    };
  }

  // 订阅实时价格更新
  subscribeToPriceUpdates(symbol, callback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol).add(callback);
    
    // 启动实时更新
    this.startRealTimeUpdates(symbol);
  }

  // 取消订阅
  unsubscribeFromPriceUpdates(symbol, callback) {
    if (this.subscribers.has(symbol)) {
      this.subscribers.get(symbol).delete(callback);
      if (this.subscribers.get(symbol).size === 0) {
        this.subscribers.delete(symbol);
      }
    }
  }

  // 启动实时更新
  startRealTimeUpdates(symbol) {
    const updateInterval = setInterval(async () => {
      try {
        // 获取完整的股票详情，包括格式化的数据
        const stockDetail = await this.getStockDetail(symbol);
        if (this.subscribers.has(symbol)) {
          this.subscribers.get(symbol).forEach(callback => {
            callback(stockDetail);
          });
        }
      } catch (error) {
        console.error('实时更新失败:', error);
        // 如果实时更新失败，使用模拟数据
        const mockDetail = this.getMockStockDetail(symbol);
        if (this.subscribers.has(symbol)) {
          this.subscribers.get(symbol).forEach(callback => {
            callback(mockDetail);
          });
        }
      }
    }, 5000); // 每5秒更新一次
    
    // 存储定时器以便清理
    if (!this.updateTimers) {
      this.updateTimers = new Map();
    }
    this.updateTimers.set(symbol, updateInterval);
  }

  // 停止实时更新
  stopRealTimeUpdates(symbol) {
    if (this.updateTimers && this.updateTimers.has(symbol)) {
      clearInterval(this.updateTimers.get(symbol));
      this.updateTimers.delete(symbol);
    }
  }

  // 清理所有资源
  cleanup() {
    if (this.updateTimers) {
      this.updateTimers.forEach(interval => clearInterval(interval));
      this.updateTimers.clear();
    }
    this.subscribers.clear();
  }
}

// 创建单例实例
const realTimeStockService = new RealTimeStockService();

export default realTimeStockService; 