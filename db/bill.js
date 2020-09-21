const mongoose = require('./connection');

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
module.exports.getTotal = getTotal;