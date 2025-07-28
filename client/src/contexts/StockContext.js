import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils/api';

const StockContext = createContext();

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
};

export const StockProvider = ({ children }) => {
  const [hotStocks, setHotStocks] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [hotSectors, setHotSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取热门股票
  const fetchHotStocks = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.HOT_STOCKS);
      setHotStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch hot stocks:', error);
    }
  };

  // 获取涨幅榜
  const fetchTopGainers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.TOP_GAINERS);
      setTopGainers(response.data);
    } catch (error) {
      console.error('Failed to fetch top gainers:', error);
    }
  };

  // 获取跌幅榜
  const fetchTopLosers = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.TOP_LOSERS);
      setTopLosers(response.data);
    } catch (error) {
      console.error('Failed to fetch top losers:', error);
    }
  };

  // 获取热门板块
  const fetchHotSectors = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.HOT_SECTORS);
      setHotSectors(response.data);
    } catch (error) {
      console.error('Failed to fetch hot sectors:', error);
    }
  };

  // 搜索股票
  const searchStocks = async (query) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.STOCKS}/search/${query}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search stocks:', error);
      return [];
    }
  };

  // 获取单个股票详情
  const getStockDetail = async (code) => {
    try {
      const response = await axios.get(API_ENDPOINTS.STOCK_DETAIL(code));
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stock detail:', error);
      return null;
    }
  };

  // 初始化数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchHotStocks(),
        fetchTopGainers(),
        fetchTopLosers(),
        fetchHotSectors()
      ]);
      setLoading(false);
    };

    fetchData();

    // 每5分钟更新一次数据
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    hotStocks,
    topGainers,
    topLosers,
    hotSectors,
    loading,
    searchStocks,
    getStockDetail,
    refreshData: () => {
      fetchHotStocks();
      fetchTopGainers();
      fetchTopLosers();
      fetchHotSectors();
    }
  };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
}; 