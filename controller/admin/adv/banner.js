var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu00701'),function(req, res, next) {
    res.useRender('admin/adv/banner');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    //添加商户
    useRequest.send(req , res , {
        url:useUrl.adv.bannerAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.post('/edit',useValidate.hasLogin,function(req, res, next) {
    //添加商户
    useRequest.send(req , res , {
        url:useUrl.adv.bannerEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.adv.bannerList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/adv/banner';