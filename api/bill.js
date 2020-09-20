const express = require('express');
const router = express.Router();
const result = require('../utils/result');
// 数据库接口
const Bill = require('../db/bill');
router
    // 获取所有流水
    .get('/bills', async (req, res) => {
        try {
            let data = await Bill.getBills();
            res.send(result.succ(data));
        } catch (err) {
            res.send(result.fail('接口出现了一些错误'))
        }
    })
    // 添加流水
    .post('/bill', async (req, res) => {
        req.body.name = 'bbb';
        await Bill.addBill(req.body);
        res.send(result.succ(null, "流水添加成功"));
    })
    // 删除某一条流水
    .delete('/bill', (req, res) => {
        try {
            Bill.deleteBillById(req.body.id);
            res.send(result.succ(null, '本条流水删除成功'));
        } catch (err) {
            res.send(result.fail('接口出现了一些错误'))
        }
    })

module.exports = router;