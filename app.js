const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 自定义中间件
const jwtMD = require('./middleware/jwt');
const userMD = require('./middleware/user');
app.use(jwtMD);
app.use(userMD);

// 导入路由
const BillRouter = require('./api/bill');
const UserRouter = require('./api/user');
const appRouter = require('./api/app');

app.use(BillRouter);
app.use('/user', UserRouter);
app.use('/app', appRouter);

app.listen(203);