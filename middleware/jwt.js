const router = require('express').Router();
const jwt = require('jsonwebtoken');
const result = require('../utils/result');
const config = require('../config');
const User = require('../db/user');


async function jwtValidate(req, res, next) {
    if (req.url == '/user/login' || req.url == '/user/register') {
        next();
    } else {
        // 拿到token
        let header = req.headers.authorization;
        if (!header) return res.send(result.relogin(null, '请先登录'));
        try {
            const token = header.split(' ').pop();
            const id = jwt.verify(token, config.JWT_KEY).id;
            if (!id) {
                res.send(result.relogin(null, '令牌无效'));
            }
            // 从数据库拿到user
            let user = await User.getUserById(id);
            if (!user) {
                res.send(result.relogin(null, '没有该用户'));
            }
            req.user = user;
            next();
        } catch (err) {
            res.send(result.relogin(null, '请先登录'));
        }
    }
}

module.exports = jwtValidate;