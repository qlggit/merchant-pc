var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1103'), function(req, res, next) {
    res.useRender('withdraw/bank');
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.list,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    req.body.yzm = 123456;
    useRequest.send(req , res , {
        url:useUrl.bank.add,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/edit',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.edit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/delete',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.delete,
        data:req.body,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/withdraw/bank';