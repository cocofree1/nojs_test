const config = require('../../../config/config');
const Sequelize = require('sequelize');

// 连接数据库
const sequelize = new Sequelize(config.db.database,config.db.username,config.db.password,{
    host: config.host,
    dialect: 'mysql',
    pool: config.pool,
});

// 导出数据库
module.exports = sequelize;