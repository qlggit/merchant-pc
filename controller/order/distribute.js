var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0301'),function(req, res, next) {
    res.useRender('order/seat');
});
router.get('/list',useValidate.hasLogin, function(req , res , next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.order.distributeList,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.post('/distribute' , function(req , res , next) {
    useRequest.send(req , res , {
        url:useUrl.order.distribute,
        data:req.body,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/order/distribute';