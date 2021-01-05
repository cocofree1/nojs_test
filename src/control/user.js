const Sequelize = require("sequelize");
const logger = require('../lib/log/log');
const userDeal = require('../logic/user');
const regex = require('../utils/regex_match');
const ApiError = require('../lib/error/api_error');
const { register } = require("../route/user/router");

function userLogin() {
    return async (ctx,next) => {
        // 1、获取用户信息
        const login = ctx.request.body.login;
            // 1.1 验证登录信息 （telephone,name,email）
        const loginInfo = regex.regexMatchOptions(login)
        // 2、比较密码
        const user = await userDeal.searchUser(loginInfo);
        if (user.length == 0){
            throw new ApiError(ApiError.CODES.BAD_REQUEST,'用户名或密码不正确')
        } else {
            ctx.state.data = '登录成功！';
            logger.info('登录成功!');
        }
        await next();
    };
}

function userRegister() {
    return async (ctx,next) => {
        const registerInfo = ctx.request.body.register;
        // 1、验证登录
        if (!regex.regexPhone(registerInfo.telephone) || !regex.regexEmail(registerInfo.email)){
            throw new ApiError(ApiError.CODES.BAD_REQUEST,'电话号或邮箱格式不正确')
        }
        // 2、写入数据库
        await userDeal.createUser(registerInfo);
        ctx.state.data = '注册成功!';
        logger.info('注册成功!');
        await next();
    };
}

module.exports = {
    userLogin,
    userRegister,
}