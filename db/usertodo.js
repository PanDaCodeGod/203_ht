/**
 * 这个模块主要实现用户数据的操作
 */
const tools = require('../utils/tools')

// db连接
const db = require('./connection');

/**
 *根据用户id获取未完成的待办事项
 *
 * @param {userid} 
 */
function getTodoByUserId(userid) {
    return new Promise((reslove, reject) => {
        db.query(`select * from usertodo where user_id='${userid}' and isdown=0`, (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
/**
 *完成代办事项
 *
 * @return {id} 
 */
function updateTodoByUserId(id) {
    return new Promise((reslove, reject) => {
        db.query(`update usertodo isdown=1 where id='${id}' `, (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}
/**
 *创建代办事项
 *
 * @return {todo} 
 */
function addTodo(todo) {
    return new Promise((reslove, reject) => {
        db.query(`insert into usertodo (id, task, user_id, bills_id, createtime, downtime,money,isdown,creater) values(null,'${todo.task}','${todo.user_id}','${todo.bills_id}',default,null,${todo.money},default),'${todo.creater}'`, (err, res) => {
            if (err) reject(err);
            reslove(res);
        });
    })
}

module.exports.getTodoByUserId = getTodoByUserId;
module.exports.updateTodoByUserId = updateTodoByUserId;
module.exports.addTodo = addTodo;