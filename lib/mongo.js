var config=require('config-lite')
var Mongolass=require('mongolass')
var moment=require('moment') //时间格式话插件
var objectidToTimestamp=require('objectid-to-timestamp') //将objectID（_id）转成文档创建时间 ex:11443311

mongolass=new Mongolass()
mongolass.connect(config.mongodb)

//定义mongolass插件，以_id生成create_at
mongolass.plugin('addCreatedAt',{
    afterFind:function (results) {
        if(results){
             results.forEach(function (item) {
                 item.create_at=moment(objectidToTimestamp(item._id)).format("YYYY-MM-DD HH:mm")
            })
        }
        return results
    },
    afterFindOne:function (result) {
        if(result){
            result.create_at=moment(objectidToTimestamp(result._id)).format("YYYY-MM-DD HH:mm")
        }
        return result
    }
})


//用户模型，model相当于collection,
exports.User=mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
})
//根据用户名找到用户，用户名全局唯一  index({字段：1/-1}，{全局唯一：true/false})
exports.User.index({name:1},{unique:true}).exec()

//我们只存储文章的作者 id、标题、正文和点击量这几个字段
exports.Post=mongolass.model('Post',{
    author:{type:Mongolass.Types.ObjectId},
    title:{type:'string'},
    content:{type:'string'},
    pv:{type:'number'},
})
exports.Post.index({author:1,_id:-1}).exec() // 按创建时间降序查看用户的文章列表

exports.Comment=mongolass.model('Comment',{
    author:{type:Mongolass.Types.ObjectId},
    content:{type:'string'},
    postId:{type:Mongolass.Types.ObjectId}
})
exports.Comment.index({ postId: 1, _id: 1 }).exec();// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言