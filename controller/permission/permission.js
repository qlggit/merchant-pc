var express = require('express');
var router = express.Router();

router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0101'),function(req, res, next) {
    res.useRender('permission/list');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useData.getAdminPermissionList(req , res , function(a){
        res.useSend(a);
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});

router.get('/menu', useValidate.hasLogin,usePermission.authMenu('menu0102'),function(req, res, next) {
    res.useRender('permission/menu');
});

router.get('/menu/data',useValidate.hasLogin, function(req, res, next) {
    useData.getAdminMenuList(req , res , function(a){
        res.useSend(a);
    })
});
router.post('/menu/add',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionMenuAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/menu/update',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionMenuUpdate,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/menu/delete',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionAdmin.permissionMenuDelete,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});

exports.router = router;

exports.__path = '/permission';