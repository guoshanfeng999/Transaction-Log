import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaPlus, FaFilter, FaSearch, FaThumbsUp, FaComment, FaShare, FaEye, FaChartLine, FaArrowUp, FaDollarSign, FaClock, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const TradingLog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  // 模拟优质交易策略数据
  const mockTradingStrategies = [
    {
      id: 1,
      title: "突破交易策略 - 强势股突破新高操作指南",
      content: "突破交易是捕捉强势股上涨机会的有效策略。当股票突破前期高点时，往往意味着新的上涨趋势开始。本策略重点关注成交量配合和突破确认信号。",
      author: {
        username: "专业交易员",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      type: "trading-strategy",
      stockCodes: ["AAPL", "TSLA", "NVDA"],
      likes: 156,
      comments: 23,
      shares: 45,
      views: 892,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "突破交易",
        risk: "中等",
        timeframe: "短期",
        successRate: "75%"
      },
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      tags: ["技术分析", "突破", "强势股"]
    },
    {
      id: 2,
      title: "价值投资策略 - 寻找被低估的优质公司",
      content: "价值投资是长期投资的核心策略，通过分析公司基本面，寻找市场价格低于内在价值的优质公司。重点关注PE、PB、ROE等财务指标。",
      author: {
        username: "价值投资者",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "investment-strategy",
      stockCodes: ["BRK.A", "JNJ", "PG"],
      likes: 203,
      comments: 31,
      shares: 67,
      views: 1245,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "价值投资",
        risk: "低",
        timeframe: "长期",
        successRate: "85%"
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["基本面分析", "价值投资", "长期持有"]
    },
    {
      id: 3,
      title: "日内交易策略 - 短线操作技巧详解",
      content: "日内交易适合有经验的投资者，通过分析盘面走势和成交量变化，在一天内完成买卖操作。需要严格的风险控制和止损策略。",
      author: {
        username: "日内交易专家",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      type: "day-trading",
      stockCodes: ["SPY", "QQQ", "IWM"],
      likes: 89,
      comments: 15,
      shares: 28,
      views: 567,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "日内交易",
        risk: "高",
        timeframe: "超短期",
        successRate: "60%"
      },
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      tags: ["日内交易", "短线", "技术分析"]
    },
    {
      id: 4,
      title: "趋势跟踪策略 - 跟随市场主趋势获利",
      content: "趋势跟踪策略的核心是识别并跟随市场主趋势，通过移动平均线、MACD等技术指标判断趋势方向，在趋势确立后入场。",
      author: {
        username: "趋势分析师",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "trend-following",
      stockCodes: ["MSFT", "GOOGL", "AMZN"],
      likes: 134,
      comments: 19,
      shares: 42,
      views: 789,
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "趋势跟踪",
        risk: "中等",
        timeframe: "中期",
        successRate: "70%"
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["趋势分析", "移动平均线", "MACD"]
    },
    {
      id: 5,
      title: "期权策略 - 保护性看跌期权组合",
      content: "期权策略可以用于风险对冲和收益增强。保护性看跌期权组合通过购买看跌期权来保护股票投资，在下跌时限制损失。",
      author: {
        username: "期权专家",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      type: "options-strategy",
      stockCodes: ["AAPL", "TSLA"],
      likes: 78,
      comments: 12,
      shares: 25,
      views: 456,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "期权策略",
        risk: "中等",
        timeframe: "短期",
        successRate: "65%"
      },
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      tags: ["期权", "风险对冲", "保护性策略"]
    },
    {
      id: 6,
      title: "量化交易策略 - 基于技术指标的自动化交易",
      content: "量化交易通过数学模型和算法分析市场数据，自动执行交易决策。本策略基于RSI、布林带等技术指标构建交易信号。",
      author: {
        username: "量化分析师",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "quantitative",
      stockCodes: ["SPY", "QQQ", "DIA"],
      likes: 167,
      comments: 28,
      shares: 53,
      views: 923,
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      strategy: {
        type: "量化交易",
        risk: "中等",
        timeframe: "短期",
        successRate: "72%"
      },
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      tags: ["量化交易", "算法", "技术指标"]
    }
  ];

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setPosts(mockTradingStrategies);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    console.log('点赞文章:', postId); // 添加调试日志
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast.success('点赞成功！');
  };

  const handleShare = (postId) => {
    console.log('分享文章:', postId); // 添加调试日志
    // 模拟分享功能
    const post = posts.find(p => p.id === postId);
    if (post) {
      const shareText = `分享一个优质交易策略：${post.title}`;
      if (navigator.share) {
        navigator.share({
          title: post.title,
          text: shareText,
          url: window.location.href
        }).catch(() => {
          // 如果不支持原生分享，复制到剪贴板
          navigator.clipboard.writeText(shareText);
          toast.success('分享内容已复制到剪贴板！');
        });
      } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText);
        toast.success('分享内容已复制到剪贴板！');
      }
    } else {
      toast.success('分享成功！');
    }
  };

  const handleComment = (postId) => {
    console.log('评论文章:', postId); // 添加调试日志
    const post = posts.find(p => p.id === postId);
    setSelectedPost(post);
    setShowCommentModal(true);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) {
      toast.error('请输入评论内容');
      return;
    }
    
    if (selectedPost) {
      setPosts(posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
      toast.success('评论发布成功！');
      setCommentText('');
      setShowCommentModal(false);
      setSelectedPost(null);
    }
  };

  const getStrategyColor = (type) => {
    const colors = {
      'trading-strategy': 'bg-blue-100 text-blue-800',
      'investment-strategy': 'bg-green-100 text-green-800',
      'day-trading': 'bg-red-100 text-red-800',
      'trend-following': 'bg-purple-100 text-purple-800',
      'options-strategy': 'bg-orange-100 text-orange-800',
      'quantitative': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getRiskColor = (risk) => {
    const colors = {
      '低': 'text-green-600',
      '中等': 'text-yellow-600',
      '高': 'text-red-600'
    };
    return colors[risk] || 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面头部 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">交易策略库</h1>
          <p className="mt-2 text-gray-600">专业的股票交易策略和市场分析</p>
        </div>
        {user && (
          <Link
            to="/trading-log/new"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <FaPlus className="mr-2" />
            发布策略
          </Link>
        )}
      </div>

      {/* 筛选和搜索 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">全部策略</option>
              <option value="trading-strategy">突破交易</option>
              <option value="investment-strategy">价值投资</option>
              <option value="day-trading">日内交易</option>
              <option value="trend-following">趋势跟踪</option>
              <option value="options-strategy">期权策略</option>
              <option value="quantitative">量化交易</option>
            </select>
          </div>
          
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="搜索策略、股票或加密货币..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {/* 策略列表 */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative">
              {/* 时间标签 - 移到卡片右上角 */}
              <div className="absolute top-3 right-3 z-20">
                <div className="px-3 py-1 text-xs font-medium rounded-full bg-primary-600 text-white shadow-lg">
                  📅 {post.createdAt.toLocaleDateString()}
                </div>
              </div>
              
              {/* 策略图片 */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStrategyColor(post.type)} bg-white bg-opacity-90`}>
                    {post.strategy.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getRiskColor(post.strategy.risk)} bg-white bg-opacity-90`}>
                    风险: {post.strategy.risk}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium rounded bg-white bg-opacity-90 text-gray-700">
                    成功率: {post.strategy.successRate}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-gray-900">
                        {post.author.username}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    
                    {/* 策略信息 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <FaClock className="text-gray-400" />
                        <span className="text-sm text-gray-600">{post.strategy.timeframe}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaArrowUp className="text-gray-400" />
                        <span className="text-sm text-gray-600">成功率 {post.strategy.successRate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-gray-400" />
                        <span className={`text-sm ${getRiskColor(post.strategy.risk)}`}>
                          风险 {post.strategy.risk}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaChartLine className="text-gray-400" />
                        <span className="text-sm text-gray-600">{post.strategy.type}</span>
                      </div>
                    </div>
                    
                    {/* 股票标签 */}
                    {post.stockCodes && post.stockCodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.stockCodes.map((code, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full font-medium"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* 互动按钮 */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleLike(post.id);
                          }}
                          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-red-50"
                        >
                          <FaThumbsUp className="text-lg" />
                          <span className="font-medium">{post.likes}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleComment(post.id);
                          }}
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-blue-50"
                        >
                          <FaComment className="text-lg" />
                          <span className="font-medium">{post.comments}</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleShare(post.id);
                          }}
                          className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors cursor-pointer p-2 rounded-lg hover:bg-green-50"
                        >
                          <FaShare className="text-lg" />
                          <span className="font-medium">{post.shares}</span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaEye />
                          <span>{post.views}</span>
                        </div>
                      </div>
                      
                      <button className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无策略</h3>
          <p className="text-gray-500">还没有发布任何交易策略</p>
        </div>
      )}

      {/* 评论模态框 */}
      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">发表评论</h3>
              <button 
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedPost(null);
                  setCommentText('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{selectedPost.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{selectedPost.content}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">评论内容</label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="分享你的想法..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCommentModal(false);
                  setSelectedPost(null);
                  setCommentText('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmitComment}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                发布评论
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingLog; 