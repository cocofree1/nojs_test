const Router = require('@koa/router');
const userRouter = require('./user_deal');
// 1、设置一级路由
const router = new Router;
router.use('/user',userRouter.routes(),userRouter.allowedMethods());

// 2、外部引入
module.exports = router;