var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0102'),  function(req, res, next) {
    res.useRender('permission/admin/user');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.user,
        data:{},
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.createOperator = req.session.userInfo.username;
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.userAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.userUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.userDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/permission/admin/user';