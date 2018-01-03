var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0405'),function(req, res, next) {
    res.useRender('merchant/env');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    req.body.status = 'normal';
    useRequest.send(req , res , {
        url:useUrl.merchant.envAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.envList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.envEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/merchant/env';