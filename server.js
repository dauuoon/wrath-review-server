// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = 'reviews.json';

// 리뷰 목록 불러오기
app.get('/api/reviews', (req, res) => {
  let reviews = [];
  if (fs.existsSync(DATA_FILE)) {
    reviews = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  res.json(reviews);
});

// 리뷰 등록
app.post('/api/reviews', (req, res) => {
  let reviews = [];
  if (fs.existsSync(DATA_FILE)) {
    reviews = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  const now = new Date();
  const koreaTime = new Date(now.getTime() + (9 * 60 - now.getTimezoneOffset()) * 60000);
  const newReview = {
    id: Date.now().toString(),
    text: req.body.text,
    date: koreaTime.toLocaleString('ko-KR')
  };
  reviews.unshift(newReview);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
  res.json(newReview);
});

// 리뷰 삭제
app.delete('/api/reviews/:id', (req, res) => {
  let reviews = [];
  if (fs.existsSync(DATA_FILE)) {
    reviews = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  reviews = reviews.filter(r => r.id !== req.params.id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log('Review server running on port', PORT);
});