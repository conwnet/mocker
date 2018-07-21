// 判断是否匹配 mocker
const match = (request, mocker) => (
    mocker.method === request.method && new RegExp(mocker.path).test(request.path)
);

// 执行 mocker 中的 script
const run = (request, script) => (
    (new Function(`
        const [request] = arguments;
        const require = () => {};
        with (request) {
            try {${script}} catch (e) { return e.message; }
        }
    `))({request})
);

// 根据 mocker 设置 response
const setResponse = ({request, response}, mocker) => {
    response.status = mocker.status;
    response.message = mocker.message;
    response.set(mocker.header);
    response.body = (mocker.script && run(request, mocker.script)) || mocker.body;
    // response.body = mocker.body;
    return true;
}

// 处理 mock 请求
const mock = (ctx, mockers) => {
    const mocker = mockers.find(item => match(ctx.request, item));

    return mocker && setResponse(ctx, mocker);
}

module.exports = mock;
