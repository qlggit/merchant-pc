var express = require('express');
var router = express.Router();
router.get('/history',useValidate.hasLogin, usePermission.authMenu('menu1203'),function(req, res, next) {
    res.useRender('wine/history');
});
router.get('/list',useValidate.hasLogin, usePermission.authMenu('menu1201'),function(req, res, next) {
    res.useRender('wine/list');
});
router.get('/stock',useValidate.hasLogin, usePermission.authMenu('menu1202'),function(req, res, next) {
    res.useRender('wine/stock');
});
router.post('/imp',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.wine.imp,
        data:req.body,
        method:'POST',
        done:function(data){
            res.useSend(data);
        }
    });
});
router.post('/exp',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.wine.exp,
        data:req.body,
        method:'POST',
        done:function(data){
            res.useSend(data);
        }
    });
});
router.get('/list/data',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.wine.list,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/wine';