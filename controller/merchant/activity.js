var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0403'),function(req, res, next) {
    res.useRender('merchant/activity');
});

router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    req.body.status = 'normal';
    useRequest.send(req , res , {
        url:useUrl.merchant.actAdd,
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
        url:useUrl.merchant.actList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/edit',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.actEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/change',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant[req.body.type === 'up'?'actUp':'actDown'],
        data:{
            actId:req.body.actId
        },
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.actDelete,
        data:{
            actId:req.body.actId
        },
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/merchant/activity';