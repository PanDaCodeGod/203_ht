/*const mongoose = require('./connection');

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    money: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    // 数据是否有效
    enable: {
        type: Boolean,
        default: true
    },
    // 伪删除
    isdelete: {
        type: Boolean,
        default: false
    }
});

const Bill = mongoose.model('Bill', billSchema);

// 默认查找条件
let obj = {
    isdelete: false
}

// 获取所有流水
function getBills() {
    return new Promise((reslove, reject) => {
        Bill.find(obj, (err, ret) => {
            if (err) {
                reject(err);
            }
            reslove(ret)
        });
    });
}
// 添加流水
function addBill(obj) {
    return new Promise((reslove, reject) => {

        Bill.create({
            ...obj
        }, (err, ret) => {
            if (err) {
                reject(err);
            }
            reslove(ret);
        })
    });
}
// 删除某条流水
function deleteBillById(id) {
    return new Promise((reslove, reject) => {
        Bill.updateOne({
            _id: id
        }, {
            isdelete: true
        }, function (err, ret) {
            if (err) {
                reject(err);
            }
            reslove(ret)
        });
    });
}
// 获取年度花费
function getTotal() {
    return new Promise((reslove, reject) => {
        Bill.aggregate([{
            $match: obj
        }, {
            $group: {
                _id: null,
                money: {
                    $sum: "$money"
                }
            }
        }], function (err, ret) {
            if (err) reject(err);
            reslove(ret);
        });
    });
}
module.exports.getBills = getBills;
module.exports.addBill = addBill;
module.exports.deleteBillById = deleteBillById;
module.exports.getTotal = getTotal;*/

// 改用mysql
const db = require('./connection');
// 获取所有流水
function getBills() {
    return new Promise((reslove, reject) => {
        db.query('select * from bill', (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
// 添加一条流水
// addBill({
//     note: 123,
//     user_id: 1,
//     money: 250
// });
function addBill(bill) {
    return new Promise((reslove, reject) => {
        db.query(`insert into bill values(null,${bill.note},${bill.user_id},default,default,${bill.money},default,default)`, (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
// 删除一条流水
// deleteBillById(16008);
function deleteBillById(id) {
    return new Promise((reslove, reject) => {
        db.query(`update bill set isdelete='1' WHERE id =${id} `, (err) => {
            if (err) reject(err);
            reslove(null);
        })
    })
}
// 获取所有有效流水金额的总和
getTotal();
function getTotal() {
    return new Promise((reslove, reject) => {
        db.query(`select sum(money) from bill where isdelete='0' `, (err, res) => {
            if (err) reject(err);
            console.log(res[0]['sum(money)']);
            reslove(res);
        })
    })
}
module.exports.getBills = getBills;
module.exports.addBill = addBill;
module.exports.deleteBillById = deleteBillById;
module.exports.getTotal = getTotal;