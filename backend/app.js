const Koa = require('Koa');
const koaBody = require('koa-body');
const dispatch = require('./src/dispatch');
const env = require('./env');

const app = new Koa();

app.use(koaBody());
app.use(dispatch(env.host));

app.listen(env.port);
