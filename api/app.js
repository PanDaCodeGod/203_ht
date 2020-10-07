const express = require('express');
const router = express.Router();
const App = require('../db/app');
const path = require('path');
const User = require('../db/user');

const tools = require('../utils/tools')

// TODO 查询配置文件或者数据库信息来确认是否有更新  
async function checkUpdate(params, callback) {
    console.log('有客户端正在检测更新');
    let result = await App.getCurrentVersion()
    //这里简单判定下，不相等就是有更新。  
    var currentVersions = params.appVersion.split('.');
    var resultVersions = result.appVersion.split('.');
    var cv = tools.arrToNum(currentVersions);
    var rv = tools.arrToNum(resultVersions);
    if (currentVersions[0] < resultVersions[0]) {
        // 说明有大版本更新  
        callback(null, {
            update: true,
            wgtUrl: '',
            pkgUrl: result.pkgUrl
        })
    }
    // 小版本热更新 
    else if (cv < rv) {
        callback(null, {
            update: true,
            wgtUrl: result.wgtUrl,
            pkgUrl: ''
        })
    }
    // 没有更新 
    else {
        return callback(null);
    }
}

// 检测热更新接口
router.get('/update', async function (req, res) {
    // 获取客户端本版信息
    var appName = req.query.name;
    var appVersion = req.query.version;
    let username = req.query.username;
    if (username) {
        await User.updateAppVersion(username, appVersion);
        await User.updateUserLogin(username);
    }
    checkUpdate({
        appName: appName,
        appVersion: appVersion
    }, function (error, result) {
        if (error) {
            throw error;
        }
        res.json(result);
    });
});

// 热更新包下载
router.get('/update/hotupdate', function (req, res) {
    console.log('有客户端正在更新');
    res.download(path.join(__dirname, '../static/appversion/__UNI__690FBDD.wgt'), '__UNI__690FBDD.wgt', (err) => {
        if (err) console.log(err);
    });
});

module.exports = router;