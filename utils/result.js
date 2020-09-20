// 对返回结果进行一层封装
const result = {
    // 成功的结果
    succ(data, msg) {
        return {
            code: 0,
            data: data || {},
            msg: msg || '成功'
        }
    },
    // 失败的结果
    fail(data, msg) {
        return {
            coode: -1,
            data: data || {},
            msg: msg || '失败'
        }
    }
}

module.exports = result;