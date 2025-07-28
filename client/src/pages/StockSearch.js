import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../contexts/StockContext';
import { 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaTimes
} from 'react-icons/fa';

const StockSearch = () => {
  const { searchStocks } = useStock();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // 美股板块列表
  const sectors = [
    'Technology',
    'Financial Services', 
    'Healthcare',
    'Consumer Discretionary',
    'Consumer Staples',
    'Communication Services',
    'Industrials',
    'Energy',
    'Materials',
    'Real Estate',
    'Utilities',
    'Cryptocurrency'
  ];

  const handleSearch = async (query) => {
    if (query.trim().length < 1) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchStocks(query);
      setSearchResults(results);
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getFilteredAndSortedResults = () => {
    let filtered = searchResults;

    // 按板块筛选
    if (sectorFilter !== 'all') {
      filtered = filtered.filter(stock => stock.sector === sectorFilter);
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'code':
          return a.code.localeCompare(b.code);
        case 'price':
          return b.currentPrice - a.currentPrice;
        case 'change':
          return b.changePercent - a.changePercent;
        case 'volume':
          return b.volume - a.volume;
        case 'marketCap':
          return b.marketCap - a.marketCap;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toLocaleString();
  };

  const getSectorColor = (sector) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Financial Services': 'bg-green-100 text-green-800',
      'Healthcare': 'bg-pink-100 text-pink-800',
      'Consumer Discretionary': 'bg-purple-100 text-purple-800',
      'Consumer Staples': 'bg-orange-100 text-orange-800',
      'Communication Services': 'bg-red-100 text-red-800',
      'Industrials': 'bg-indigo-100 text-indigo-800',
      'Energy': 'bg-yellow-100 text-yellow-800',
      'Materials': 'bg-teal-100 text-teal-800',
      'Real Estate': 'bg-gray-100 text-gray-800',
      'Utilities': 'bg-cyan-100 text-cyan-800',
      'Cryptocurrency': 'bg-yellow-100 text-yellow-800'
    };
    return colors[sector] || 'bg-gray-100 text-gray-800';
  };

  const filteredResults = getFilteredAndSortedResults();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">股票和加密货币搜索</h1>
        <p className="text-gray-600">搜索美国股票市场和加密货币，支持股票代码、公司名称和加密货币代码搜索</p>
      </div>

      {/* 搜索栏 */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="输入股票代码、公司名称或加密货币代码 (如: AAPL, Apple, BTC, Bitcoin)"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* 筛选和排序 */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FaFilter />
              <span>筛选</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="relevance">按相关性</option>
                <option value="name">按公司名称</option>
                <option value="code">按股票代码</option>
                <option value="price">按价格</option>
                <option value="change">按涨跌幅</option>
                <option value="volume">按成交量</option>
                <option value="marketCap">按市值</option>
              </select>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="text-sm text-gray-500">
              找到 {filteredResults.length} 只股票
            </div>
          )}
        </div>

        {/* 板块筛选 */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700">板块筛选:</label>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSectorFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${
                  sectorFilter === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                全部
              </button>
              {sectors.map(sector => (
                <button
                  key={sector}
                  onClick={() => setSectorFilter(sector)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    sectorFilter === sector 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 搜索结果 */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">搜索中...</p>
          </div>
        ) : searchQuery && filteredResults.length === 0 ? (
          <div className="text-center py-8">
            <FaSearch className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-500">未找到相关股票</p>
            <p className="text-sm text-gray-400 mt-1">请尝试其他关键词</p>
          </div>
        ) : (
          filteredResults.map((stock) => (
            <Link
              key={stock._id || stock.code}
              to={`/stock/${stock.code}`}
              className="block"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stock.type === 'crypto' ? 'bg-yellow-100' : 'bg-primary-100'
                    }`}>
                      {stock.type === 'crypto' ? (
                        <span className="text-yellow-600 font-bold text-lg">₿</span>
                      ) : (
                        <FaChartLine className="text-primary-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">{stock.code}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getSectorColor(stock.sector)}`}>
                          {stock.type === 'crypto' ? '加密货币' : stock.sector}
                        </span>
                      </div>
                      <p className="text-gray-600">{stock.name}</p>
                      <p className="text-sm text-gray-400">{stock.industry}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-lg font-semibold flex items-center justify-end ${
                      stock.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.changePercent > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                    </div>
                    <div className="text-gray-900 font-medium">${stock.currentPrice?.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">
                      成交量: {formatNumber(stock.volume)}
                    </div>
                    <div className="text-sm text-gray-500">
                      市值: {formatNumber(stock.marketCap)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* 搜索提示 */}
      {!searchQuery && (
        <div className="mt-12 text-center">
          <FaSearch className="mx-auto text-gray-300 text-6xl mb-4" />
          <h3 className="text-xl font-medium text-gray-500 mb-2">开始搜索美股</h3>
          <p className="text-gray-400 mb-6">输入股票代码或公司名称来搜索</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">50+</div>
              <div className="text-sm text-gray-500">热门股票</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">12</div>
              <div className="text-sm text-gray-500">主要板块</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">10+</div>
              <div className="text-sm text-gray-500">加密货币</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-1">实时</div>
              <div className="text-sm text-gray-500">价格数据</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch; 