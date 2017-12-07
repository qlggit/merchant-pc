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
exports.router = router;
exports.__path = '/merchant';