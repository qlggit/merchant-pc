var express = require('express');
var router = express.Router();

router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0201'),  function(req, res, next) {
    res.useRender('permission/merchant/role');
});

router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.role,
        data:{
            company:req.session.userInfo.company,
            name:req.query.name,
        },
        done:function(a){
            res.useSend(a);
        }
    })
});

router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.createOperator = req.session.userInfo.username;
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.roleAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.roleUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.roleDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/permission/merchant/role';