/*const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/203", {
    useNewUrlParser: true, useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.log('Connection Error:' + err)
    } else {
        console.log('Connection success!')
    }
});

module.exports = mongoose;
*/
// mysql
const dbconfig = require('./dbconfig')

const mysql = require('mysql');

const db = mysql.createConnection(dbconfig);

db.connect((err) => {
    if (err) return console.log(err);
    console.log('数据库' + dbconfig.database + '连接成功');
});

module.exports = db;