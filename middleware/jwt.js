const router = require('express').Router();
const jwt = require('jsonwebtoken');
const result = require('../utils/result');
const config = require('../config');
const User = require('../db/user');


async function jwtMD(req, res, next) {
    let header = req.headers.authorization;
    if (req.url == '/user/login' || req.url == '/user/register' || new RegExp('/app/update').test(req.url)) {
        next();
    } else {
        // 截取token
        if (!header) return res.send(result.relogin(null, '请先登录'));
        try {
            const token = header.split(' ').pop();
            const id = jwt.verify(token, config.JWT_KEY).id;
            if (id == undefined || !id) {
                return res.send(result.relogin(null, '令牌无效'));
            }
            // 从数据库拿到user
            let user = await User.getUserById(id);
            if (!user) {
                return res.send(result.relogin(null, '没有该用户'));
            }
            // 将用户数据挂载到req中,方便其他中间件进行操作
            req.user = user;
            next();
        } catch (err) {
            return res.send(result.relogin(null, '请先登录'));
        }
    }
}

module.exports = jwtMD;