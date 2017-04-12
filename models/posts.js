/**
 * Created by vast on 2017/4/6.
 */
var Post=require('../lib/mongo').Post

module.exports={
    //创建文章
    create:function (post) {
        return Post.create(post).exec()
    },

}