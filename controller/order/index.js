var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0802'),function(req, res, next) {
    res.useRender('order/list');
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.order.list,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.get('/infoBySeat',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.order.infoBySeat,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/order';