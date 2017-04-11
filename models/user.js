/**
 * Created by vast on 2017/4/6.
 */
var User=require('../lib/mongo').User

module.exports={
    create:function (user) {
        return User.create(user).exec()
    }
}