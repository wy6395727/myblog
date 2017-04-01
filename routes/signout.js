/**
 * Created by vast on 2017/3/29.
 */
var router=require('express').Router()

var checkLogin=require('../middlewares/check').checkLogin

router.get('/',checkLogin,function (req,res,next) {
    res.send(req.flash())
})

module.exports=router