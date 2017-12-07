var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu07'),function(req, res, next) {
    res.useRender('product/list');
});
router.post('/add',useValidate.hasLogin, usePermission.authMenu('menu0701'),function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.product.add,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, usePermission.authMenu('menu0702'),function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.product.edit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/change',useValidate.hasLogin, usePermission.authMenu('menu0703'),function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.product[req.body.type],
        data:{
            goodsId:req.body.goodsId
        },
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/num',useValidate.hasLogin, usePermission.authMenu('menu0704'),function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.product.num,
        data:req.body,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/product';