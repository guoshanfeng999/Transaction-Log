const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  change: {
    type: Number,
    default: 0
  },
  changePercent: {
    type: Number,
    default: 0
  },
  volume: {
    type: Number,
    default: 0
  },
  marketCap: {
    type: Number,
    default: 0
  },
  sector: String,
  industry: String,
  description: String,
  logo: String,
  chartData: [{
    date: Date,
    price: Number,
    volume: Number
  }],
  news: [{
    title: String,
    content: String,
    source: String,
    date: Date,
    url: String
  }],
  analysis: {
    technical: String,
    fundamental: String,
    sentiment: String
  },
  isHot: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stock', stockSchema); 