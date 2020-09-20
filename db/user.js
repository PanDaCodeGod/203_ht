const mongoose = require('./connection');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    },
    role: {
        type: Number,
        // 0:超级管理员,1:普通用户,2:游客账号
        require: true,
        default: 1
    },
    semil: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

// 获取所有用户
function getUsers() {
    return new Promise((reslove, reject) => {
        User.find((err, ret) => {
            if (err) {
                reject(err);
            }
            reslove(ret)
        });
    });
}
// 通过用户名查找用户
function getUserByName(name) {
    return new Promise((reslove, reject) => {
        User.findOne({
            name
        }, function (err, ret) {
            if (err) {
                reject(err);
            }
            reslove(ret);
        });
    });
}
// 注册账号
function addUser(obj) {
    return new Promise((reslove, reject) => {
        Bill.create({ ...obj }, (err, ret) => {
            if (err) {
                reject(err);
            }
            reslove(ret);
        })
    });
}
// 删除某个用户
function deleteUserById(id) {
    return new Promise((reslove, reject) => {
        User.deleteOne({ _id: id }, function (err, ret) {
            if (err) {
                reject(err);
            }
            reslove(ret)
        });
    });

}


module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;
module.exports.deleteUserById = deleteUserById;


