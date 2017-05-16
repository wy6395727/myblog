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

    //404 router
    app.use(function (req,res) {
        if(!res.headersSent){
            res.status(404).render('404')
        }
    })
}
module.exports=router;