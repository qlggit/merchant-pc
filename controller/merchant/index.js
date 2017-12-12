var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0401'),function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.info,
        data:{
            supplierId:req.session.userInfo.company
        },
        done:function(a){
            res.useRender('merchant/info',{
                merchantInfo:a.data
            });
        }
    })
});
router.post('/edit',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.edit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/merchant';