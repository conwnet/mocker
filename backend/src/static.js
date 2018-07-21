const fs = require('fs');
const path = require('path');

// 获取 path 请求的文件的扩展名
const extension = path => {
    const extIndex = path.lastIndexOf('.');

    return extIndex >= 0 ? path.slice(extIndex + 1) : '';
};

// 处理静态文件请求
const static = ctx => {
    const file = path.resolve(__dirname, '..', '.' + (ctx.path.startsWith('/assets/') ? ctx.path : '/assets/index.html'));

    if (fs.existsSync(file)) {
        ctx.type = extension(file);
        ctx.body = fs.readFileSync(file);
    }
};

module.exports = static;
