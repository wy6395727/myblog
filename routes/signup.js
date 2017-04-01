/**
 * Created by vast on 2017/3/29.
 */
var router=require('express').Router()

var checkNotLogin=require('../middlewares/check').checkNotlogin

// get  /signin 注册页
router.get('/',checkNotLogin,function (req,res,next) {
    res.render('siginup')
})

//post
router.post('/',checkNotLogin,function (req,res,next) {
    res.send(req.flash())
})

module.exports=router