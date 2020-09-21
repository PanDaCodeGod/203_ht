// 对返回结果进行一层封装
const result = {
    // 成功的结果
    succ(data, msg) {
        return {
            node_coode: 0,
            data: data || {},
            msg: msg || '成功'
        }
    },
    // 登录状态失效,需要重新登录
    relogin(data, msg) {
        return {
            node_coode: -1,
            data: data || {},
            msg: msg || '失败'
        }
    },
    // 失败的结果
    fail(data, msg) {
        return {
            node_coode: -2,
            data: data || {},
            msg: msg || '失败'
        }
    }
}

module.exports = result;