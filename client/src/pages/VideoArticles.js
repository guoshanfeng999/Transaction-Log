import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaPlus, FaVideo, FaFileAlt, FaPlay, FaEye, FaThumbsUp, FaComment, FaShare, FaExternalLinkAlt, FaClock, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';

const VideoArticles = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 模拟来自各大财经网站的高浏览量内容
  const mockFinancialContent = [
    {
      id: 1,
      title: "美联储加息决策对美股市场的影响分析 - CNBC深度报道",
      content: "美联储最新加息决策引发市场震荡，分析师预测这将如何影响科技股、银行股和整体市场走势。专家解读加息背后的经济逻辑和投资机会。",
      author: {
        username: "CNBC财经分析师",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      source: "CNBC",
      views: 1250000,
      likes: 8900,
      comments: 1200,
      shares: 3400,
      duration: "15:32",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      videoUrl: "https://www.cnbc.com/video/2024/fed-rate-decision-impact",
      stockCodes: ["SPY", "QQQ", "XLF"],
      tags: ["美联储", "加息", "市场分析", "CNBC"]
    },
    {
      id: 2,
      title: "特斯拉Q4财报解读：电动车市场格局变化 - 彭博社",
      content: "特斯拉最新财报显示营收增长但利润率下降，分析师讨论电动车市场竞争加剧对特斯拉股价的影响，以及未来增长前景。",
      author: {
        username: "彭博社分析师",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "article",
      source: "Bloomberg",
      views: 890000,
      likes: 5600,
      comments: 890,
      shares: 2100,
      readTime: "8分钟",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      articleUrl: "https://www.bloomberg.com/news/articles/tesla-q4-earnings",
      stockCodes: ["TSLA", "NIO", "RIVN"],
      tags: ["特斯拉", "财报", "电动车", "彭博社"]
    },
    {
      id: 3,
      title: "苹果Vision Pro发布：AR/VR市场新格局 - 雅虎财经",
      content: "苹果Vision Pro正式发布，分析师评估其对AR/VR市场的影响，以及可能受益的相关股票。专家讨论苹果在元宇宙领域的战略布局。",
      author: {
        username: "雅虎财经记者",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      source: "Yahoo Finance",
      views: 2100000,
      likes: 15200,
      comments: 2300,
      shares: 5600,
      duration: "12:45",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      videoUrl: "https://finance.yahoo.com/video/apple-vision-pro-launch",
      stockCodes: ["AAPL", "META", "NVDA"],
      tags: ["苹果", "Vision Pro", "AR/VR", "雅虎财经"]
    },
    {
      id: 4,
      title: "人工智能投资热潮：哪些股票最值得关注 - 路透社",
      content: "AI技术快速发展推动相关股票大涨，路透社分析师盘点最具投资价值的AI概念股，包括芯片、软件和服务提供商。",
      author: {
        username: "路透社分析师",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "article",
      source: "Reuters",
      views: 1560000,
      likes: 9800,
      comments: 1450,
      shares: 3200,
      readTime: "12分钟",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      articleUrl: "https://www.reuters.com/technology/ai-investment-stocks",
      stockCodes: ["NVDA", "AMD", "MSFT", "GOOGL"],
      tags: ["人工智能", "投资", "科技股", "路透社"]
    },
    {
      id: 5,
      title: "房地产市场展望：2024年投资机会分析 - 华尔街日报",
      content: "房地产市场面临利率变化和供需关系调整，专家分析2024年房地产投资机会，包括REITs、建筑商和抵押贷款相关股票。",
      author: {
        username: "华尔街日报分析师",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      source: "Wall Street Journal",
      views: 980000,
      likes: 6700,
      comments: 980,
      shares: 1800,
      duration: "18:20",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      videoUrl: "https://www.wsj.com/video/real-estate-2024-outlook",
      stockCodes: ["VNQ", "LEN", "DHI", "TOL"],
      tags: ["房地产", "投资", "REITs", "华尔街日报"]
    },
    {
      id: 6,
      title: "能源市场动荡：油价波动对投资组合的影响 - 金融时报",
      content: "地缘政治紧张局势导致油价剧烈波动，金融时报分析这对能源股、航空股和整体市场的影响，以及投资者的应对策略。",
      author: {
        username: "金融时报记者",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      type: "article",
      source: "Financial Times",
      views: 1340000,
      likes: 8900,
      comments: 1200,
      shares: 2800,
      readTime: "10分钟",
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      articleUrl: "https://www.ft.com/content/oil-market-volatility",
      stockCodes: ["XOM", "CVX", "DAL", "UAL"],
      tags: ["能源", "油价", "地缘政治", "金融时报"]
    },
    {
      id: 7,
      title: "加密货币市场分析：比特币ETF获批后的影响 - CoinDesk",
      content: "比特币ETF获批引发市场关注，CoinDesk分析师讨论这对加密货币市场的影响，以及投资者应该如何配置数字资产。",
      author: {
        username: "CoinDesk分析师",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      source: "CoinDesk",
      views: 3200000,
      likes: 23400,
      comments: 3400,
      shares: 8900,
      duration: "22:15",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      videoUrl: "https://www.coindesk.com/video/bitcoin-etf-impact",
      stockCodes: ["GBTC", "BITO", "MSTR"],
      tags: ["比特币", "ETF", "加密货币", "CoinDesk"]
    },
    {
      id: 8,
      title: "医疗健康板块投资机会：生物科技股前景分析 - 巴伦周刊",
      content: "医疗健康板块在创新药物和生物技术推动下表现强劲，巴伦周刊分析最具潜力的生物科技股和医疗设备公司。",
      author: {
        username: "巴伦周刊分析师",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      type: "article",
      source: "Barron's",
      views: 760000,
      likes: 5400,
      comments: 780,
      shares: 1500,
      readTime: "14分钟",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      articleUrl: "https://www.barrons.com/articles/biotech-investment-opportunities",
      stockCodes: ["IBB", "XBI", "JNJ", "PFE"],
      tags: ["医疗健康", "生物科技", "投资", "巴伦周刊"]
    },
    {
      id: 9,
      title: "新兴市场投资策略：2024年最佳投资目的地 - 经济学人",
      content: "新兴市场在2024年展现投资机会，经济学人分析最具潜力的新兴市场国家，以及投资者应该如何配置资产。",
      author: {
        username: "经济学人分析师",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      type: "video",
      source: "The Economist",
      views: 1100000,
      likes: 7800,
      comments: 1100,
      shares: 2400,
      duration: "16:40",
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      videoUrl: "https://www.economist.com/video/emerging-markets-2024",
      stockCodes: ["EEM", "VWO", "IEMG"],
      tags: ["新兴市场", "投资策略", "全球资产", "经济学人"]
    }
  ];

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      setPosts(mockFinancialContent);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    toast.success('点赞成功');
  };

  const handleShare = (postId) => {
    toast.success('分享成功');
  };

  const getSourceColor = (source) => {
    const colors = {
      'CNBC': 'bg-red-100 text-red-800',
      'Bloomberg': 'bg-orange-100 text-orange-800',
      'Yahoo Finance': 'bg-purple-100 text-purple-800',
      'Reuters': 'bg-blue-100 text-blue-800',
      'Wall Street Journal': 'bg-gray-100 text-gray-800',
      'Financial Times': 'bg-pink-100 text-pink-800',
      'CoinDesk': 'bg-yellow-100 text-yellow-800',
      'Barron\'s': 'bg-green-100 text-green-800',
      'The Economist': 'bg-indigo-100 text-indigo-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.type === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面头部 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">财经视频文章</h1>
          <p className="mt-2 text-gray-600">来自全球顶级财经媒体的热门视频和深度文章</p>
        </div>
        {user && (
          <Link
            to="/video-articles/new"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <FaPlus className="mr-2" />
            发布内容
          </Link>
        )}
      </div>

      {/* 筛选 */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md font-medium ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部内容
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 rounded-md font-medium flex items-center ${
              filter === 'video'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaVideo className="mr-2" />
            视频
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-4 py-2 rounded-md font-medium flex items-center ${
              filter === 'article'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaFileAlt className="mr-2" />
            文章
          </button>
        </div>
      </div>

      {/* 内容列表 */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* 视频/图片预览 */}
              <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                
                {/* 播放按钮 */}
                {post.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                )}
                
                {/* 来源标签 */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceColor(post.source)}`}>
                    {post.source}
                  </span>
                </div>
                
                {/* 时长/阅读时间 */}
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs font-medium rounded bg-black bg-opacity-50 text-white">
                    {post.type === 'video' ? post.duration : post.readTime}
                  </span>
                </div>
              </div>

              {/* 内容信息 */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {post.author.username}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3 hover:text-primary-600 line-clamp-2 cursor-pointer">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.content}
                </p>

                {/* 股票标签 */}
                {post.stockCodes && post.stockCodes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.stockCodes.slice(0, 3).map((code, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full font-medium"
                      >
                        {code}
                      </span>
                    ))}
                    {post.stockCodes.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        +{post.stockCodes.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* 标签 */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
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
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                    >
                      <FaThumbsUp />
                      <span>{(post.likes / 1000).toFixed(1)}k</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <FaComment />
                      <span>{(post.comments / 1000).toFixed(1)}k</span>
                    </div>
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
                    >
                      <FaShare />
                      <span>{(post.shares / 1000).toFixed(1)}k</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <FaEye />
                      <span>{(post.views / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  
                  <a
                    href={post.type === 'video' ? post.videoUrl : post.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-1" />
                    查看原文
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📹</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">暂无内容</h3>
          <p className="text-gray-500">还没有发布任何视频或文章</p>
        </div>
      )}
    </div>
  );
};

export default VideoArticles; 