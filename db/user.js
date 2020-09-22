/*const mongoose = require('./connection');

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
            return require('bcrypt').hashSync(String(val), 10);
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
// 通过id查找
function getUserById(id) {
    return new Promise((reslove, reject) => {
        User.findById(id, (err, ret) => {
            if (err) reject(err);
            reslove(ret);
        })
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
        User.create({
            ...obj
        }, (err, ret) => {
            if (err) {
                reject(err);
            }
            reslove(ret);
        })
    });
}
// 注销账户
function deleteUserById(id) {
    return new Promise((reslove, reject) => {
        User.deleteOne({
            _id: id
        }, function (err, ret) {
            if (err) {
                reject(err);
            }
            reslove(ret)
        });
    });

}


module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUserById = deleteUserById;
*/



// 改用mysql
const db = require('./connection');
// 获取所有用户
function getUsers() {
    return new Promise((reslove, reject) => {
        db.query('select * from user', (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
// 根据用户名获取用户
function getUserByName(name) {
    return new Promise((reslove, reject) => {
        db.query(`select * from user where name='${name}'`, (err, res) => {
            if (err) reject(err);
            reslove(res[0]);
        });
    })
}
// 根据id获取用户
function getUserById(id) {
    return new Promise((reslove, reject) => {
        db.query(`select * from user where id=${id}`, (err, res) => {
            if (err) reject(err);
            reslove(res[0]);
        });
    })
}
// 添加一个用户
function addUser(user) {
    return new Promise((reslove, reject) => {
        db.query(`insert into user values(null,'${user.name}','${user.password}',default,default,null)`, (err, res) => {
            if (err) reject(err);
            console.log(res);
            reslove(res);
        });
    })
}
// 根据id删除用户
function deleteUserById(id) {
    return new Promise((reslove, reject) => {
        db.query(`update bill set isdelete='1' WHERE id =${id} `, (err) => {
            if (err) reject(err);
            reslove(null);
        })
    })
}

module.exports.getUserByName = getUserByName;
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUserById = deleteUserById;