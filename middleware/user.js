const User = require('../db/user');

async function userMd(req, res, next) {
    console.log(req.query.username);
    next();
}

module.exports = userMd;