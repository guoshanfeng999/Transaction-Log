import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StockChart = ({ data, symbol, color = '#3B82F6' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-500">暂无数据</div>
      </div>
    );
  }

  // 优化数据点数量，避免图表过于密集
  const optimizeData = (data, maxPoints = 50) => {
    if (data.length <= maxPoints) return data;
    
    const step = Math.floor(data.length / maxPoints);
    return data.filter((_, index) => index % step === 0);
  };

  // 格式化数据用于图表显示
  const chartData = optimizeData(data).map((item, index) => ({
    time: item.time,
    price: item.price,
    index: index
  }));

  // 计算价格变化
  const firstPrice = data[0]?.price || 0;
  const lastPrice = data[data.length - 1]?.price || 0;
  const priceChange = lastPrice - firstPrice;
  const priceChangePercent = firstPrice > 0 ? (priceChange / firstPrice) * 100 : 0;

  // 获取当前价格（最新价格）
  const currentPrice = lastPrice;

  return (
    <div className="w-full h-full">
      {/* 图表区域 */}
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tickFormatter={(value) => {
                // 只显示开始和结束时间，以及中间的几个关键时间点
                const time = value.split(':');
                return `${time[0]}:${time[1]}`;
              }}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={8}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
              formatter={(value) => [`$${parseFloat(value).toFixed(2)}`, '价格']}
              labelFormatter={(label) => `时间: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 2, fill: color }}
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart; 