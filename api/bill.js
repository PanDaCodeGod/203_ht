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
            res.send(result.succ(null, err))
        }
    })
    // 添加流水
    .post('/bill', async (req, res) => {
        req.body.name = 'bbb';
        try {
            await Bill.addBill(req.body);
            res.send(result.succ(null, "添加成功"));
        } catch (err) {
            res.send(result.succ(null, err));
        }
    })
    // 删除某一条流水
    .delete('/bill', (req, res) => {
        try {
            Bill.deleteBillById(req.body.id);
            res.send(result.succ(null, '删除成功'));
        } catch (err) {
            res.send(result.succ(null, err))
        }
    })

module.exports = router;