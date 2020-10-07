const User = require('../db/user');

async function userMd(req, res, next) {
    if (req.url == '/user/login' || req.url == '/user/register' || new RegExp('/app/update').test(req.url)) {
        next();
    }else{
 // 更新用户的登录时间
 await User.updateUserLogin(req.user.id);
 next();
    }
   
}

module.exports = userMd;
