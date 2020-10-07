const db = require('./connection');

/**
 * 获取服务器端最新的版本信息
 *
 * @return {*} 包含了版本号和更新路径相关的一个对象
 */
function getCurrentVersion() {
    return new Promise((reslove, reject) => {
        db.query('select * from appinfo order by id desc limit 1', (err, res) => {
            if (err) reject(err);
            if (res) {
                reslove(res[0]);
            } else {
                reslove(null);
            }
        });
    })
}

module.exports.getCurrentVersion = getCurrentVersion;