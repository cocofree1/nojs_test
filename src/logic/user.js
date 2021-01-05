const User = require('../modal/user');

//如果不存在就创建此表
//let user = User.sync({ force: false });
// 添加
function createUser(options) {
    return User.create(options);
}

// 删除
function deleteUser() {
    return User.destroy({
        where: options,
    });
}

// 修改
function updateUser(updateOptions, whereOptions) {
    return User.update({updateOptions,
        where: whereOptions});
}


// 查询
function searchUser(options) {
    return User.findAll({
        where:options
    });
}

// 导出函数
module.exports = {
    createUser,
    searchUser,
    deleteUser,
    updateUser,
}