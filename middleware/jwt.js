const router = require('express').Router();
const jwt = require('jsonwebtoken');
const result = require('../utils/result');
const config = require('../config');


function jwtValidate(req, res, next) {
    if (req.url == '/user/login' || req.url == '/user/register') {
        next();
    } else {
        // 拿到token
        const token = req.headers.authorization.split(' ').pop();
        const id = jwt.verify(token, config.JWT_KEY).id;
        next();
    }
}

module.exports = jwtValidate;