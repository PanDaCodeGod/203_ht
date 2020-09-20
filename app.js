const express = require('express');
const app = express();

// 导入路由
const router = require('./api');

app.use(router);

app.listen(203);
