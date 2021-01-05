const Sequelize = require('sequelize');
const sequelize = require('../lib/mysql/mysql');

class Chatroom extends Sequelize.Model {}
Chatroom.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    room_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    person_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
    },
},{
    sequelize, // 需要传递的实体
    modalName: 'chat_rooms',  //模型名称
    timestamps: true,  //启用时间戳，自动创建两个字段createAt,updateAt
    underscored: true, // 不启动驼峰模式自动转换为下划线
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Users;
