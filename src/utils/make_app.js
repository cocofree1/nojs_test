const Koa = require('koa'); 
const bodyParser = require('koa-bodyparser');
const rTracer = require('cls-rtracer');
const logger = require('../lib/log/log');
const ApiError = require('../lib/error/api_error');

function makeApp(){
    // 创建app
    const app = new Koa;
    app.proxy = true;
    // 使用中间件后，可以用ctx.request.body进行获取POST请求参数，中间件自动给我们解析为json
    app.use(bodyParser());
    // 链路追踪
    app.use(rTracer.koaMiddleware());
    app.use(async (ctx, next) => { 
        ctx.req.reqId = rTracer.id(); 
        await next(); 
    });
    // 包装错误返回
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch(err) {
            logger.error('respond error:',err);
            if (err instanceof ApiError) {
                ctx.status = err.status;
                ctx.body = {
                    errcode: err.code,
                    errmsg: err.msg,
                };
            } else {
                logger.error('internal error:',err);
                ctx.status = 500;
            }
        }
    });
    // 包装正常返回
    app.use(async (ctx,next) =>{
        await next();
        if (ctx.state.data != undefined){
            ctx.body = {
                errcode: 0,
                errmsg: '',
                data: ctx.state.data,
            }
        }
    });
    return app;
}

module.exports = {
    makeApp,
}