const router = require('@koa/router')();
const userControl = require('../../control/user');
// 1、设置二级路由
router.post('/login',userControl.userLogin());
router.post('/register',userControl.userRegister());

// 2、外部引入
module.exports = router;