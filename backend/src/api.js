const fs = require('fs');

// 保存 mockers
const save = mockers => new Promise(resolve => {
    fs.writeFile('./data.json', JSON.stringify(mockers), resolve);
});

// 处理 api 请求
const api = (ctx, mockers) => {
    const response = {errcode: 0, errmsg: 'OK'};

    if (ctx.method === 'GET') {
        response.data = mockers;
    } else if (ctx.method === 'POST') {
        mockers.splice(0, mockers.length, ...ctx.request.body);
        save(mockers);
    }

    ctx.body = response;
};

module.exports = api;
