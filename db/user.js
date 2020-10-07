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

/**
 * 这个模块主要实现用户数据的操作
 */
const tools = require('../utils/tools')

// db连接
const db = require('./connection');


/**
 *获取所有用户集合
 *
 * @return {*} 所有用户的集合对象
 */
function getUsers() {
    return new Promise((reslove, reject) => {
        db.query('select * from user', (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
/**
 *根据用户名查找用户,由于系统设计了用户名唯一的特性,只会找到一个用户
 *
 * @param {String} name 该用户的名称
 * @return {*} 该用户的数据
 */
function getUserByName(name) {
    return new Promise((reslove, reject) => {
        db.query(`select * from user where name='${name}'`, (err, res) => {
            if (err) reject(err);
            if (res) {
                reslove(res[0]);
            } else {
                reslove(null);
            }
        });
    })
}
/**
 * 根据id获取用户
 * 
 * @param {*} id 该用户的id
 * @return {*} 
 */
function getUserById(id) {
    return new Promise((reslove, reject) => {
        db.query(`select * from user where id=${id}`, (err, res) => {
            if (err) reject(err);
            if (res) {
                reslove(res[0]);
            } else {
                reslove(null);
            }
        });
    })
}
/**
 * 更新用户的最新登录时间
 *
 * @param {*} username
 * @return {*} 
 */
function updateUserLogin(username) {
    return new Promise((reslove, reject) => {
        date = tools.getCurrTime();
        db.query(`update user set logintime='${date}' where name='${username}'`, (err) => {
            if (err) reject(err);
            reslove(null);
        });
    })
}

/**
 * 更新用户正在使用的版本信息
 *
 * @param {*} username
 * @return {*} 
 */
function updateAppVersion(username, appversion) {
    return new Promise((reslove, reject) => {
        db.query(`update user set appversion='${appversion}' where name='${username}'`, (err) => {
            if (err) reject(err);
            reslove(null);
        });
    })
}

/**
 *添加一个用户
 *
 * @param {*} user
 * @return {*} 
 */
function addUser(user) {
    ('id', 'name', 'password', 'role', 'createtime', 'logintime')
    return new Promise((reslove, reject) => {
        db.query(`insert into user (id, name, password, role, createtime, logintime) values(null,'${user.name}','${user.password}',default,default,null)`, (err, res) => {
            if (err) reject(err);
            console.log(res);
            reslove(res);
        });
    })
}
/**
 *根据id删除一个用户
 *
 * @param {*} id
 * @return {*} 
 */
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
module.exports.updateUserLogin = updateUserLogin;
module.exports.deleteUserById = deleteUserById;
module.exports.updateAppVersion = updateAppVersion;