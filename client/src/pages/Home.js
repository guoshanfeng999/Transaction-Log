import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStock } from '../contexts/StockContext';
import { useAuth } from '../contexts/AuthContext';
import StockChart from '../components/StockChart';
import stockChatGenerator from '../utils/stockChatData';
import { 
  FaChartLine, 
  FaTrophy, 
  FaGraduationCap, 
  FaAward,
  FaArrowUp,
  FaArrowDown,
  FaEye,
  FaThumbsUp,
  FaShare,
  FaComment,
  FaClock,
  FaLayerGroup,
  FaUserTie,
  FaChartBar,
  FaNewspaper
} from 'react-icons/fa';

const Home = () => {
  const { hotStocks, topGainers, hotSectors, loading } = useStock();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasError, setHasError] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  // 实时更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 错误处理
  useEffect(() => {
    if (loading === false && (hotStocks.length === 0 || topGainers.length === 0 || hotSectors.length === 0)) {
      setHasError(true);
    }
  }, [loading, hotStocks, topGainers, hotSectors]);

  // 初始化聊天消息
  useEffect(() => {
    const initialMessages = stockChatGenerator.generateRealTimeStream();
    setChatMessages(initialMessages);
  }, []);

  // 自动滚动交流框和添加新消息
  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer');
    
    // 滚动逻辑
    const scrollInterval = setInterval(() => {
      if (chatContainer) {
        if (chatContainer.scrollTop >= chatContainer.scrollHeight - chatContainer.clientHeight) {
          chatContainer.scrollTop = 0;
        } else {
          chatContainer.scrollTop += 1;
        }
      }
    }, 50);

    // 添加新消息逻辑
    const messageInterval = setInterval(() => {
      const newMessage = stockChatGenerator.generateMessage();
      setChatMessages(prev => {
        const updated = [...prev, {
          ...newMessage,
          relativeTime: stockChatGenerator.getRelativeTime(newMessage.timestamp)
        }];
        // 保持最多30条消息
        return updated.slice(-30);
      });
    }, 8000); // 每8秒添加一条新消息

    return () => {
      clearInterval(scrollInterval);
      clearInterval(messageInterval);
    };
  }, []);

  // 格式化时间显示
  const formatTime = (date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  // 计算相对时间
  const getRelativeTime = (date) => {
    const postDate = date instanceof Date ? date : new Date(date);
    const now = currentTime;
    const diffInMs = now - postDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 0) {
      return `${diffInDays}天前`;
    } else if (diffInHours > 0) {
      return `${diffInHours}小时前`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      if (diffInMinutes > 0) {
        return `${diffInMinutes}分钟前`;
      } else {
        return '刚刚';
      }
    }
  };

  // 分析师信息
  const analyst = {
    name: "张明轩",
    title: "资深美股分析师",
    experience: 15,
    bio: "专注于美股市场分析15年，擅长技术分析和基本面分析相结合的投资策略。曾在多家知名金融机构担任首席分析师，对科技股、金融股、消费股等板块有深入研究。",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    certifications: [
      "CFA特许金融分析师",
      "FRM金融风险管理师",
      "证券投资顾问资格证"
    ],
    achievements: [
      "连续5年美股投资收益率超过20%",
      "成功预测2020年科技股牛市",
      "管理资产规模超过1亿美元"
    ]
  };

  // 模拟股票数据（当API失败时使用）
  const mockStockData = {
    hotStocks: [
      { code: 'AAPL', name: '苹果公司', currentPrice: 185.92, changePercent: 2.15 },
      { code: 'MSFT', name: '微软公司', currentPrice: 378.85, changePercent: 1.87 },
      { code: 'GOOGL', name: '谷歌公司', currentPrice: 142.56, changePercent: 3.24 },
      { code: 'AMZN', name: '亚马逊', currentPrice: 145.24, changePercent: 1.95 },
      { code: 'TSLA', name: '特斯拉', currentPrice: 248.42, changePercent: 4.67 }
    ],
    topGainers: [
      { code: 'NVDA', name: '英伟达', currentPrice: 485.09, changePercent: 8.45 },
      { code: 'AMD', name: 'AMD', currentPrice: 128.54, changePercent: 6.78 },
      { code: 'META', name: 'Meta', currentPrice: 332.80, changePercent: 5.92 },
      { code: 'NFLX', name: '奈飞', currentPrice: 503.50, changePercent: 4.81 },
      { code: 'CRM', name: 'Salesforce', currentPrice: 263.50, changePercent: 3.67 }
    ],
    hotSectors: [
      { sector: '科技股', avgChangePercent: 3.2, dollarVolume: 1500000000000, stockCount: 45 },
      { sector: '金融股', avgChangePercent: 1.8, dollarVolume: 800000000000, stockCount: 32 },
      { sector: '消费股', avgChangePercent: 2.1, dollarVolume: 600000000000, stockCount: 28 },
      { sector: '医疗股', avgChangePercent: 1.5, dollarVolume: 400000000000, stockCount: 25 },
      { sector: '能源股', avgChangePercent: 0.9, dollarVolume: 300000000000, stockCount: 18 }
    ]
  };

  // 使用模拟数据或真实数据
  const displayHotStocks = hasError ? mockStockData.hotStocks : (hotStocks || []);
  const displayTopGainers = hasError ? mockStockData.topGainers : (topGainers || []);
  const displayHotSectors = hasError ? mockStockData.hotSectors : (hotSectors || []);

  // 真实的股票走势数据
  const stockChartData = {
    META: [
      { price: 320.00, time: '09:30' },
      { price: 322.50, time: '10:00' },
      { price: 325.80, time: '10:30' },
      { price: 328.20, time: '11:00' },
      { price: 330.50, time: '11:30' },
      { price: 332.80, time: '12:00' },
      { price: 335.20, time: '12:30' },
      { price: 337.50, time: '13:00' },
      { price: 340.00, time: '13:30' }
    ],
    NFLX: [
      { price: 485.00, time: '09:30' },
      { price: 487.50, time: '10:00' },
      { price: 490.20, time: '10:30' },
      { price: 492.80, time: '11:00' },
      { price: 495.50, time: '11:30' },
      { price: 498.20, time: '12:00' },
      { price: 500.80, time: '12:30' },
      { price: 502.50, time: '13:00' },
      { price: 503.50, time: '13:30' }
    ],
    AMD: [
      { price: 120.00, time: '09:30' },
      { price: 122.50, time: '10:00' },
      { price: 125.80, time: '10:30' },
      { price: 128.20, time: '11:00' },
      { price: 130.50, time: '11:30' },
      { price: 132.80, time: '12:00' },
      { price: 135.20, time: '12:30' },
      { price: 137.50, time: '13:00' },
      { price: 138.50, time: '13:30' }
    ]
  };

  // 每日美股大盘走势数据
  const dailyMarketData = {
    DJIA: [
      { price: 38500, time: '09:30', volume: 1200000 },
      { price: 38650, time: '10:00', volume: 1500000 },
      { price: 38800, time: '10:30', volume: 1800000 },
      { price: 38950, time: '11:00', volume: 2000000 },
      { price: 39100, time: '11:30', volume: 2200000 },
      { price: 39250, time: '12:00', volume: 2500000 },
      { price: 39400, time: '12:30', volume: 2800000 },
      { price: 39550, time: '13:00', volume: 3000000 },
      { price: 39700, time: '13:30', volume: 3200000 }
    ],
    SP500: [
      { price: 4850, time: '09:30', volume: 800000 },
      { price: 4870, time: '10:00', volume: 1000000 },
      { price: 4890, time: '10:30', volume: 1200000 },
      { price: 4910, time: '11:00', volume: 1400000 },
      { price: 4930, time: '11:30', volume: 1600000 },
      { price: 4950, time: '12:00', volume: 1800000 },
      { price: 4970, time: '12:30', volume: 2000000 },
      { price: 4990, time: '13:00', volume: 2200000 },
      { price: 5010, time: '13:30', volume: 2400000 }
    ],
    NASDAQ: [
      { price: 15200, time: '09:30', volume: 600000 },
      { price: 15300, time: '10:00', volume: 800000 },
      { price: 15400, time: '10:30', volume: 1000000 },
      { price: 15500, time: '11:00', volume: 1200000 },
      { price: 15600, time: '11:30', volume: 1400000 },
      { price: 15700, time: '12:00', volume: 1600000 },
      { price: 15800, time: '12:30', volume: 1800000 },
      { price: 15900, time: '13:00', volume: 2000000 },
      { price: 16000, time: '13:30', volume: 2200000 }
    ]
  };

  // 获取今日市场数据
  const getTodayMarketData = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    const marketIndices = ['DJIA', 'SP500', 'NASDAQ'];
    const selectedIndex = marketIndices[dayOfYear % marketIndices.length];
    
    return {
      index: selectedIndex,
      data: dailyMarketData[selectedIndex],
      name: {
        'DJIA': '道琼斯工业平均指数',
        'SP500': '标普500指数',
        'NASDAQ': '纳斯达克综合指数'
      }[selectedIndex],
      symbol: selectedIndex
    };
  };

  const todayMarket = getTodayMarketData();

  // 热门帖子数据
  const featuredPosts = [
    {
      id: 1,
      title: "美股市场分析：科技股领涨，关注这些投资机会",
      excerpt: "今日美股市场表现强劲，科技股板块领涨市场。苹果、微软、谷歌等科技巨头股价均创下新高，投资者对科技股前景持乐观态度...",
      author: "张明轩",
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      views: 1247,
      likes: 89,
      comments: 23,
      shares: 12
    },
    {
      id: 2,
      title: "特斯拉财报分析：交付量创新高，股价有望继续上涨",
      excerpt: "特斯拉最新财报显示，公司交付量创下历史新高，营收和利润均超出分析师预期。CEO马斯克表示将在今年扩大产能...",
      author: "张明轩",
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      views: 892,
      likes: 67,
      comments: 18,
      shares: 8
    },
    {
      id: 3,
      title: "美联储政策解读：通胀数据低于预期，降息预期升温",
      excerpt: "最新公布的CPI数据显示，通胀环比下降0.1%，年化率为3.1%，低于市场预期的3.2%。这一数据增强了市场对美联储降息的预期...",
      author: "张明轩",
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      views: 1567,
      likes: 123,
      comments: 45,
      shares: 23
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 固定滚动交流框 */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-blue-600 text-white p-4 border-b border-blue-700">
            <h3 className="font-semibold flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              实时股票交流 (已更新)
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" id="chatContainer">
            {chatMessages.map((msg, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={msg.user.image} 
                    alt={msg.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 如果图片加载失败，显示文字头像
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`w-full h-full ${msg.user.color} flex items-center justify-center text-white text-xs font-bold`} style={{display: 'none'}}>
                    {msg.user.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">{msg.user.name} · {msg.relativeTime}</div>
                  <div className="bg-gray-100 rounded-lg p-2 text-sm">
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="输入您的观点..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                id="chatInput"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const input = document.getElementById('chatInput');
                    if (input && input.value.trim()) {
                      const userMessage = {
                        user: {
                          name: user ? user.username : '我',
                          title: '用户',
                          avatar: '我',
                          color: 'bg-yellow-500',
                          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                        },
                        message: input.value.trim(),
                        timestamp: new Date(),
                        relativeTime: '刚刚'
                      };
                      
                      setChatMessages(prev => [...prev, userMessage]);
                      input.value = '';
                    }
                  }
                }}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                onClick={() => {
                  const input = document.getElementById('chatInput');
                  if (input && input.value.trim()) {
                    const userMessage = {
                      user: {
                        name: user ? user.username : '我',
                        title: '用户',
                        avatar: '我',
                        color: 'bg-yellow-500',
                        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
                      },
                      message: input.value.trim(),
                      timestamp: new Date(),
                      relativeTime: '刚刚'
                    };
                    
                    setChatMessages(prev => [...prev, userMessage]);
                    input.value = '';
                  }
                }}
              >
                发送
              </button>
            </div>
          </div>
        </div>

        {/* 固定悬浮按钮 */}
        {!user && (
          <div className="fixed bottom-6 right-6 z-50">
            <Link
              to="/register"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>加入社区</span>
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center">
            <div className="mr-8">
              <div className="w-48 h-48 rounded-xl border-2 border-white shadow-lg bg-white overflow-hidden flex items-center justify-center">
                <img
                  src={analyst.avatar}
                  alt="专业分析师头像"
                  className="w-full h-full object-cover object-top rounded-xl"
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">
                美股投资分析平台
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                15年美股市场经验，为您提供专业的美股投资分析和交易指导
              </p>
              
              {/* 关键指标卡片 */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">15</div>
                  <div className="text-sm text-blue-200">多年经验</div>
                </div>
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">191</div>
                  <div className="text-sm text-blue-200">总交易</div>
                </div>
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">90.9%</div>
                  <div className="text-sm text-blue-200">胜率</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">7</div>
                  <div className="text-sm text-blue-200">活跃头寸</div>
                </div>
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                    <div className="text-sm text-blue-200">月度盈亏</div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">+$332,250.00</div>
                </div>
                <div className="bg-blue-800 bg-opacity-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
                    <div className="text-sm text-blue-200">总盈亏</div>
                  </div>
                  <div className="text-2xl font-bold text-green-400">+$6,578,097.37</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="h-20"></div>
              <Link
                to="/trading-log"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center"
              >
                查看交易日志
              </Link>
              <Link
                to="/stock-analysis"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                股票分析
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 分析师简介 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaUserTie className="mr-3 text-blue-600" />
                  专业分析师
                </h2>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{analyst.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{analyst.title} | {analyst.experience}年经验</p>
                <p className="text-gray-700 leading-relaxed">{analyst.bio}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaGraduationCap className="mr-2 text-blue-600" />
                    专业资质
                  </h4>
                  <ul className="space-y-2">
                    {analyst.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <FaAward className="mr-2 text-green-500" />
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FaTrophy className="mr-2 text-blue-600" />
                    主要成就
                  </h4>
                  <ul className="space-y-2">
                    {analyst.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <FaAward className="mr-2 text-yellow-500" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 交易记录栏 */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaChartBar className="mr-3 text-blue-600" />
                  成功交易案例
                </h2>
                <Link
                  to="/trading-gallery"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  查看更多
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 交易案例1 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <FaChartLine className="text-white text-sm" />
                      </div>
                      <span className="font-semibold text-gray-900">META</span>
                    </div>
                    <span className="text-green-600 font-bold">+6.25%</span>
                  </div>
                  <div className="w-full h-32 rounded-lg mb-4 bg-white border border-gray-200">
                    <StockChart 
                      data={stockChartData.META} 
                      width={300} 
                      height={128} 
                      color="#10B981"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>交易策略：</strong>突破关键阻力位做多
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>入场价：</strong>$320.00 | <strong>出场价：</strong>$340.00
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>持仓时间：</strong>2天 | <strong>收益率：</strong>6.25%
                  </div>
                </div>

                {/* 交易案例2 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <FaChartLine className="text-white text-sm" />
                      </div>
                      <span className="font-semibold text-gray-900">NFLX</span>
                    </div>
                    <span className="text-blue-600 font-bold">+3.81%</span>
                  </div>
                  <div className="w-full h-32 rounded-lg mb-4 bg-white border border-gray-200">
                    <StockChart 
                      data={stockChartData.NFLX} 
                      width={300} 
                      height={128} 
                      color="#3B82F6"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>交易策略：</strong>双底形态确认做多
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>入场价：</strong>$485.00 | <strong>出场价：</strong>$503.50
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>持仓时间：</strong>1天 | <strong>收益率：</strong>3.81%
                  </div>
                </div>

                {/* 交易案例3 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <FaChartLine className="text-white text-sm" />
                      </div>
                      <span className="font-semibold text-gray-900">AMD</span>
                    </div>
                    <span className="text-purple-600 font-bold">+15.42%</span>
                  </div>
                  <div className="w-full h-32 rounded-lg mb-4 bg-white border border-gray-200">
                    <StockChart 
                      data={stockChartData.AMD} 
                      width={300} 
                      height={128} 
                      color="#8B5CF6"
                    />
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>交易策略：</strong>趋势跟踪做多
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>入场价：</strong>$120.00 | <strong>出场价：</strong>$138.50
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>持仓时间：</strong>4天 | <strong>收益率：</strong>15.42%
                  </div>
                </div>
              </div>
            </div>

            {/* 热门帖子 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <FaNewspaper className="mr-3 text-blue-600" />
                  热门分析
                </h2>
                <Link
                  to="/trading-log"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  查看全部
                </Link>
              </div>
              
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <Link key={post.id} to={`/article/${post.id}`} className="block">
                    <div className="border-b border-gray-200 pb-6 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition-colors">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{post.author}</span>
                          <span className="flex items-center">
                            <FaClock className="mr-1" />
                            {getRelativeTime(post.date)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <FaEye className="mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <FaThumbsUp className="mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <FaComment className="mr-1" />
                            {post.comments}
                          </span>
                          <span className="flex items-center">
                            <FaShare className="mr-1" />
                            {post.shares}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 热门板块 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaLayerGroup className="mr-2 text-blue-600" />
                  热门板块
                </h3>
                <span className="text-xs text-gray-500">按交易量排序</span>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {displayHotSectors.slice(0, 5).map((sector, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{sector.sector}</div>
                        <div className={`text-sm font-semibold flex items-center ${
                          sector.avgChangePercent > 0 ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {sector.avgChangePercent > 0 ? (
                            <FaArrowUp className="mr-1" />
                          ) : (
                            <FaArrowDown className="mr-1" />
                          )}
                          {sector.avgChangePercent > 0 ? '+' : ''}{sector.avgChangePercent}%
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        交易量: ${(sector.dollarVolume / 1000000000000).toFixed(1)}B | 股票数: {sector.stockCount}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 涨幅榜 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaArrowUp className="mr-2 text-blue-600" />
                  涨幅榜
                </h3>
                <span className="text-xs text-gray-500">今日涨幅TOP10</span>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {displayTopGainers.slice(0, 10).map((stock, index) => (
                    <Link
                      key={stock._id || stock.code}
                      to={`/stock/${stock.code}`}
                      className="block"
                    >
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index < 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{stock.code}</div>
                            <div className="text-sm text-gray-500">{stock.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-red-600 flex items-center justify-end">
                            <FaArrowUp className="mr-1" />
                            +{stock.changePercent?.toFixed(2)}%
                          </div>
                          <div className="text-sm text-gray-500">${stock.currentPrice?.toFixed(2)}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  to="/stock-analysis"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  查看完整涨幅榜 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 