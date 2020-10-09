const express = require('express');
const router = express.Router();
const App = require('../db/app');
const Bill = require('../db/bill');
const Todo = require('../db/usertodo');

const path = require('path');
const User = require('../db/user');
const tools = require('../utils/tools');
const result = require('../utils/result');
const {
    user
} = require('../db/dbconfig');

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
            todo.bills_id = JSON.stringify(meta.bills_id);
            // 本次todo的金额
            todo.money = meta.user.inmoney;
            // 本次待办事项的发起者
            todo.creater = meta.username;
            // 本地todo的描述
            todo.task = `${meta.username}向你支付了${todo.money}`;
            // 修改订单结算列
            meta.bills_id.forEach(async id => {
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
    .put('/todo/down', async (req, res) => {
        try {
            // id
            let todo_id = req.body.id;
            await Todo.updateTodoByUserId(todo_id);
            res.send(result.succ(null, '~OK~请等待对方确认'));
        } catch (err) {
            res.send(result.succ(err, '喵,貌似出现了一些问题~'));
        }
    })
    // 回溯接口
    .put('/todo/re', async (req, res) => {
        try {
            // id
            let todo_id = req.body.id;
            // todo发起者
            let creater = req.body.creater;
            // bill id数组
            let bills_id = JSON.parse(req.body.bills_id);
            // 将相关的bill订单全部回溯
            bills_id.forEach(async (id) => {
                // 预先工作
                let bill = await Bill.getBillById(id);
                let used = JSON.parse(bill.used);
                let index = used.indexOf(creater);
                used.splice(index, 1);
                used = JSON.stringify(used);
                // 更新订单结算状态
                await Bill.updateBillOnUsed(id, used);
                // 更新todo状态
            });
            await Todo.updateTodoByUserId(todo_id);
            res.send(result.succ(null, '~OK~'));
        } catch (err) {
            res.send(result.succ(err, '喵,貌似出现了一些问题~'));
        }
    })
    // 获取当前用户所有的待办事项
    .get('/todos', async (req, res) => {
        try {
            const id = req.user.id;
            let data = await Todo.getTodoByUserId(id);
            if (data.bills_id) data.bills_id = JSON.parse(data.bills_id);
            res.send(result.succ(data, '获取待办项成功'));
        } catch (err) {
            res.send(result.succ(err, '喵,貌似出现了一些问题~'));
        }
    })

module.exports = router;