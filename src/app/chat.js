const router = require('@koa/router')();
const { makeApp } = require('../utils/make_app');
const userRouter = require('../route/user/router');

// 1、创建对象
const app = makeApp();

// 2、引入路由
router.use('/app',userRouter.routes(),userRouter.allowedMethods());
// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 3、引入外部
module.exports = app