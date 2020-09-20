// 对返回结果进行一层封装
const result = {
    // 成功的结果
    succ(data, msg) {
        return {
            code: 0,
            data: data || {},
            msg: msg || '接口请求成功'
        }
    },
    // 失败的结果
    fail(data, msg) {
        return {
            coode: -1,
            data: data || {},
            msg: msg || '服务器端出现了一些异常,请联系管理员'
        }
    }
}

module.exports = result;