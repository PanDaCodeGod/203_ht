const express = require('express');
const router = express.Router();
const App = require('../db/app');
const Bill = require('../db/bill');
const Todo = require('../db/usertodo');

const path = require('path');
const User = require('../db/user');
const tools = require('../utils/tools');
const result = require('../utils/result');

router
    // 支付接口
    .post('/todo', async (req, res) => {
        try {
            let meta = req.body;
            // 代办项数据载体
            let todo = {};
            // 用户的id
            todo.user_id = meta.user.id;
            // bill的id数组
            todo.bills_id = meta.bills_id;
            // 本次todo的金额
            todo.money = meta.user.inmoney;
            // 本次待办事项的发起者
            todo.creater = meta.username;
            // 本地todo的描述
            todo.task = `${meta.username}向你支付了${todo.money}`;
            // 修改订单结算列
            todo.bills_id.forEach(async id => {
                // 预先工作
                let bill = await Bill.getBillById(id);
                let used = JSON.parse(bill.used);
                used.push(meta.username)
                used = JSON.stringify(used);
                // 更新订单结算状态
                await Bill.updateBillOnUsed(id, used);
            });
            // 生成待办项
            await Todo.addTodo(todo);
            res.send(result.succ(null, '~OK~'));
        } catch (err) {
            res.send(result.succ(err, '喵,貌似出现了一些问题~'));
        }
    })
    // 确认支付接口
    .put('/todo', (req, res) => {
        res.send(200);
    })
    // 获取当前用户所有的待办事项
    .get('/todos', async (req, res) => {
        try {
            const id = req.user.id;
            let data = await Todo.getTodoByUserId(3);
            res.send(result.succ(data, '获取待办项成功'));
        } catch (err) {
            res.send(result.succ(err, '喵,貌似出现了一些问题~'));
        }
    })

module.exports = router;