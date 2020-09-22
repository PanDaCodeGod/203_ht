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
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwer123!',
    database: '203_test'
});

db.connect((err) => {
    if (err) return console.log(err);
    console.log('成功');
});

module.exports = db;