// 改用mysql
const db = require('./connection');
/**
 *  获取所有未背删除的流水
 *
 * @return {*} 流水的集合
 */
function getBills() {
    return new Promise((reslove, reject) => {
        db.query('select b.*,u.name from bill as b left join user as u on b.user_id=u.id where isdelete=0 order by createtime desc', (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
/**
 *添加一条流水
 *
 * @param {*} bill 这条流水的数据
 * @return {*} 
 */
function addBill(bill) {
    return new Promise((reslove, reject) => {
        db.query(`insert into bill values(null,'${bill.note}',${bill.user_id},default,default,${bill.money},default,default)`, (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
/**
 *根据id删除一条流水
 *
 * @param {*} id id值
 * @return {*} 
 */
function deleteBillById(id) {
    return new Promise((reslove, reject) => {
        db.query(`update bill set isdelete='1' WHERE id =${id} `, (err) => {
            if (err) reject(err);
            reslove(null);
        })
    });
}
/**
 *获取所有有效流水的总和
 *
 * @return {*} 符合条件的流水集合 
 */
function getTotal() {
    return new Promise((reslove, reject) => {
        db.query(`select sum(money) from bill where isdelete='0' `, (err, res) => {
            if (err) reject(err);
            reslove(res[0]['sum(money)']);
        })
    })
}
/**
 *获取某个用户所有的流水
 *
 * @param {*} userid 该用户的id
 */
function getBillByUserId(userid) {
    return new Promise((reslove, reject) => {
        db.query(`select * from bill where user_id='${userid}' and isdelete='0' `, (err, res) => {
            if (err) reject(err);
            if (res) {
                reslove(res);
            }
            reslove([]);
        })
    });
}
// 导出
module.exports.getBills = getBills;
module.exports.addBill = addBill;
module.exports.deleteBillById = deleteBillById;
module.exports.getTotal = getTotal;
module.exports.getBillByUserId = getBillByUserId;











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