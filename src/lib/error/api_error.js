'use strict';

const assert = require('assert');

const CODES = {
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
};


// 继承Error
class ApiError extends Error{
    // 构造函数
    constructor(status,msg,err,code){
        // status在400-500之间（断言）
        assert(status >= 400 && status <= 500,'status should be in [400,500]');
        const message = `ApiError:status[${status}],code[${code}],msg[${msg}],errMsg[${err instanceof Error ? err.message:''}]`;
        super(message);
        this.status = status;
        this.code = code || status;
        this.msg = msg;
        this.detail = err;
    };
}

ApiError.CODES = CODES;

module.exports = ApiError;