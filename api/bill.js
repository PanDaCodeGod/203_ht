const express = require('express');
const router = express.Router();
const result = require('../utils/result');
// 数据库接口
const Bill = require('../db/bill');
const e = require('express');
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
    });

module.exports = router;