/**
 * Created by vast on 2017/4/6.
 */
var User=require('../lib/mongo').User

module.exports={
    //创建一个用户
    create:function (user) {
        return User.create(user).exec()
    },
    // 通过用户名获取用户信息 
    getUserByName:function (name) {
        return User
            .findOne({name:name})
            .addCreatedAt()  //这里我们使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳）
            .exec()
    }
}