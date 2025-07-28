import React, { useState, useEffect } from 'react';
import { useStock } from '../contexts/StockContext';
import { 
  FaArrowUp, 
  FaArrowDown, 
  FaChartLine, 
  FaTrophy,
  FaEye,
  FaThumbsUp,
  FaShare,
  FaComment,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import axios from 'axios';

const StockAnalysis = () => {
  const { topGainers, topLosers, loading } = useStock();
  const [activeTab, setActiveTab] = useState('gainers');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [sortBy, setSortBy] = useState('changePercent');

  useEffect(() => {
    const currentStocks = activeTab === 'gainers' ? topGainers : topLosers;
    let filtered = currentStocks;

    if (searchTerm) {
      filtered = currentStocks.filter(stock => 
        stock.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'changePercent':
          return activeTab === 'gainers' ? b.changePercent - a.changePercent : a.changePercent - b.changePercent;
        case 'currentPrice':
          return b.currentPrice - a.currentPrice;
        case 'volume':
          return b.volume - a.volume;
        case 'marketCap':
          return b.marketCap - a.marketCap;
        default:
          return 0;
      }
    });

    setFilteredStocks(filtered);
  }, [activeTab, searchTerm, sortBy, topGainers, topLosers]);

  const formatNumber = (num) => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(2) + '亿';
    } else if (num >= 10000) {
      return (num / 10000).toFixed(2) + '万';
    }
    return num.toLocaleString();
  };

  const getSectorColor = (sector) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Financial Services': 'bg-green-100 text-green-800',
      'Consumer Discretionary': 'bg-purple-100 text-purple-800',
      'Consumer Staples': 'bg-orange-100 text-orange-800',
      'Communication Services': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-pink-100 text-pink-800',
      'Energy': 'bg-yellow-100 text-yellow-800',
      'Industrials': 'bg-indigo-100 text-indigo-800',
      'Materials': 'bg-teal-100 text-teal-800',
      'Real Estate': 'bg-gray-100 text-gray-800',
      'Utilities': 'bg-cyan-100 text-cyan-800'
    };
    return colors[sector] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">股票分析中心</h1>
        <p className="text-gray-600">实时监控市场动态，发现投资机会</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索股票代码、名称或加密货币..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="changePercent">按涨跌幅排序</option>
              <option value="currentPrice">按价格排序</option>
              <option value="volume">按成交量排序</option>
              <option value="marketCap">按市值排序</option>
            </select>
          </div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('gainers')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'gainers'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaArrowUp className="inline mr-2" />
              涨幅榜 TOP10
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                activeTab === 'losers'
                  ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaArrowDown className="inline mr-2" />
              跌幅榜 TOP10
            </button>
          </nav>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                  <div className="w-20 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStocks.map((stock, index) => (
                <div key={stock._id || stock.code} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{stock.code}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className={`font-bold text-lg flex items-center ${
                        stock.changePercent > 0 ? 'stock-up' : 'stock-down'
                      }`}>
                        {stock.changePercent > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                        {stock.changePercent > 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                      </div>
                      <div className="text-sm text-gray-500">涨跌幅</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">${stock.currentPrice?.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">现价</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{formatNumber(stock.volume)}</div>
                      <div className="text-sm text-gray-500">成交量</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{formatNumber(stock.marketCap)}</div>
                      <div className="text-sm text-gray-500">市值</div>
                    </div>
                    
                    <div className="text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSectorColor(stock.sector)}`}>
                        {stock.sector}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStocks.length === 0 && (
                <div className="text-center py-8">
                  <FaChartLine className="mx-auto text-gray-400 text-4xl mb-4" />
                  <p className="text-gray-500">没有找到匹配的股票</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 市场概览 */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">上涨股票</h3>
            <FaArrowUp className="text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {topGainers.filter(s => s.changePercent > 0).length}
          </div>
          <p className="text-sm text-gray-500 mt-2">今日上涨股票数量</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">下跌股票</h3>
            <FaArrowDown className="text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">
            {topLosers.filter(s => s.changePercent < 0).length}
          </div>
          <p className="text-sm text-gray-500 mt-2">今日下跌股票数量</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">平均涨幅</h3>
            <FaTrophy className="text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">
            {topGainers.length > 0 ? (topGainers.reduce((sum, s) => sum + s.changePercent, 0) / topGainers.length).toFixed(2) : 0}%
          </div>
          <p className="text-sm text-gray-500 mt-2">TOP10平均涨幅</p>
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis; 