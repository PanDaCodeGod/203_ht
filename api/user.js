const express = require('express');
const router = express.Router();
const result = require('../utils/result');
// 数据库接口
const User = require('../db/user');
router
    // 登录
    .get('/login', async (req, res) => {
        let user = {
            name: req.body.name,
            password: req.body.password
        }
        await User.getUs
    })
    // 用户注册
    .post('/register', async (req, res) => {
        let user = {
            name: req.body.name,
            password: req.body.password
        }
        await User.addUser(user)
        res.send('ok');
    })
    // 用户注销
    .delete('/zhuxiao', (req, res) => {
        res.send('1s');

    })

module.exports = router;