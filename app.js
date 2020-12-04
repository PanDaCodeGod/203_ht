const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options') {
        res.send(200); //让options尝试请求快速结束}
    } else {
        next();
    }

})


app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

// 自定义中间件
const jwtMD = require('./middleware/jwt');
// const userMD = require('./middleware/user');
app.use(jwtMD);
// app.use(userMD);

// 导入路由
const BillRouter = require('./api/bill');
const UserRouter = require('./api/user');
const appRouter = require('./api/app');
const todoRouter = require('./api/usertodo');

app.use(BillRouter);
app.use(todoRouter);
app.use('/user', UserRouter);
app.use('/app', appRouter);

app.listen(203);