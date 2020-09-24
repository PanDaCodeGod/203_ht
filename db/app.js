// 改用mysql
const db = require('./connection');

function getCurrentVersion() {
    return new Promise((reslove, reject) => {
        db.query('select * from appinfo order by id desc limit 1', (err, res) => {
            if (err) reject(err);
            reslove(res[0]);
        });
    })
}

getCurrentVersion();
module.exports.getCurrentVersion = getCurrentVersion;