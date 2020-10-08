const express = require('express');
const router = express.Router();
const result = require('../utils/result');
// 数据库接口
const Bill = require('../db/bill');
const User = require('../db/user');

router
    // 获取所有流水
    .get('/bills', async (req, res) => {
        try {
            let data = await Bill.getBills();
            return res.send(result.succ(data));
        } catch (err) {
            return res.send(result.succ(null, err))
        }
    })
    // 总计花费
    .get('/totalmoney', async (req, res) => {
        try {
            let data = await Bill.getTotal();
            return res.send(result.succ(data));
        } catch (err) {
            return res.send(result.succ(null, err))
        }
    })
    // 添加流水
    .post('/bill', async (req, res) => {
        req.body.user_id = req.user.id;
        try {
            await Bill.addBill(req.body);
            return res.send(result.succ(null, "添加成功"));
        } catch (err) {
            return res.send(result.succ(null, err));
        }
    })
    // 删除某一条流水
    .delete('/bill', async (req, res) => {
        try {
            await Bill.deleteBillById(req.body.id);
            return res.send(result.succ(null, '删除成功'));
        } catch (err) {
            return res.send(result.succ(null, err))
        }
    })
    // 获取当前登录用户的所有流水
    .get('/bills/user', async (req, res) => {
        try {
            let data = await Bill.getBillByUserId(req.user.id);
            return res.send(result.succ(data, '该用户流水查询成功'));
        } catch (err) {
            return res.send(result.succ(err, '查询出错'));
        }
    })
    // 饼状图数据
    .get('/bills/pie', async (req, res) => {
        try {
            let data = await Bill.getBills();
            let pie = [];
            // 封装饼状图所需要的数据
            for (let i = 0; i < data.length; i++) {
                let index = pie.findIndex(function (e) {
                    return e.name == data[i].name;
                });
                // 如果是第一次
                if (index == -1) {
                    pie.push({
                        name: data[i].name,
                        data: data[i].money
                    })
                } else {
                    pie[index].data += data[i].money;
                }
            }

            return res.send(result.succ(pie, '饼状图数据获取成功'));
        } catch (err) {
            return res.send(result.succ(null, err))
        }
    })
    // 结算页面数据封装
    .get('/bills/jiesuan', async (req, res) => {
        let username = req.query.username;
        try {
            let bills = await Bill.getBills();
            let users = await User.getUsers();
            // 本接口返回的数据
            let data = [];
            // 当前用户
            let curr_user = users.filter(u => {
                return u.name == username;
            });
            // 当前用户的流水
            let curr_bills = bills.filter(b => {
                return b.name == username;
            });
            // 其他用户集合
            let other_users = users.filter(u => {
                return u.name != username;
            });
            // 其他用户的流水
            let other_bills = bills.filter(b => {
                return b.name != username;
            });
            // 封装其他用户的数据
            other_users.forEach(user => {
                // 循环到的用户的数据载体
                let obj = {}
                // 存储循环到的当前用户
                obj.user = user;
                // 支付置空
                obj.user.inmoney = 0;
                // 没有支付的订单列表
                obj.data = []
                other_bills.forEach(bill => {
                    // 只过滤当前循环到的用户流水
                    if (user.id == bill.user_id) {
                        let flag = false;
                        // 如果从已支付列表找到,就变为true,就不会进入下边的if
                        if (bill.used != '[]') {
                            let usedarr = JSON.parse(bill.used);
                            flag = usedarr.includes(username);
                        }
                        // 如果没找到,说明当前用户没有支付,把订单push进去
                        if (!flag) {
                            obj.data.push(bill);
                            obj.user.inmoney += bill.money;
                        }
                    }
                });
                // 计算应该支付给每个用户多少钱
                obj.user.inmoney = (obj.user.inmoney / 3).toFixed(2);
                // 存进返回值
                data.push(obj);
            });
            // 封装当前用户的数据
            let obj = {};
            obj.user = curr_user[0];
            obj.data = [];
            other_users.forEach((user, index) => {

                obj.data[index] = {
                    name: user.name,
                    outmoney: 0
                };
                curr_bills.forEach(bill => {
                    let flag = false;
                    // 如果从已支付列表找到,就变为true,就不会进入下边的if
                    if (bill.used != '[]') {
                        let usedarr = JSON.parse(bill.used);
                        flag = usedarr.includes(user.name);
                    }
                    // 如果没找到,说明当前用户没有支付,把订单push进去
                    if (!flag) {
                        obj.data[index].outmoney += bill.money;
                    }
                });
                obj.data[index].outmoney = (obj.data[index].outmoney / 3).toFixed(2);
                if (index == other_users.length - 1) {
                    data.push(obj);
                }
            });
            return res.send(result.succ(data, '查询成功'));
        } catch (err) {
            console.log(err);
            return res.send(result.succ(err, '查询出错'));
        }
    })

module.exports = router;