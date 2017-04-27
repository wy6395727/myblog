/**
 * Created by vast on 2017/4/6.
 */
var Post=require('../lib/mongo').Post
var marked=require('marked')

// 将 post 的 content 从 markdown 转换成 html
Post.plugin('contentToHtml',{
    afterFind:function (posts) {
        return posts.map(function (posts) {
            posts.content=marked(posts.content)
            return posts
        })
    },
    afterFindOne:function (post) {
        if(post){
            post.content=marked(post.content)
        }
        return post
    }
})

module.exports={
    //创建文章
    create:function (post) {
        return Post.create(post).exec()
    },
    // 通过文章 id 获取一篇文章
    getPostById:function (postId) {
        return Post.findOne({_id:postId})
            .populate({path:'author',model:'User'}) //关联Post模型的‘author’到User 模型（集合）
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts:function (author) {
        var query={}
        if(author){
            query.author=author
        }
        return Post.find(query)
            .populate({path:'author',model:'User'})
            .sort({_id:-1})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 通过文章 id 给 pv 加 1
    inPv:function (postId) {
        return Post.update({_id:postId},{$inc:{pv:1}})
            .exec();
    }

//     我们使用了 markdown 解析文章的内容，所以在发表文章的时候可使用 markdown 语法（如插入链接、图片等等），关于 markdown 的使用请参考： Markdown 语法说明。
// 我们在 PostModel 上注册了 contentToHtml，而 addCreatedAt 是在 lib/mongo.js 中 mongolass 上注册的

}