const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('hello express');
});

app.listen(3065, () => {
  console.log(app.get('port'), '번 포트에서 실행 중');
});
