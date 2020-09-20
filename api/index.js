const express = require('express');
const router = express.Router();

const result = require('../utils/result');
router
    // 获取流水
    .get('/bills', (req, res) => {
        res.send(result.succ([{
            name: 'Panda',
            date: '123',
            money: 897,
            note: '购买了苹果'
        }, {
            name: 'Panda',
            date: '123',
            money: 897,
            note: 123
        }, {
            name: 'Panda',
            date: '123',
            money: 897,
            note: 123
        }, {
            name: 'Panda',
            date: '123',
            money: 897,
            note: 123
        }, {
            name: 'Panda',
            date: '123',
            money: 897,
            note: 123
        }, {
            name: '潘爹',
            date: '2020-08-23',
            money: 897,
            note: '的科技撒赖的骄傲两款手机的拉萨大家阿斯利康建档立卡建档立卡是'
        }, {
            name: 'Panda',
            date: '123',
            money: 897,
            note: 123
        }]));
    })
    // 添加流水
    .put('/bills', (req, res) => {
        res.send('正在实现');
    })
    // 删除某一条流水
    .delete('/bills', (req, res) => {
        res.send('正在实现');
    })

module.exports = router;