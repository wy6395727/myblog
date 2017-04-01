/**
 * Created by Administrator on 2017/3/22.
 */
var router=function (app) {
    app.get('/',function (req,res) {  //主页
        res.redirect('/posts')
    });
    app.use('/signup',require('./signup'))
    app.use('/signin',require('./signin'))
    app.use('/signout',require('./signout'))
    app.use('/posts',require('./posts'))
}
module.exports=router;