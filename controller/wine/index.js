var express = require('express');
var router = express.Router();
router.get('/history',useValidate.hasLogin, usePermission.authMenu('menu1203'),function(req, res, next) {
    res.useRender('wine/list');
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