// 获取当前时间
function getCurrTime() {
    let date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
// 数组转数字
function arrToNum(arr) {
    if (!arr || arr.length === 0) return null;
    var str = ''
    arr.forEach(e => {
        str += e;
    });
    return Number(str);
}

module.exports.getCurrTime = getCurrTime;
module.exports.arrToNum = arrToNum;