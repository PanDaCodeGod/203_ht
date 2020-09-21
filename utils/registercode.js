const fs = require('fs');
// code = ['1a2c1b', '12sa5s', '4dsa5d'];
flag = false;

async function read(codeStr) {
    if (codeStr.trim().length === 0) return flag;
    let code = await fs.readFileSync(__dirname + '/code.json', {
        encoding: 'utf8'
    });
    code = JSON.parse(code);
    const index = code.indexOf(codeStr);
    if (index == -1) return flag;
    code.splice(index, 1);
    await write(code);
}

async function write(code) {
    await fs.writeFileSync(__dirname + '/code.json', JSON.stringify(code));
    flag = true;
}

async function valideCode(codeStr) {
    await read(codeStr);
    return flag;
}

module.exports = valideCode;