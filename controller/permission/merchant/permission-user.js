var express = require('express');
var router = express.Router();

router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0202'),  function(req, res, next) {
    res.useRender('permission/merchant/user');
});

router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.user,
        data:{
            company:req.session.userInfo.company,
            name:req.query.name,
        },
        done:function(a){
            res.send(a);
        }
    })
});

router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.createOperator = req.session.userInfo.username;
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.userAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.userUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    req.body.company = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.userDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
exports.router = router;
exports.__path = '/permission/merchant/user';