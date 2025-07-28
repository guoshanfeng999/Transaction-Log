import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import realTimeStockService from '../utils/realTimeStockService';
import StockChart from '../components/StockChart';
import { 
  FaArrowLeft, 
  FaArrowUp, 
  FaArrowDown, 
  FaNewspaper,
  FaEye,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaClock,
  FaDollarSign,
  FaPercent,
  FaVolumeUp,
  FaSync,
  FaExternalLinkAlt
} from 'react-icons/fa';

const StockDetail = () => {
  const { code } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRealTime, setIsRealTime] = useState(true);
  const [articles, setArticles] = useState([
    {
      id: 1,
      type: '技术分析',
      title: '技术分析：突破关键阻力位，上涨趋势确立',
      content: '今日股价表现强劲，成功突破关键阻力位，技术指标显示上涨趋势已经确立。从日线图来看，股价已经站稳在均线系统之上...',
      author: '张明轩',
      date: '2024-01-15',
      views: 1250,
      likes: 89,
      comments: 23,
      liked: false
    },
    {
      id: 2,
      type: '基本面分析',
      title: '基本面分析：财报超预期，增长前景看好',
      content: '最新财报显示，公司业绩超出市场预期，营收和利润均实现强劲增长。管理层对未来发展前景表示乐观...',
      author: '张明轩',
      date: '2024-01-14',
      views: 980,
      likes: 67,
      comments: 18,
      liked: false
    },
    {
      id: 3,
      type: '投资策略',
      title: '投资策略：当前价位是否适合买入？',
      content: '基于当前市场环境和基本面情况，本文将从多个角度分析当前价位是否适合投资者买入...',
      author: '张明轩',
      date: '2024-01-13',
      views: 1560,
      likes: 120,
      comments: 45,
      liked: false
    }
  ]);








  useEffect(() => {
    const fetchStockDetail = async () => {
      setLoading(true);
      try {
        // 尝试获取实时数据
        const realTimeData = await realTimeStockService.getStockDetail(code);
        setStock(realTimeData);
        setLastUpdated(new Date());
        setIsRealTime(true);
      } catch (error) {
        console.error('获取实时股票数据失败，使用模拟数据:', error);
        // 降级到模拟数据
        const mockData = realTimeStockService.getMockStockDetail(code);
        setStock(mockData);
        setLastUpdated(new Date());
        setIsRealTime(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetail();

    // 订阅实时价格更新
    const handlePriceUpdate = (updatedStock) => {
      setStock(prevStock => ({
        ...prevStock,
        ...updatedStock,
        lastUpdated: new Date().toISOString()
      }));
      setLastUpdated(new Date());
    };

    realTimeStockService.subscribeToPriceUpdates(code, handlePriceUpdate);

    // 清理订阅
    return () => {
      realTimeStockService.unsubscribeFromPriceUpdates(code, handlePriceUpdate);
    };
  }, [code]);

  // 处理文章点赞
  const handleArticleLike = (articleId) => {
    console.log('点赞文章:', articleId);
    console.log('当前文章状态:', articles.find(a => a.id === articleId));
    
    setArticles(prevArticles => {
      const newArticles = prevArticles.map(article => 
        article.id === articleId 
          ? { 
              ...article, 
              likes: article.liked ? article.likes - 1 : article.likes + 1,
              liked: !article.liked 
            }
          : article
      );
      console.log('更新后的文章:', newArticles.find(a => a.id === articleId));
      return newArticles;
    });
    
    // 添加用户反馈
    alert(`点赞成功！文章ID: ${articleId}`);
  };

  // 处理文章评论
  const handleArticleComment = (articleId) => {
    console.log('打开评论对话框:', articleId);
    // 添加用户反馈
    alert('评论功能即将上线！');
  };

  // 处理文章分享
  const handleArticleShare = (articleId) => {
    console.log('分享文章:', articleId);
    // 添加用户反馈
    alert('分享功能即将上线！');
  };



  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          返回首页
        </Link>
      </div>

      {/* 股票基本信息 */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{stock?.code}</h1>
              <div className="flex items-center space-x-2">
                {isRealTime ? (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>实时</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>模拟</span>
                  </div>
                )}
                {lastUpdated && (
                  <span className="text-xs text-gray-500">
                    更新于 {lastUpdated.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg text-gray-600">{stock?.name}</p>
            <p className="text-sm text-gray-500">{stock?.sector} • {stock?.industry}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">${stock?.currentPrice?.toFixed(2)}</div>
            <div className={`text-lg font-semibold flex items-center justify-end ${
              stock?.changePercent > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {stock?.changePercent > 0 ? (
                <FaArrowUp className="mr-1" />
              ) : (
                <FaArrowDown className="mr-1" />
              )}
              {stock?.changePercent > 0 ? '+' : ''}{stock?.change?.toFixed(2)} ({stock?.changePercent > 0 ? '+' : ''}{stock?.changePercent?.toFixed(2)}%)
            </div>
            <div className="flex items-center justify-end space-x-2 mt-2">
              <button 
                onClick={() => window.location.reload()}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="刷新数据"
              >
                <FaSync />
              </button>
              <a 
                href={`https://finance.yahoo.com/quote/${stock?.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="在Yahoo Finance查看"
              >
                <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <FaDollarSign className="mr-2" />
              <span className="text-sm">市值</span>
            </div>
            <div className="font-semibold text-gray-900">{stock?.marketCapFormatted}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <FaVolumeUp className="mr-2" />
              <span className="text-sm">成交量</span>
            </div>
            <div className="font-semibold text-gray-900">{stock?.volumeFormatted}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <FaPercent className="mr-2" />
              <span className="text-sm">P/E比率</span>
            </div>
            <div className="font-semibold text-gray-900">{stock?.pe}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-1">
              <FaDollarSign className="mr-2" />
              <span className="text-sm">股息</span>
            </div>
            <div className="font-semibold text-gray-900">{stock?.dividend}%</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 走势图 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">实时价格走势</h3>
              <div className="flex items-center space-x-2">
                {isRealTime && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>实时更新</span>
                  </div>
                )}
                <div className="flex space-x-2">
                  {['1D', '1W', '1M'].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        selectedTimeframe === timeframe
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {timeframe}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {stock?.priceData && stock.priceData.length > 0 ? (
              <div className="h-80">
                <StockChart 
                  data={stock.priceData}
                  symbol={stock.code}
                  color={stock.changePercent >= 0 ? '#10B981' : '#EF4444'}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-80">
                <div className="text-gray-500">暂无数据</div>
              </div>
            )}
            
            {/* 实时更新指示器 */}
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  {isRealTime ? '实时更新中' : '模拟数据'}
                </span>
                {lastUpdated && (
                  <span className="text-sm text-gray-500">
                    • 最后更新: {lastUpdated.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 交易信息 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">交易信息</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">开盘价</span>
                <span className="font-medium">${stock?.open?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最高价</span>
                <span className="font-medium">${stock?.high?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最低价</span>
                <span className="font-medium">${stock?.low?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">昨收价</span>
                <span className="font-medium">${stock?.prevClose?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">日内区间</span>
                <span className="font-medium">{stock?.dayRange}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52周区间</span>
                <span className="font-medium">{stock?.yearRange}</span>
              </div>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">投资操作</h3>
            <div className="space-y-3">
              <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                添加到自选股
              </button>
              <button className="w-full border border-primary-600 text-primary-600 py-2 rounded-lg hover:bg-primary-50 transition-colors">
                设置价格提醒
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 股票分析文章 */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FaNewspaper className="mr-3 text-primary-600" />
            {code} 股票分析
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {
                console.log('测试按钮点击');
                alert('测试按钮工作正常！');
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              测试按钮
            </button>
            <Link 
              to="/trading-log"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              查看全部分析
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="mb-3">
                <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                  {article.type}
                </span>
              </div>
              <Link to={`/article/${article.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-primary-600 transition-colors">
                  {code} {article.title}
                </h3>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.content}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>{article.author}</span>
                  <span className="flex items-center">
                    <FaClock className="mr-1" />
                    {article.date}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <FaEye className="mr-1" />
                    {article.views}
                  </span>
                  {/* 测试按钮 */}
                  <button 
                    onClick={() => alert(`测试点击文章 ${article.id}`)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                  >
                    测试
                  </button>
                  <button 
                    onClick={() => {
                      console.log('点赞按钮被点击，文章ID:', article.id);
                      alert(`正在点赞文章 ${article.id}`);
                      handleArticleLike(article.id);
                    }}
                    className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 cursor-pointer border ${
                      article.liked 
                        ? 'text-primary-600 bg-primary-50 border-primary-200 hover:bg-primary-100' 
                        : 'text-gray-500 border-gray-200 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    title="点赞"
                    style={{ minWidth: '60px' }}
                  >
                    <FaThumbsUp className="mr-1" />
                    <span>{article.likes}</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('评论按钮被点击，文章ID:', article.id);
                      alert(`正在评论文章 ${article.id}`);
                      handleArticleComment(article.id);
                    }}
                    className="flex items-center px-3 py-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200"
                    title="评论"
                    style={{ minWidth: '60px' }}
                  >
                    <FaComment className="mr-1" />
                    <span>{article.comments}</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('分享按钮被点击，文章ID:', article.id);
                      alert(`正在分享文章 ${article.id}`);
                      handleArticleShare(article.id);
                    }}
                    className="flex items-center px-3 py-2 rounded-md text-gray-500 hover:text-primary-600 hover:bg-gray-50 transition-all duration-200 cursor-pointer border border-gray-200"
                    title="分享"
                    style={{ minWidth: '60px' }}
                  >
                    <FaShare className="mr-1" />
                    <span>分享</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetail; 