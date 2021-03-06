/**
 * Created by vast on 2017/3/29.
 */
var express=require('express')
var router=express.Router()

var checkLogin=require('../middlewares/check').checkLogin

router.get('/',checkLogin,function (req,res,next) {
    // 清空 session 中用户信息
    req.session.user=null
    req.flash('success','退出成功')
    // 登出成功后跳转到主页
    res.redirect('/posts')
})

module.exports=router