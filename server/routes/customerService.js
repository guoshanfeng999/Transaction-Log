const express = require('express');
const jwt = require('jsonwebtoken');
const CustomerService = require('../models/CustomerService');
const User = require('../models/User');
const router = express.Router();

// 中间件：验证token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: '未授权访问' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: '无效的token' });
  }
};

// 获取用户的客服会话
router.get('/my-tickets', auth, async (req, res) => {
  try {
    const tickets = await CustomerService.find({ user: req.user._id })
      .populate('agent', 'username avatar')
      .sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取所有客服会话（管理员/客服）
router.get('/all-tickets', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ message: '无权限访问' });
    }

    const { status, priority, category } = req.query;
    let query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const tickets = await CustomerService.find(query)
      .populate('user', 'username email')
      .populate('agent', 'username avatar')
      .sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 创建新的客服会话
router.post('/', auth, async (req, res) => {
  try {
    const { subject, category, priority, message } = req.body;

    const ticket = new CustomerService({
      user: req.user._id,
      subject,
      category,
      priority,
      messages: [{
        sender: 'user',
        content: message
      }]
    });

    await ticket.save();
    await ticket.populate('user', 'username email');

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取单个会话详情
router.get('/:id', auth, async (req, res) => {
  try {
    const ticket = await CustomerService.findById(req.params.id)
      .populate('user', 'username email')
      .populate('agent', 'username avatar');

    if (!ticket) {
      return res.status(404).json({ message: '会话不存在' });
    }

    // 检查权限
    if (ticket.user._id.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ message: '无权限访问此会话' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 发送消息
router.post('/:id/message', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const ticket = await CustomerService.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: '会话不存在' });
    }

    // 检查权限
    if (ticket.user.toString() !== req.user._id.toString() && 
        req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ message: '无权限发送消息' });
    }

    const sender = req.user.role === 'admin' || req.user.role === 'analyst' ? 'agent' : 'user';

    ticket.messages.push({
      sender,
      content,
      timestamp: new Date()
    });

    // 如果是客服回复，更新状态和分配客服
    if (sender === 'agent') {
      ticket.status = 'in-progress';
      if (!ticket.agent) {
        ticket.agent = req.user._id;
      }
    }

    await ticket.save();
    await ticket.populate('user', 'username email');
    await ticket.populate('agent', 'username avatar');

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 更新会话状态
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ message: '无权限更新状态' });
    }

    const ticket = await CustomerService.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'username email')
     .populate('agent', 'username avatar');

    if (!ticket) {
      return res.status(404).json({ message: '会话不存在' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 分配客服
router.put('/:id/assign', auth, async (req, res) => {
  try {
    const { agentId } = req.body;
    
    if (req.user.role !== 'admin' && req.user.role !== 'analyst') {
      return res.status(403).json({ message: '无权限分配客服' });
    }

    const ticket = await CustomerService.findByIdAndUpdate(
      req.params.id,
      { agent: agentId },
      { new: true }
    ).populate('user', 'username email')
     .populate('agent', 'username avatar');

    if (!ticket) {
      return res.status(404).json({ message: '会话不存在' });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

module.exports = router; 