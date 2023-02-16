const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3065, () => {
  console.log('서버 실행 중');
});
