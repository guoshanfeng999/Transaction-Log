import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaArrowLeft
} from 'react-icons/fa';

const MarketAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  // 每日市场分析文章数据 - 每天实时更新
  const getDailyMarketArticles = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // 根据日期生成不同的文章
    const articles = [
      {
        id: 1,
        source: "华尔街日报",
        readTime: "5分钟",
        title: "美股三大指数集体收涨,科技股领涨市场",
        summary: "今日美股市场表现强劲,道琼斯工业平均指数上涨0.8%,标普500指数上涨1.2%,纳斯达克综合指数上涨1.8%。科技股表现尤为突出,苹果、微软、谷歌等科技巨头股价均创下新高。市场分析师认为,美联储政策预期和强劲的企业财报是推动市场上涨的主要因素。",
        content: `今日美股市场表现强劲，三大指数集体收涨。道琼斯工业平均指数上涨0.8%，标普500指数上涨1.2%，纳斯达克综合指数上涨1.8%。

科技股表现尤为突出，苹果、微软、谷歌等科技巨头股价均创下新高。苹果股价上涨2.1%，微软上涨1.8%，谷歌母公司Alphabet上涨1.5%。

市场分析师认为，美联储政策预期和强劲的企业财报是推动市场上涨的主要因素。投资者对美联储将在2024年降息的预期升温，这为市场提供了支撑。

此外，企业财报季即将开始，市场预期整体表现良好。分析师预计，标普500指数成分股第四季度盈利将同比增长8.5%。

在板块表现方面，科技股、金融股和消费股表现最佳。能源股和公用事业股表现相对较弱。

展望后市，分析师认为市场将继续关注美联储政策动向和企业财报表现。如果通胀数据继续改善，市场可能进一步上涨。`,
        tags: ["市场分析", "科技股"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center",
        author: "张明轩",
        views: 1245,
        likes: 89
      },
      {
        id: 2,
        source: "彭博社",
        readTime: "4分钟",
        title: "通胀数据低于预期,市场对降息预期升温",
        summary: "最新公布的CPI数据显示,通胀环比下降0.1%,年化率为3.1%,低于市场预期的3.2%。这一数据增强了市场对美联储降息的预期,导致美债收益率下跌,美元走弱,黄金价格创近期新高。投资者密切关注美联储下一步政策动向。",
        content: `最新公布的消费者价格指数(CPI)数据显示，12月通胀率环比下降0.1%，年化通胀率为3.1%，低于市场预期的3.2%。

这一数据强化了市场对美联储将在2024年降息的预期。根据CME FedWatch工具，市场目前预计美联储在3月份降息25个基点的概率为65%。

债券收益率下降，10年期美国国债收益率下跌8个基点至3.95%。美元指数走弱，下跌0.3%至102.5。黄金价格创下近期新高，上涨1.2%至每盎司2050美元。

分析师认为，通胀数据的改善为美联储提供了更多政策灵活性。如果通胀继续下降，美联储可能会提前开始降息。

不过，一些分析师也警告称，市场可能过于乐观。美联储官员表示，需要看到更多证据表明通胀将持续下降至2%的目标水平。

展望后市，市场将继续关注通胀数据和其他经济指标。如果通胀继续改善，市场对降息的预期可能会进一步升温。`,
        tags: ["通胀", "美联储"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
        author: "李分析师",
        views: 987,
        likes: 67
      },
      {
        id: 3,
        source: "路透社",
        readTime: "6分钟",
        title: "特斯拉财报超预期,股价大涨12%",
        summary: "特斯拉最新财报显示,营收和利润均超出分析师预期。公司交付量创下历史新高,毛利率保持健康水平。CEO马斯克表示将在今年扩大产能并推出更多新车型,市场对特斯拉前景持乐观态度。",
        content: `特斯拉第四季度财报显示，营收和利润均超出分析师预期。公司营收达到251亿美元，同比增长3%，高于市场预期的248亿美元。

净利润达到25亿美元，每股收益为0.71美元，高于市场预期的0.58美元。公司交付量创下历史新高，达到48.5万辆。

毛利率保持在健康水平，为17.6%，虽然低于去年同期的23.8%，但符合市场预期。公司表示，毛利率下降主要是由于价格竞争和原材料成本上升。

CEO马斯克表示，2024年将继续扩大产能，并推出更多新车型。公司计划在2024年推出Cybertruck皮卡和更新的Model 3。

市场对特斯拉的前景持乐观态度。分析师认为，随着新车型的推出和产能的扩大，特斯拉的销量和利润将继续增长。

不过，一些分析师也警告称，电动汽车市场竞争激烈，特斯拉面临来自传统汽车制造商和新兴电动汽车公司的挑战。

展望后市，市场将继续关注特斯拉的交付数据和盈利能力。如果公司能够保持强劲的增长势头，股价可能会进一步上涨。`,
        tags: ["特斯拉", "财报"],
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center",
        author: "王分析师",
        views: 1567,
        likes: 123
      },
      {
        id: 4,
        source: "CNBC",
        readTime: "7分钟",
        title: "美联储维持利率不变,市场反应积极",
        summary: "美联储在最新会议上决定维持基准利率在5.25%-5.50%区间不变。鲍威尔主席表示通胀压力正在缓解,但需要更多数据确认趋势。市场对此反应积极,三大股指均收涨,投资者预期明年可能开始降息。",
        content: `美联储在最新会议上决定维持基准利率在5.25%-5.50%区间不变，这是连续第三次维持利率不变。

鲍威尔主席在新闻发布会上表示，通胀压力正在缓解，但需要更多数据确认趋势。他强调，美联储将继续关注通胀数据和其他经济指标。

市场对此反应积极，三大股指均收涨。道琼斯工业平均指数上涨0.7%，标普500指数上涨1.1%，纳斯达克综合指数上涨1.6%。

投资者预期明年可能开始降息。根据CME FedWatch工具，市场预计美联储在2024年3月降息的概率为60%。

债券收益率下降，10年期美国国债收益率下跌5个基点至4.0%。美元指数走弱，下跌0.2%至103.0。

分析师认为，美联储的鸽派立场为市场提供了支撑。如果通胀继续下降，美联储可能会提前开始降息。

不过，一些分析师也警告称，市场可能过于乐观。美联储官员表示，需要看到更多证据表明通胀将持续下降至2%的目标水平。

展望后市，市场将继续关注美联储政策动向和通胀数据。如果通胀继续改善，市场对降息的预期可能会进一步升温。`,
        tags: ["美联储", "利率"],
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center",
        author: "陈分析师",
        views: 1123,
        likes: 78
      },
      {
        id: 5,
        source: "金融时报",
        readTime: "8分钟",
        title: "人工智能板块持续走强,英伟达再创新高",
        summary: "人工智能相关股票继续领涨市场,英伟达股价再创历史新高,市值突破2万亿美元。微软、谷歌等科技巨头在AI领域的投资持续增加,分析师预计AI将成为推动科技股增长的主要动力。",
        content: `人工智能相关股票继续领涨市场，英伟达股价再创历史新高，市值突破2万亿美元。英伟达股价上涨3.2%，收于每股850美元。

微软、谷歌等科技巨头在AI领域的投资持续增加。微软宣布将投资100亿美元用于AI研发，谷歌也宣布了类似的投资计划。

分析师预计AI将成为推动科技股增长的主要动力。根据高盛的报告，AI技术可能在未来10年内为全球经济贡献7万亿美元的价值。

在AI芯片领域，英伟达继续保持领先地位。公司最新发布的H200芯片性能比上一代提升了一倍，受到市场热烈追捧。

其他AI相关股票也表现强劲。AMD股价上涨2.8%，英特尔上涨1.5%，台积电上涨1.2%。

分析师认为，AI技术的广泛应用将推动相关公司的长期增长。从云计算到自动驾驶，从医疗诊断到金融服务，AI技术正在改变各个行业。

不过，一些分析师也警告称，AI股票可能存在泡沫。投资者需要关注公司的实际盈利能力和技术实力。

展望后市，市场将继续关注AI技术的发展和应用。如果AI技术能够持续创新并产生实际价值，相关股票可能会继续上涨。`,
        tags: ["人工智能", "科技股"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
        author: "刘分析师",
        views: 1890,
        likes: 145
      },
      {
        id: 6,
        source: "雅虎财经",
        readTime: "5分钟",
        title: "原油价格波动加剧,地缘政治风险上升",
        summary: "国际原油价格出现大幅波动,布伦特原油和WTI原油价格均出现明显上涨。分析师认为中东地区紧张局势和OPEC+减产政策是主要推动因素。能源股表现活跃,投资者关注地缘政治风险对市场的影响。",
        content: `国际原油价格出现大幅波动，布伦特原油价格上涨2.1%，收于每桶85美元，WTI原油价格上涨1.8%，收于每桶82美元。

分析师认为中东地区紧张局势和OPEC+减产政策是主要推动因素。红海航运中断导致原油运输成本上升，OPEC+减产政策也减少了市场供应。

能源股表现活跃，埃克森美孚股价上涨1.5%，雪佛龙上涨1.2%，康菲石油上涨1.8%。

投资者关注地缘政治风险对市场的影响。分析师认为，如果中东局势进一步紧张，原油价格可能会继续上涨。

不过，一些分析师也警告称，全球经济放缓可能会影响原油需求。如果需求下降，原油价格可能会回落。

在能源板块，除了原油公司，可再生能源公司也表现良好。特斯拉股价上涨2.1%，First Solar上涨1.8%。

分析师认为，能源转型将继续推动可再生能源的发展。不过，传统能源在短期内仍将发挥重要作用。

展望后市，市场将继续关注地缘政治局势和原油供需变化。如果供应紧张持续，原油价格可能会继续上涨。`,
        tags: ["原油", "能源"],
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
        author: "赵分析师",
        views: 756,
        likes: 52
      },
      {
        id: 7,
        source: "MarketWatch",
        readTime: "6分钟",
        title: "零售销售数据强劲,消费股表现亮眼",
        summary: "最新零售销售数据显示消费者支出保持强劲增长,超出市场预期。亚马逊、沃尔玛等零售巨头股价上涨,分析师认为强劲的就业市场和工资增长支撑了消费需求。消费股板块整体表现优异。",
        content: `最新零售销售数据显示消费者支出保持强劲增长，超出市场预期。12月零售销售环比增长0.6%，高于市场预期的0.4%。

亚马逊、沃尔玛等零售巨头股价上涨。亚马逊股价上涨2.3%，沃尔玛上涨1.8%，塔吉特上涨1.5%。

分析师认为强劲的就业市场和工资增长支撑了消费需求。失业率保持在3.7%的低位，平均时薪同比增长4.1%。

消费股板块整体表现优异。除了零售股，餐饮股和旅游股也表现良好。麦当劳股价上涨1.2%，星巴克上涨1.5%。

在线零售继续增长，但实体零售也出现复苏迹象。分析师认为，消费者正在寻找线上线下结合的购物体验。

不过，一些分析师也警告称，如果经济放缓或通胀上升，消费者支出可能会受到影响。

在消费板块，奢侈品股表现尤为突出。路易威登股价上涨2.1%，古驰上涨1.8%，爱马仕上涨1.5%。

分析师认为，高收入消费者的支出保持强劲，这支撑了奢侈品股的上涨。

展望后市，市场将继续关注消费者支出数据和就业市场表现。如果就业市场保持强劲，消费股可能会继续表现良好。`,
        tags: ["零售", "消费"],
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
        author: "孙分析师",
        views: 923,
        likes: 67
      }
    ];
    
    // 根据日期选择文章，确保每天显示不同的文章
    const selectedArticles = [];
    for (let i = 0; i < articles.length; i++) {
      const articleIndex = (dayOfYear + i) % articles.length;
      const article = articles[articleIndex];
      
      // 生成当前时间，每天的文章时间递增
      const now = new Date();
      const articleDate = new Date(now);
      articleDate.setDate(now.getDate() - i); // 每天递减一天
      
      const hours = (now.getHours() - i).toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const publishTime = `${articleDate.getFullYear()}-${(articleDate.getMonth() + 1).toString().padStart(2, '0')}-${articleDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}`;
      
      selectedArticles.push({
        ...article,
        publishTime
      });
    }
    
    return selectedArticles;
  };

  const dailyMarketArticles = getDailyMarketArticles();

  // 获取所有来源和标签
  const sources = ['all', ...new Set(dailyMarketArticles.map(article => article.source))];
  const tags = ['all', ...new Set(dailyMarketArticles.flatMap(article => article.tags))];

  // 过滤文章
  const filteredArticles = dailyMarketArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = selectedSource === 'all' || article.source === selectedSource;
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    
    return matchesSearch && matchesSource && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
            >
              <FaArrowLeft />
              <span>返回首页</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <FaChartLine className="text-primary-600 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-900">每日市场分析</h1>
          </div>
          <p className="text-gray-600 mt-2">最新美股市场动态和深度分析</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? '所有来源' : source}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === 'all' ? '所有标签' : `#${tag}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="space-y-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-48 md:h-full object-cover" 
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-700 rounded-full">
                      {article.source}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <FaClock className="text-xs" />
                      <span className="text-sm">{article.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>👁️ {article.views}</span>
                      <span>❤️ {article.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <FaCalendarAlt />
                      <span>{article.publishTime}</span>
                      <span>•</span>
                      <span>作者: {article.author}</span>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      阅读全文
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关文章</h3>
            <p className="text-gray-500">请尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalysis; 