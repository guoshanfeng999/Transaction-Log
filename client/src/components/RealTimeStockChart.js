import React, { useEffect, useRef } from 'react';

const RealTimeStockChart = ({ data, width = 300, height = 200, color = '#10B981' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || !data.dataPoints || data.dataPoints.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 计算价格范围
    const prices = data.dataPoints.map(point => point.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    
    // 设置边距
    const margin = 20;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;
    
    // 绘制背景网格
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 0.5;
    
    // 水平网格线
    for (let i = 0; i <= 4; i++) {
      const y = margin + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(width - margin, y);
      ctx.stroke();
    }
    
    // 垂直网格线
    for (let i = 0; i <= 4; i++) {
      const x = margin + (chartWidth / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, margin);
      ctx.lineTo(x, height - margin);
      ctx.stroke();
    }
    
    // 绘制价格线
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.dataPoints.forEach((point, index) => {
      const x = margin + (index / (data.dataPoints.length - 1)) * chartWidth;
      const y = margin + chartHeight - ((point.price - minPrice) / priceRange) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // 绘制价格标签 - 优化位置避免遮挡
    ctx.fillStyle = '#374151';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    
    // 最高价标签 - 移到左侧外部
    const maxY = margin + chartHeight - ((maxPrice - minPrice) / priceRange) * chartHeight;
    ctx.fillText(`$${maxPrice.toFixed(2)}`, margin - 8, maxY + 4);
    
    // 最低价标签 - 移到左侧外部
    const minY = margin + chartHeight;
    ctx.fillText(`$${minPrice.toFixed(2)}`, margin - 8, minY - 4);
    
    // 当前价格标签 - 移到右侧外部，避免遮挡线条
    const currentPrice = data.currentPrice;
    const currentY = margin + chartHeight - ((currentPrice - minPrice) / priceRange) * chartHeight;
    ctx.fillStyle = data.change >= 0 ? '#EF4444' : '#10B981'; // 涨红色，跌绿色
    ctx.fillText(`$${currentPrice.toFixed(2)}`, width - margin + 8, currentY + 4);
    
    // 绘制时间标签 - 优化位置避免遮挡
    ctx.fillStyle = '#6B7280';
    ctx.font = '9px Arial';
    ctx.textAlign = 'center';
    
    const startTime = new Date(data.dataPoints[0].time);
    const endTime = new Date(data.dataPoints[data.dataPoints.length - 1].time);
    
    // 只显示开始和结束时间，避免过多标签
    ctx.fillText(startTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), margin, height - 8);
    ctx.fillText(endTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }), width - margin, height - 8);
    
  }, [data, width, height, color]);

  if (!data || !data.dataPoints) {
    return (
      <div className="flex items-center justify-center" style={{ width, height }}>
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border border-gray-200 rounded-lg"
      />
      {/* 股票信息 - 移到左上角，避免遮挡图表 */}
      <div className="absolute top-2 left-2 bg-white bg-opacity-95 px-2 py-1 rounded text-xs shadow-sm">
        <div className="font-semibold text-gray-900">{data.symbol}</div>
        <div className={`font-medium ${data.change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
          {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent}%)
        </div>
      </div>
    </div>
  );
};

export default RealTimeStockChart; 