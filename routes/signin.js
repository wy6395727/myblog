/**
 * Created by vast on 2017/3/29.
 */
var sha1=require('sha1')
var express=require('express')
var router=express.Router()
var UserModel=require('../models/user')

var checkNotLogin=require('../middlewares/check').checkNotlogin

// get  /signin 登录页
router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signin')
})

//post
router.post('/',checkNotLogin,function (req,res,next) {
    var name=req.fields.name
    var password=req.fields.password

    UserModel.getUserByName(name)
        .then(function (user) {
            // 、、验证输入
            if(!user){
                req.flash('error','用户名不存在')
                res.redirect('back')
            }else if(sha1(password)!==user.password){
                req.flash('error','密码不正确')
                res.redirect('back')
            }
            //登陆成功
            req.flash('success','登录成功了')
            // delete user.password
            req.session.user=user

            console.log(req.session)
            res.redirect('/posts')
        })
        .catch(next)
})

module.exports=router