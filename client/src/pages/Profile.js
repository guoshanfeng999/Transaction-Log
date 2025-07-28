import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 测试显示 */}
        <div className="bg-red-500 text-white p-8 mb-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-4">✅ Profile页面已加载！</h1>
          <p className="text-xl">如果你能看到这个红色框，说明路由工作正常</p>
        </div>

        {/* 个人简介横幅 */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">汤姆·普雷斯顿</h2>
              <p className="text-blue-200 text-lg mb-4">首席市场策略师</p>
              <p className="text-blue-100 mb-6">15年美股市场经验，专注于技术分析和基本面分析相结合的投资策略。</p>
              
              {/* 关键指标显示 */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">191</div>
                  <div className="text-sm text-blue-200">总交易</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">90.9%</div>
                  <div className="text-sm text-blue-200">胜率</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">7</div>
                  <div className="text-sm text-blue-200">活跃头寸</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">+$332,250</div>
                  <div className="text-sm text-blue-200">月度盈亏</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">+$6,578,097</div>
                  <div className="text-sm text-blue-200">总盈亏</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  查看交易日志
                </button>
                <button className="px-6 py-3 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                  股票分析
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="汤姆·普雷斯顿"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 多年经验卡片 */}
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">多年经验</h3>
            <div className="text-3xl font-bold text-yellow-600">15</div>
            <p className="text-sm text-gray-500 mt-2">专业投资经验</p>
          </div>
        </div>

        {/* 专业资质和成就 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">专业资质</h3>
            <ul className="space-y-2">
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                CFA特许金融分析师
              </li>
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                FRM金融风险管理师
              </li>
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                证券投资顾问资格证
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">主要成就</h3>
            <ul className="space-y-2">
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                连续5年美股投资收益率超过20%
              </li>
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                成功预测2020年科技股牛市
              </li>
              <li className="text-gray-700 flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                管理资产规模超过1亿美元
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 