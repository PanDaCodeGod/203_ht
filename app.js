const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 导入路由
const BillRouter = require('./api/bill');
const UserBill = require('./api/user');

app.use(BillRouter);
app.use(UserBill);

app.listen(203);
