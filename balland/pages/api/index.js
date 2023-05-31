const express = require('express');
const app = express();

// 이 코드는 사용자의 요청을 /api 경로로 라우팅합니다.
app.use('/api', (req, res) => {
  res.send('Hello World!');
});

// 이 코드는 Express 서버를 시작합니다.
app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});