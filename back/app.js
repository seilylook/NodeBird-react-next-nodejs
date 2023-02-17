const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const db = require('./models');

db.sequelize
  .sync()
  .then(() => {
    console.log('데이터 베이스 연결 성공');
  })
  .catch(console.error);

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
