// 1、获取对象
const app = require('../src/app/chat')

// 2、监听端口
app.listen(5210,() => {
    console.log("listen ...")
});