var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu004'),function(req, res, next) {
    res.useRender('admin/version');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.version.add,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.version.data,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.version.update,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/on',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.version.on,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/off',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.version.off,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/version';