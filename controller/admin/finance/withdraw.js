var express = require('express');
var router = express.Router();
router.get('/audit',useValidate.hasLogin,usePermission.authMenu('menu00301'), function(req, res, next) {
    res.useRender('admin/finance/audit');
});
router.get('/list',useValidate.hasLogin,usePermission.authMenu('menu00302'), function(req, res, next) {
    res.useRender('admin/finance/list');
});
router.get('/list/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.withdraw.list,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/withdraw/detail',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.withdraw.info,
        data:req.query,
        done:function(a){
            res.useRender('/admin/finance/withdraw-info',{
                withdrawInfo:a.data
            });
        }
    })
});
exports.router = router;
exports.__path = '/admin/finance';