const express = require('express');
const router = express.Router();
const App = require('../db/app');
const Todo = require('../db/usertodo');

const path = require('path');
const User = require('../db/user');
const tools = require('../utils/tools')

router
    // 支付接口
    .post('/todo', (req, res) => {
        let meta = req.body;
        console.log(meta);
        let todo = {};
        // 用户的id
        todo.user_id = meta.user.id;
        // bill的id数组
        todo.bills_id = meta.bills_id;
        // 本次todo的金额
        todo.money = meta.user.money;
        // 本地todo的描述
        todo.task = `${meta.username}向你支付了`;
        // Todo.addTodo();
        res.sendStatus(200);
    })
    // 确认支付接口
    .put('/todo', (req, res) => {
        res.send(200);
    });

module.exports = router;