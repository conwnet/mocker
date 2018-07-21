const mock = require('./mock');
const api = require('./api');
const static = require('./static');
const mockers = require('./data.json');

const dispatch = host => async (ctx, next) => {
    if ((new RegExp(host)).test(ctx.host)) {
        mock(ctx, mockers); // mock 请求
    } else if (ctx.path.startsWith('/api')) {
        api(ctx, mockers); // api 请求，查询或更新 mockers
    } else {
        static(ctx); // 请求静态页面
    }
};

module.exports = dispatch;
