import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaHeart, 
  FaComment, 
  FaShare,
  FaPlus,
  FaTimes,
  FaChartLine,
  FaSync,
  FaTrendingUp,
  FaTrendingDown
} from 'react-icons/fa';
import StockChart from '../components/StockChart';
import { generateMarketStrategyChart, getMarketSentiment } from '../utils/marketData';

const TradingGallery = () => {
  const [posts, setPosts] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [marketSentiment, setMarketSentiment] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    tags: '',
    tradeType: 'long',
    symbol: 'AAPL'
  });

  // 格式化时间函数
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 生成实时大盘策略数据
  const generateRealTimePosts = async () => {
    const strategyTypes = ['trend', 'growth', 'value', 'smallcap', 'momentum', 'contrarian'];
    const strategyNames = {
      'trend': '趋势跟踪策略',
      'growth': '成长股策略', 
      'value': '价值投资策略',
      'smallcap': '小盘股策略',
      'momentum': '动量策略',
      'contrarian': '逆向投资策略'
    };
    const posts = [];
    
    for (let i = 0; i < 6; i++) {
      const strategyType = strategyTypes[i];
      const strategyName = strategyNames[strategyType];
      
      try {
        const marketStrategy = await generateMarketStrategyChart(strategyType);
        if (marketStrategy) {
          const post = {
            id: i + 1,
            title: `${marketStrategy.name} - ${strategyName}`,
            description: `基于${marketStrategy.name}的${strategyName}分析。当前价格$${marketStrategy.currentPrice}，${marketStrategy.change >= 0 ? '上涨' : '下跌'}${Math.abs(marketStrategy.change)}美元(${marketStrategy.changePercent >= 0 ? '+' : ''}${marketStrategy.changePercent}%)。市场趋势：${marketStrategy.trend === 'bullish' ? '看涨' : marketStrategy.trend === 'bearish' ? '看跌' : '中性'}。`,
            symbol: marketStrategy.symbol,
            strategyType: strategyType,
            chartData: marketStrategy.priceData,
            currentPrice: marketStrategy.currentPrice,
            change: marketStrategy.change,
            changePercent: marketStrategy.changePercent,
            trend: marketStrategy.trend,
            isRealTime: marketStrategy.isRealTime,
            tags: [marketStrategy.symbol, strategyName, marketStrategy.isRealTime ? '实时数据' : '模拟数据'],
            date: new Date().toISOString().split('T')[0],
            time: formatTime(new Date(Date.now() - i * 60 * 60 * 1000)),
            author: '市场分析师',
            likes: Math.floor(Math.random() * 50) + 10,
            comments: Math.floor(Math.random() * 20) + 5,
            shares: Math.floor(Math.random() * 10) + 2
          };
          posts.push(post);
        }
      } catch (error) {
        console.error(`生成${strategyType}策略失败:`, error);
      }
    }
    
    return posts;
  };

  // 初始化数据
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const realTimePosts = await generateRealTimePosts();
        setPosts(realTimePosts);
        
        // 获取市场情绪
        const sentiment = await getMarketSentiment();
        setMarketSentiment(sentiment);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('加载策略分析失败:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // 实时更新交易记录的时间和数据
  useEffect(() => {
    const timer = setInterval(async () => {
      // 更新时间和重新获取数据
      try {
        const updatedPosts = await generateRealTimePosts();
        setPosts(updatedPosts);
        
        // 更新市场情绪
        const sentiment = await getMarketSentiment();
        setMarketSentiment(sentiment);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('更新数据失败:', error);
        // 如果更新失败，只更新时间
        setPosts(prevPosts => 
          prevPosts.map(post => ({
            ...post,
            time: formatTime(new Date())
          }))
        );
      }
    }, 30000); // 每30秒更新一次

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    if (!newPost.title || !newPost.description || !newPost.symbol) {
      alert('请填写完整信息');
      return;
    }

    try {
      const marketStrategy = await generateMarketStrategyChart(newPost.tradeType);
      if (marketStrategy) {
        const post = {
          id: Date.now(),
          title: newPost.title,
          description: newPost.description,
          symbol: marketStrategy.symbol,
          strategyType: newPost.tradeType,
          chartData: marketStrategy.priceData,
          currentPrice: marketStrategy.currentPrice,
          change: marketStrategy.change,
          changePercent: marketStrategy.changePercent,
          trend: marketStrategy.trend,
          isRealTime: marketStrategy.isRealTime,
          tags: newPost.tags.split(',').map(tag => tag.trim()),
          author: '市场分析师',
          likes: 0,
          comments: 0,
          shares: 0,
          date: new Date().toISOString().split('T')[0],
          time: formatTime(new Date())
        };

        setPosts([post, ...posts]);
        setShowUploadModal(false);
        setNewPost({
          title: '',
          description: '',
          tags: '',
          tradeType: 'trend',
          symbol: 'SPY'
        });
      }
    } catch (error) {
      console.error('创建策略分析失败:', error);
      alert('创建策略分析失败，请重试');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
    setShowCommentModal(true);
    
    // 如果没有该帖子的评论数据，初始化一些模拟评论
    if (!comments[postId]) {
      const mockComments = [
        {
          id: Date.now() - 2000,
          author: '李投资',
          content: '很好的交易策略，学习了！这个入场时机把握得很准。',
          time: '2小时前',
          postId: postId,
          likes: 5
        },
        {
          id: Date.now() - 1000,
          author: '王分析师',
          content: '技术分析很到位，支持！这种突破形态确实值得关注。',
          time: '1小时前',
          postId: postId,
          likes: 3
        },
        {
          id: Date.now() - 500,
          author: '张交易员',
          content: '请问这个止损位是怎么设置的？能分享一下具体的风险管理策略吗？',
          time: '30分钟前',
          postId: postId,
          likes: 2
        },
        {
          id: Date.now() - 200,
          author: '陈投资者',
          content: '收益不错！我也在关注这支股票，希望能有更多分享。',
          time: '15分钟前',
          postId: postId,
          likes: 1
        }
      ];
      setComments(prev => ({
        ...prev,
        [postId]: mockComments
      }));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert('请输入评论内容');
      return;
    }

    if (newComment.length > 500) {
      alert('评论内容不能超过500字符');
      return;
    }

    const newCommentObj = {
      id: Date.now(),
      author: '当前用户',
      content: newComment,
      time: new Date().toLocaleString('zh-CN'),
      postId: selectedPost.id,
      likes: 0
    };

    // 添加评论到状态
    setComments(prev => ({
      ...prev,
      [selectedPost.id]: [...(prev[selectedPost.id] || []), newCommentObj]
    }));

    // 更新帖子的评论数
    setPosts(posts.map(post => 
      post.id === selectedPost.id 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));

    setNewComment('');
    setShowCommentModal(false);
    alert('评论已发布！');
  };

  const handleCommentLike = (commentId) => {
    if (!selectedPost) return;
    
    setComments(prev => ({
      ...prev,
      [selectedPost.id]: prev[selectedPost.id].map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    }));
  };

  const handleShare = (postId) => {
    const post = posts.find(p => p.id === postId);
    const shareText = `分享一个${post.symbol}${post.tradeType === 'long' ? '做多' : '做空'}交易案例，收益${post.profit >= 0 ? '+' : ''}${post.profit.toFixed(2)}美元 (${post.profitPercent >= 0 ? '+' : ''}${post.profitPercent.toFixed(2)}%)`;
    const shareUrl = `${window.location.origin}/trading-gallery/${postId}`;
    
    // 尝试使用 Web Share API
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: shareText,
        url: shareUrl
      }).then(() => {
        // 分享成功，更新分享数
        setPosts(posts.map(p => 
          p.id === postId ? { ...p, shares: p.shares + 1 } : p
        ));
      }).catch((error) => {
        console.log('分享失败:', error);
        // 降级到复制链接
        copyToClipboard(shareUrl, shareText);
      });
    } else {
      // 降级到复制链接
      copyToClipboard(shareUrl, shareText);
    }
  };

  const copyToClipboard = (url, text) => {
    const fullText = `${text}\n\n查看详情：${url}`;
    navigator.clipboard.writeText(fullText).then(() => {
      alert('分享内容已复制到剪贴板！');
    }).catch(() => {
      alert(`分享内容：\n${fullText}`);
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">加载实时交易数据中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">美股大盘策略库</h1>
        <p className="text-gray-600">实时美股大盘走势分析与投资策略分享</p>
      </div>

      {/* 市场情绪指示器 */}
      {marketSentiment && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaChartLine className="text-primary-600 text-xl" />
                <h2 className="text-lg font-semibold text-gray-900">市场情绪</h2>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                marketSentiment.sentiment === 'bullish' 
                  ? 'bg-green-100 text-green-800' 
                  : marketSentiment.sentiment === 'bearish'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {marketSentiment.sentiment === 'bullish' ? '乐观' : 
                 marketSentiment.sentiment === 'bearish' ? '悲观' : '中性'}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FaSync className="animate-spin" />
              <span>最后更新: {lastUpdated?.toLocaleTimeString('zh-CN')}</span>
            </div>
          </div>
          <p className="mt-2 text-gray-600">{marketSentiment.description}</p>
          <div className="mt-3 flex items-center space-x-4 text-sm">
            <span className="text-gray-500">整体趋势: </span>
            <span className={`font-medium ${
              marketSentiment.overallTrend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {marketSentiment.overallTrend >= 0 ? '+' : ''}{marketSentiment.overallTrend.toFixed(2)}%
            </span>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <FaPlus />
          <span>分享策略分析</span>
        </button>
        
        <button
          onClick={async () => {
            try {
              setLoading(true);
              const updatedPosts = await generateRealTimePosts();
              setPosts(updatedPosts);
              
              const sentiment = await getMarketSentiment();
              setMarketSentiment(sentiment);
              setLastUpdated(new Date());
            } catch (error) {
              console.error('刷新数据失败:', error);
            } finally {
              setLoading(false);
            }
          }}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          disabled={loading}
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
          <span>{loading ? '更新中...' : '刷新数据'}</span>
        </button>
      </div>

      {/* 数据更新状态 */}
      {loading && (
        <div className="mb-4 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-primary-600">
            <FaSync className="animate-spin" />
            <span>正在更新大盘数据...</span>
          </div>
        </div>
      )}

      {/* 交易图列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* 大盘走势图 */}
            <div className="relative p-4">
              <div className="w-full h-40 rounded-lg mb-4 bg-white border border-gray-200 overflow-hidden">
                <StockChart 
                  key={`${post.symbol}-${post.lastUpdated || Date.now()}`}
                  data={post.chartData.map(point => ({
                    price: point.price,
                    time: new Date(point.time).toLocaleTimeString('zh-CN', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })
                  }))}
                  symbol={post.symbol}
                  color={post.changePercent >= 0 ? '#10B981' : '#EF4444'}
                />
              </div>
              {/* 策略类型和实时状态标签 */}
              <div className="absolute top-6 right-6 flex flex-col space-y-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                  post.trend === 'bullish' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : post.trend === 'bearish'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}>
                  {post.trend === 'bullish' ? '看涨' : post.trend === 'bearish' ? '看跌' : '中性'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                  post.isRealTime 
                    ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                }`}>
                  {post.isRealTime ? '实时' : '模拟'}
                </span>
              </div>
            </div>

            {/* 内容 */}
            <div className="p-6">
              {/* 标题 */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h3>
              
              {/* 价格变化信息 */}
              <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-lg mb-3 ${
                post.changePercent >= 0 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span className="text-sm font-medium">价格:</span>
                <span className="text-lg font-bold">
                  ${post.currentPrice}
                </span>
                <span className="text-sm">
                  ({post.changePercent >= 0 ? '+' : ''}{post.changePercent.toFixed(2)}%)
                </span>
              </div>

              {/* 策略详情 */}
              <div className="mb-4 text-sm text-gray-600">
                <p className="mt-2">{post.description}</p>
              </div>

              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 作者和时间 */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <FaUser className="mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  {post.date} · {post.time}
                </div>
              </div>

              {/* 互动按钮 */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FaHeart />
                    <span>{post.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleComment(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FaComment />
                    <span>{post.comments}</span>
                  </button>
                  <button 
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                  >
                    <FaShare />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 上传模态框 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">分享策略分析</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">策略类型</label>
                <select
                  value={newPost.tradeType}
                  onChange={(e) => setNewPost({...newPost, tradeType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="trend">趋势跟踪策略</option>
                  <option value="growth">成长股策略</option>
                  <option value="value">价值投资策略</option>
                  <option value="smallcap">小盘股策略</option>
                  <option value="momentum">动量策略</option>
                  <option value="contrarian">逆向投资策略</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="输入交易标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                <textarea
                  value={newPost.description}
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="描述您的交易策略和心得"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标签</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="用逗号分隔标签，如：技术分析,突破"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors"
                >
                  分享交易图
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 评论模态框 */}
      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">评论详情 - {selectedPost.title}</h3>
              <button 
                onClick={() => setShowCommentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            {/* 原帖信息 */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-500" />
                  <span className="text-sm font-medium">{selectedPost.author}</span>
                  <span className="text-sm text-gray-500">·</span>
                  <span className="text-sm text-gray-500">{selectedPost.date} {selectedPost.time}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>❤️ {selectedPost.likes}</span>
                  <span>💬 {selectedPost.comments}</span>
                  <span>📤 {selectedPost.shares}</span>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">{selectedPost.title}</h4>
              <p className="text-sm text-gray-700 mb-3">{selectedPost.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-600">入场: <span className="font-medium">${selectedPost.entryPrice}</span></span>
                <span className="text-gray-600">出场: <span className="font-medium">${selectedPost.exitPrice}</span></span>
                <span className={`font-medium ${selectedPost.profit >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  收益: {selectedPost.profit >= 0 ? '+' : ''}{selectedPost.profit.toFixed(2)} ({selectedPost.profitPercent >= 0 ? '+' : ''}{selectedPost.profitPercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">全部评论 ({selectedPost.comments})</h4>
                <div className="text-sm text-gray-500">按时间排序</div>
              </div>
              
              <div className="space-y-4">
                {/* 动态评论 */}
                {comments[selectedPost.id] && comments[selectedPost.id].map((comment) => (
                  <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {comment.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500 ml-2">{comment.time}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleCommentLike(comment.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        ❤️ {comment.likes || 0}
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                                         <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                       <button className="text-xs text-gray-500 hover:text-blue-500 transition-colors">
                         回复
                       </button>
                       <button 
                         onClick={() => handleCommentLike(comment.id)}
                         className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                       >
                         点赞 ({comment.likes || 0})
                       </button>
                       <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                         举报
                       </button>
                     </div>
                  </div>
                ))}
                
                {/* 无评论状态 */}
                {(!comments[selectedPost.id] || comments[selectedPost.id].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">💬</div>
                    <p className="text-lg font-medium mb-2">还没有评论</p>
                    <p className="text-sm">快来发表第一条评论吧！</p>
                  </div>
                )}
              </div>
            </div>

            {/* 添加评论 */}
            <div className="border-t pt-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">我</span>
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="写下您的评论，分享您的观点..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                                     <div className="flex items-center justify-between mt-3">
                     <div className={`text-xs ${
                       newComment.length > 450 ? 'text-red-500' : 
                       newComment.length > 400 ? 'text-yellow-500' : 
                       'text-gray-500'
                     }`}>
                       {newComment.length}/500 字符
                     </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowCommentModal(false)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        取消
                      </button>
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        发表评论
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingGallery; 