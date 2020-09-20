const express = require('express');
const router = express.Router();
const result = require('../utils/result');
const bcrypt = require('bcrypt');
// 数据库接口
const User = require('../db/user');

const jwt = require('jsonwebtoken');
// JWT_KEY
const config = require('../config');

router
    // 登录
    .post('/login', async (req, res) => {
        try {
            let user_db = await User.getUserByName(req.body.name);
            if (!user_db) {
                return res.send(result.succ(null, '用户不存在'));
            }
            const isTruePassword = bcrypt.compareSync(String(req.body.password), user_db.password);
            if (!isTruePassword) {
                return res.send(result.succ(null, '密码错误'));
            }
            // 密码用户都正确,生成token
            const token = jwt.sign({
                id: String(user_db._id)
            }, config.JWT_KEY);

            res.send(result.succ({
                token,
                user_db
            }, "登录成功"));
        } catch (err) {
            console.log(err);
            return res.send(result.succ(null, '出现错误'));
        }


    })
    // 用户注册
    .post('/register', async (req, res) => {
        let user = {
            name: req.body.name,
            password: req.body.password
        };
        try {
            await User.addUser(user);
            res.send(result.succ(null, '注册成功'));
        } catch (err) {
            res.send(result.succ(null, err));
        }
    })
    // 用户注销
    .delete('/zhuxiao', (req, res) => {
        res.send('1s');
    })

module.exports = router;