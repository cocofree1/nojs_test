const winston = require('winston')
const rTracer = require('cls-rtracer');

const { format } = winston;
const { combine,printf,timestamp } = format;

// 日志格式化处理
const myFormat = printf(({level,message,request_id,timestamp})=>{
    return `[ ${level} ] { "request_id": ${request_id}, "message": ${message}, "timestamp": ${timestamp} }`;
});

const reqIdFormatter = format((info) => {
    info.request_id = info.request_id || rTracer.id() || '-';
    return info;
});

// 配置日志系统
const logger = winston.createLogger({
    level: "info",  // 打印的日志级别
    
    // 处理日志的方式
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './log/info.log',
            level: 'info'   // 低于该等级的输出
        }),
        new winston.transports.File({
            filename: './log/err.log',
            level: 'error'
        }),
    ],

    //格式处理
    format: combine(
        reqIdFormatter(),
        timestamp(),
        myFormat,
    )
})
//日志输出
module.exports = logger