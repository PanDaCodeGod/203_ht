const express = require('express');
const router = express.Router();
const result = require('../utils/result');
const bcrypt = require('bcrypt');
// 注册码
const validateCode = require('../utils/registercode');
// 数据库接口
const User = require('../db/user');
const jwt = require('jsonwebtoken');
// JWT_KEY
const config = require('../config');
const {
    user
} = require('../db/dbconfig');
router
    // 登录
    .post('/login', async (req, res) => {
        try {
            let user_db = await User.getUserByName(req.body.name);
            user_db = await User.getUserById(user_db.id);
            if (!user_db) {
                return res.send(result.succ(null, '用户不存在'));
            }
            const isTruePassword = bcrypt.compareSync(String(req.body.password), user_db.password);
            if (!isTruePassword) {
                return res.send(result.succ(null, '密码错误'));
            }
            // 密码用户都正确,生成token
            const token = jwt.sign({
                id: String(user_db.id)
            }, config.JWT_KEY);

            return res.send(result.succ({
                token,
                user: user_db
            }, "登录成功"));
        } catch (err) {
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
            let user = await User.getUserByName(req.body.name);
            if (user) return res.send(result.succ(null, '用户已经存在'));
        } catch (err) {
            return res.send(result.succ(null, '服务器异常'));
        }
        const flag = await validateCode(req.body.code);
        if (flag) {
            try {
                user.password = bcrypt.hashSync(String(user.password), 10);
                await User.addUser(user);
                return res.send(result.succ(null, '注册成功'));
            } catch (err) {
                console.log(err);
                return res.send(result.succ(null, '注册失败'));
            }
        } else {
            return res.send(result.succ(null, '注册码有问题'));
        }
    })
    // 用户注销
    .delete('/zhuxiao', (req, res) => {
        res.send('1s');
    })
    // 获取所有用户
    .get('/users', async (req, res) => {
        try {
            let userCheckList = [];
            let users = await User.getUsers();
            for (let user of users) {
                if (user.name == req.user.name) {
                    continue;
                }
                userCheckList.push({
                    name: user.name,
                    id: user.id,
                    checked: false,
                    disabled: false
                });
            }
            return res.send(result.succ(userCheckList, '查询用户集合成功'));
        } catch (err) {
            return res.send(result.succ(err, '查询用户集合失败'));
        }
    });

module.exports = router;