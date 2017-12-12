var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0803'),function(req, res, next) {
    res.useRender('order/rate');
});
router.get('/data',useValidate.hasLogin, function(req , res , next) {
    useRequest.send(req , res , {
        url:useUrl.order.rateList,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.post('/delete',useValidate.hasLogin, function(req , res , next) {
    useRequest.send(req , res , {
        url:useUrl.order.rateDelete,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/order/rate';