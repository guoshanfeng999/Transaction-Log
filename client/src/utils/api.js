// API配置
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  // 认证相关
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify`,
  
  // 用户相关
  USER_PROFILE: `${API_BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
  
  // 股票相关
  STOCKS: `${API_BASE_URL}/api/stocks`,
  STOCK_DETAIL: (code) => `${API_BASE_URL}/api/stocks/${code}`,
  HOT_STOCKS: `${API_BASE_URL}/api/stocks/hot`,
  TOP_GAINERS: `${API_BASE_URL}/api/stocks/top-gainers`,
  TOP_LOSERS: `${API_BASE_URL}/api/stocks/top-losers`,
  HOT_SECTORS: `${API_BASE_URL}/api/stocks/hot-sectors`,
  
  // 帖子相关
  POSTS: `${API_BASE_URL}/api/posts`,
  POST_DETAIL: (id) => `${API_BASE_URL}/api/posts/${id}`,
  CREATE_POST: `${API_BASE_URL}/api/posts`,
  UPDATE_POST: (id) => `${API_BASE_URL}/api/posts/${id}`,
  DELETE_POST: (id) => `${API_BASE_URL}/api/posts/${id}`,
  
  // 评论相关
  COMMENTS: `${API_BASE_URL}/api/comments`,
  POST_COMMENTS: (postId) => `${API_BASE_URL}/api/comments/post/${postId}`,
  CREATE_COMMENT: `${API_BASE_URL}/api/comments`,
  
  // 客服相关
  CUSTOMER_SERVICE: `${API_BASE_URL}/api/customer-service`,
  CREATE_TICKET: `${API_BASE_URL}/api/customer-service/tickets`,
};

export { SOCKET_URL };

// 请求拦截器配置
export const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

// 带认证的请求配置
export const getAuthConfig = (token) => ({
  ...requestConfig,
  headers: {
    ...requestConfig.headers,
    'Authorization': `Bearer ${token}`,
  },
}); 