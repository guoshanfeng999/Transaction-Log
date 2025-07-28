import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaArrowLeft, 
  FaThumbsUp, 
  FaComment, 
  FaShare, 
  FaClock, 
  FaUser,
  FaReply,
  FaHeart,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [replyText, setReplyText] = useState('');

  // 模拟文章数据
  const mockArticles = [
    {
      id: 1,
      type: '市场分析',
      title: '美股市场分析：科技股领涨，关注这些投资机会',
      content: `今日美股市场表现强劲，科技股板块领涨市场。苹果、微软、谷歌等科技巨头股价均创下新高，投资者对科技股前景持乐观态度。

从技术面来看，纳斯达克综合指数已经突破关键阻力位，成交量明显放大，表明市场对该板块的关注度在提升。主要科技股表现如下：

**苹果(AAPL)**
- 当前价格：$185.92
- 涨幅：+3.60%
- 技术面：突破前期高点，MACD金叉向上

**微软(MSFT)**
- 当前价格：$378.85
- 涨幅：+3.36%
- 技术面：均线系统呈多头排列

**谷歌(GOOGL)**
- 当前价格：$142.56
- 涨幅：+3.78%
- 技术面：RSI指标处于强势区域

**投资建议：**
基于当前市场环境和技术面分析，建议投资者可以适当关注科技股板块，但需要注意风险控制。建议在回调时分批建仓，设置合理的止损位。

**重点关注股票：**
1. 苹果(AAPL) - 新产品发布预期
2. 微软(MSFT) - AI业务增长强劲
3. 谷歌(GOOGL) - 广告业务复苏
4. 英伟达(NVDA) - AI芯片需求旺盛

**风险提示：**
股市有风险，投资需谨慎。本文分析仅供参考，不构成投资建议。`,
      author: '张明轩',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      views: 1247,
      likes: 89,
      comments: 23,
      shares: 12,
      liked: false,
      stockCodes: ['AAPL', 'MSFT', 'GOOGL', 'NVDA'],
      tags: ['科技股', '市场分析', '投资机会']
    },
    {
      id: 2,
      type: '财报分析',
      title: '特斯拉财报分析：交付量创新高，股价有望继续上涨',
      content: `特斯拉最新财报显示，公司交付量创下历史新高，营收和利润均超出分析师预期。CEO马斯克表示将在今年扩大产能，进一步巩固市场领先地位。

**财报亮点：**
- 季度交付量：48.5万辆（同比增长20%）
- 营收：$243.2亿（同比增长9%）
- 净利润：$18.5亿（同比增长44%）
- 毛利率：18.1%（环比提升）

**业务分析：**
1. **汽车业务**：Model Y和Model 3仍然是主要增长动力
2. **能源业务**：储能产品需求强劲，同比增长40%
3. **服务业务**：FSD软件收入增长显著

**技术进展：**
- FSD Beta版本持续优化
- 4680电池产能提升
- 新工厂建设进展顺利

**投资建议：**
基于强劲的财报表现和未来增长预期，建议投资者关注特斯拉的投资机会。但需要注意估值风险和市场竞争加剧的影响。

**风险因素：**
1. 市场竞争加剧
2. 原材料成本波动
3. 监管政策变化
4. 技术发展不确定性`,
      author: '张明轩',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: new Date(Date.now() - 4 * 60 * 60 * 1000),
      views: 892,
      likes: 67,
      comments: 18,
      shares: 8,
      liked: false,
      stockCodes: ['TSLA'],
      tags: ['特斯拉', '财报分析', '电动车']
    },
    {
      id: 3,
      type: '政策解读',
      title: '美联储政策解读：通胀数据低于预期，降息预期升温',
      content: `最新公布的CPI数据显示，通胀环比下降0.1%，年化率为3.1%，低于市场预期的3.2%。这一数据增强了市场对美联储降息的预期，美股市场应声上涨。

**通胀数据分析：**
- 整体CPI：环比-0.1%，年化3.1%
- 核心CPI：环比+0.2%，年化3.9%
- 能源价格：环比-2.3%
- 食品价格：环比+0.1%

**市场反应：**
- 道琼斯指数：+1.2%
- 标普500指数：+1.5%
- 纳斯达克指数：+2.1%
- 美元指数：-0.8%

**美联储政策预期：**
根据最新的通胀数据和就业数据，市场预期美联储可能在今年下半年开始降息。CME FedWatch工具显示，市场预期6月降息的概率为65%。

**投资策略建议：**
1. **利率敏感股**：房地产、公用事业板块受益
2. **成长股**：科技股估值压力缓解
3. **债券投资**：收益率下降，价格上涨
4. **美元资产**：美元走弱，利好出口企业

**风险提示：**
通胀数据仍存在不确定性，美联储政策可能因经济数据变化而调整。投资者需要密切关注后续经济数据发布。`,
      author: '张明轩',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      views: 1567,
      likes: 123,
      comments: 45,
      shares: 23,
      liked: false,
      stockCodes: ['SPY', 'QQQ', 'XLF'],
      tags: ['美联储', '通胀', '降息', '政策解读']
    }
  ];

  // 模拟评论数据
  const mockComments = [
    {
      id: 1,
      author: '投资新手',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: '分析很详细，对科技股的投资机会分析得很到位。请问现在适合买入苹果吗？',
      date: new Date(Date.now() - 30 * 60 * 1000),
      likes: 12,
      replies: [
        {
          id: 11,
          author: '张明轩',
          authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          content: '建议等待回调到$180附近再考虑买入，设置止损位$175。',
          date: new Date(Date.now() - 20 * 60 * 1000),
          likes: 8
        }
      ]
    },
    {
      id: 2,
      author: '资深投资者',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: '特斯拉的财报确实超出预期，但估值已经很高了，需要谨慎。',
      date: new Date(Date.now() - 45 * 60 * 1000),
      likes: 8,
      replies: []
    },
    {
      id: 3,
      author: '量化分析师',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      content: '美联储降息预期对市场影响很大，需要关注后续经济数据。',
      date: new Date(Date.now() - 60 * 60 * 1000),
      likes: 15,
      replies: []
    }
  ];

  useEffect(() => {
    // 模拟加载数据
    setTimeout(() => {
      const foundArticle = mockArticles.find(a => a.id === parseInt(articleId));
      if (foundArticle) {
        setArticle(foundArticle);
        setComments(mockComments);
      }
      setLoading(false);
    }, 1000);
  }, [articleId]);

  const handleLike = () => {
    if (!user) {
      toast.error('请先登录');
      return;
    }
    setArticle(prev => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked ? prev.likes - 1 : prev.likes + 1
    }));
    toast.success(article.liked ? '取消点赞' : '点赞成功');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.content.substring(0, 100) + '...',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  const handleComment = () => {
    if (!user) {
      toast.error('请先登录');
      return;
    }
    if (!newComment.trim()) {
      toast.error('请输入评论内容');
      return;
    }

    const comment = {
      id: Date.now(),
      author: user.username,
      authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: newComment,
      date: new Date(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setArticle(prev => ({ ...prev, comments: prev.comments + 1 }));
    toast.success('评论发布成功');
  };

  const handleReply = (commentId) => {
    if (!user) {
      toast.error('请先登录');
      return;
    }
    if (!replyText.trim()) {
      toast.error('请输入回复内容');
      return;
    }

    const reply = {
      id: Date.now(),
      author: user.username,
      authorAvatar: user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: replyText,
      date: new Date(),
      likes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    setReplyText('');
    setShowReplyForm(null);
    toast.success('回复发布成功');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章不存在</h1>
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          返回
        </button>
      </div>

      {/* 文章内容 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        {/* 文章头部 */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              {article.type}
            </span>
            <span className="text-gray-500 text-sm">
              {article.date.toLocaleDateString('zh-CN')}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-gray-900">{article.author}</div>
                <div className="text-sm text-gray-500">
                  <FaClock className="inline mr-1" />
                  {article.date.toLocaleString('zh-CN')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaEye className="mr-1" />
                {article.views}
              </span>
              <span className="flex items-center">
                <FaThumbsUp className="mr-1" />
                {article.likes}
              </span>
              <span className="flex items-center">
                <FaComment className="mr-1" />
                {article.comments}
              </span>
              <span className="flex items-center">
                <FaShare className="mr-1" />
                {article.shares}
              </span>
            </div>
          </div>
        </div>

        {/* 股票标签 */}
        {article.stockCodes && article.stockCodes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.stockCodes.map((code, index) => (
              <Link
                key={index}
                to={`/stock/${code}`}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
              >
                {code}
              </Link>
            ))}
          </div>
        )}

        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none mb-8">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 互动按钮 */}
        <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              article.liked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FaThumbsUp />
            <span>{article.liked ? '已点赞' : '点赞'}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <FaShare />
            <span>分享</span>
          </button>
        </div>
      </div>

      {/* 评论区域 */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">评论 ({comments.length})</h2>
        
        {/* 发表评论 */}
        {user && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="写下你的评论..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows="3"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleComment}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    发表评论
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 评论列表 */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <img
                  src={comment.authorAvatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {comment.date.toLocaleString('zh-CN')}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{comment.content}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <FaThumbsUp />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      onClick={() => setShowReplyForm(showReplyForm === comment.id ? null : comment.id)}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <FaReply />
                      <span>回复</span>
                    </button>
                  </div>

                  {/* 回复表单 */}
                  {showReplyForm === comment.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                          alt={user.username}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder={`回复 ${comment.author}...`}
                            className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                            rows="2"
                          />
                          <div className="flex justify-end mt-2 space-x-2">
                            <button
                              onClick={() => setShowReplyForm(null)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-800"
                            >
                              取消
                            </button>
                            <button
                              onClick={() => handleReply(comment.id)}
                              className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                            >
                              回复
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 回复列表 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="ml-8 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <img
                              src={reply.authorAvatar}
                              alt={reply.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-gray-900">{reply.author}</span>
                                <span className="text-sm text-gray-500">
                                  {reply.date.toLocaleString('zh-CN')}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                                <button className="flex items-center space-x-1 hover:text-gray-700">
                                  <FaThumbsUp />
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            暂无评论，快来发表第一条评论吧！
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail; 