/**
 * Created by vast on 2017/3/29.
 */

module.exports={
    checkLogin:function (req,res,next) {
        if(!req.session.user){
            req.flash('error','未登录')
            return res.redirect('/signin')
        }
        next()
    },
    checkNotlogin:function (req,res,next) {
        if(req.session.user){
            req.flash('error','已登录')
            return res.redirect('back')
        }
        next()
    }
}