const express = require('express');
const jwt = require('jsonwebtoken');
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

// 获取用户资料
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'username avatar')
      .populate('following', 'username avatar');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 更新用户资料
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, bio, experience, certifications, achievements, avatar } = req.body;

    const user = await User.findById(req.user._id);
    user.profile = {
      name: name || user.profile?.name,
      bio: bio || user.profile?.bio,
      experience: experience || user.profile?.experience,
      certifications: certifications || user.profile?.certifications || [],
      achievements: achievements || user.profile?.achievements || []
    };
    user.avatar = avatar || user.avatar;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 关注/取消关注用户
router.post('/follow/:id', auth, async (req, res) => {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: '不能关注自己' });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: '用户不存在' });
    }

    const isFollowing = req.user.following.includes(req.params.id);
    
    if (isFollowing) {
      // 取消关注
      req.user.following = req.user.following.filter(id => id.toString() !== req.params.id);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== req.user._id.toString());
    } else {
      // 关注
      req.user.following.push(req.params.id);
      targetUser.followers.push(req.user._id);
    }

    await req.user.save();
    await targetUser.save();

    res.json({ 
      isFollowing: !isFollowing,
      followersCount: targetUser.followers.length,
      followingCount: req.user.following.length
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 搜索用户
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { 'profile.name': { $regex: query, $options: 'i' } }
      ]
    })
    .select('username avatar profile.name')
    .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取关注列表
router.get('/following/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('following', 'username avatar profile.name')
      .select('following');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json(user.following);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

// 获取粉丝列表
router.get('/followers/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('followers', 'username avatar profile.name')
      .select('followers');

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json(user.followers);
  } catch (error) {
    res.status(500).json({ message: '服务器错误', error: error.message });
  }
});

module.exports = router; 