const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const db = require('./models');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('데이터 베이스 연결 성공');
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});
