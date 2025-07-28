import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStock } from '../contexts/StockContext';
import { 
  FaSearch, 
  FaUser, 
  FaSignOutAlt, 
  FaChartLine, 
  FaNewspaper,
  FaVideo,
  FaHeadset,
  FaBars,
  FaTimes,
  FaImage
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { searchStocks } = useStock();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchStocks(query);
      setSearchResults(results);
    } catch (error) {
      toast.error('搜索失败');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStockClick = (stockCode) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearch(false);
    navigate(`/stock/${stockCode}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaChartLine className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">首页</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/trading-log" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              交易日志
            </Link>
            <Link 
              to="/stock-analysis" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              股票分析
            </Link>
            <Link 
              to="/stock-search" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              美股搜索
            </Link>
            <Link 
              to="/video-articles" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              视频文章
            </Link>
            <Link 
              to="/trading-gallery" 
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              交易图分享
            </Link>
            {user && (
              <Link 
                to="/customer-service" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                客服系统
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="搜索股票或加密货币 (如: AAPL, BTC, Bitcoin)"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearch(true)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              
              {/* Search Results Dropdown */}
              {showSearch && (searchResults.length > 0 || isSearching) && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto z-50">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500">
                      搜索中...
                    </div>
                  ) : (
                    searchResults.map((stock) => (
                      <div
                        key={stock._id}
                        onClick={() => handleStockClick(stock.code)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{stock.code}</div>
                            <div className="text-sm text-gray-500">{stock.name}</div>
                            <div className="text-xs text-gray-400">
                              {stock.type === 'crypto' ? '加密货币' : stock.sector} • {stock.industry}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-sm font-medium ${
                              stock.changePercent > 0 ? 'stock-up' : 'stock-down'
                            }`}>
                              {stock.changePercent > 0 ? '+' : ''}{stock.changePercent?.toFixed(2)}%
                            </div>
                            <div className="text-xs text-gray-500">${stock.currentPrice?.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=3b82f6&color=fff`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{user.username}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link 
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-t-lg"
                  >
                    <FaUser className="inline mr-2" />
                    个人资料
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-b-lg"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    退出登录
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  登录
                </Link>
                <Link 
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-gray-700 hover:text-primary-600"
            >
              {showMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索股票或加密货币..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/trading-log" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaChartLine className="inline mr-2" />
                交易日志
              </Link>
              <Link 
                to="/stock-analysis" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaChartLine className="inline mr-2" />
                股票分析
              </Link>
              <Link 
                to="/stock-search" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaSearch className="inline mr-2" />
                美股搜索
              </Link>
              <Link 
                to="/video-articles" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaVideo className="inline mr-2" />
                视频文章
              </Link>
              <Link 
                to="/trading-gallery" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                <FaImage className="inline mr-2" />
                交易图分享
              </Link>
              {user && (
                <Link 
                  to="/customer-service" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <FaHeadset className="inline mr-2" />
                  客服系统
                </Link>
              )}
              {user ? (
                <>
                  <Link 
                    to="/profile"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <FaUser className="inline mr-2" />
                    个人资料
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    退出登录
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    登录
                  </Link>
                  <Link 
                    to="/register"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close search */}
      {showSearch && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowSearch(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 