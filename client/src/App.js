import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TradingLog from './pages/TradingLog';
import StockAnalysis from './pages/StockAnalysis';
import CustomerService from './pages/CustomerService';
import VideoArticles from './pages/VideoArticles';
import PostDetail from './pages/PostDetail';
import StockDetail from './pages/StockDetail';
import StockSearch from './pages/StockSearch';
import TradingGallery from './pages/TradingGallery';
import ArticleDetail from './pages/ArticleDetail';
import MarketAnalysis from './pages/MarketAnalysis';
import { AuthProvider } from './contexts/AuthContext';
import { StockProvider } from './contexts/StockContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/trading-log" element={<TradingLog />} />
                <Route path="/stock-analysis" element={<StockAnalysis />} />
                <Route path="/stock-search" element={<StockSearch />} />
                <Route path="/stock/:code" element={<StockDetail />} />
                <Route path="/article/:articleId" element={<ArticleDetail />} />
                <Route path="/trading-gallery" element={<TradingGallery />} />
                <Route path="/video-articles" element={<VideoArticles />} />
                <Route path="/market-analysis" element={<MarketAnalysis />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/test" element={<div className="p-8 text-center"><h1 className="text-3xl font-bold text-red-500">✅ 测试页面工作正常！</h1></div>} />
                <Route 
                  path="/customer-service" 
                  element={
                    <PrivateRoute>
                      <CustomerService />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </StockProvider>
    </AuthProvider>
  );
}

export default App; 