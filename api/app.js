const express = require('express');
const router = express.Router();
const App = require('../db/app');
const path = require('path');
const {
    join
} = require('path');

// 数组转数字
function arrToNum(arr) {
    if (!arr || arr.length === 0) return null;
    var str = ''
    arr.forEach(e => {
        str += e;
    });
    return Number(str);
}


// TODO 查询配置文件或者数据库信息来确认是否有更新  
async function checkUpdate(params, callback) {
    let result = await App.getCurrentVersion()
    console.log(result);
    //这里简单判定下，不相等就是有更新。  
    var currentVersions = params.appVersion.split('.');
    var resultVersions = result.appVersion.split('.');
    var cv = arrToNum(currentVersions);
    var rv = arrToNum(resultVersions);
    if (currentVersions[0] < resultVersions[0]) {
        // 说明有大版本更新  
        callback(null, {
            update: true,
            wgtUrl: '',
            pkgUrl: result.pkgUrl
        })
        // 小版本更新
        // } else if (cv < rv) {
        //     callback(null, {
        //         update: true,
        //         wgtUrl: result.wgtUrl,
        //         pkgUrl: ''
        //     })
        // 永远更新
    } else {
        callback(null, {
            update: true,
            wgtUrl: result.wgtUrl,
            pkgUrl: ''
        })
    }
}

// 检测热更新接口
router.get('/update', function (req, res) {
    var appName = req.query.name;
    var appVersion = req.query.version;
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