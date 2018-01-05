var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu00102'),function(req, res, next) {
    res.useRender('admin/merchant/contract');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.contractAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.contractList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/merchant/contract';