var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0301'),function(req, res, next) {
    res.useRender('distribution/order');
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.order.distributeList,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.post('/do',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.order.distribute,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/distribution/order';