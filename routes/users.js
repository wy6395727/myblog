/**
 * Created by Administrator on 2017/3/22.
 */
var router=require('express').Router();

router.get('/:name',function (req,res) {
    res.send('hello boye'+req.params.name)
})

module.exports=router;