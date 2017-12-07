var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu0101'),  function(req, res, next) {
    res.useRender('permission/admin/role');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.role,
        data:{},
        done:function(a){
            res.send(a);
        }
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.createOperator = req.session.userInfo.username;
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.roleAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.roleUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.roleDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.send(a);
        }
    })
});
exports.router = router;
exports.__path = '/permission/admin/role';