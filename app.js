const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 自定义中间件
const jwtvalidate = require('./middleware/jwt');
app.use(jwtvalidate);

// 导入路由
const BillRouter = require('./api/bill');
const UserBill = require('./api/user');

app.use(BillRouter);
app.use('/user', UserBill);

app.listen(203);