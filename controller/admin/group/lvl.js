var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu00502'),function(req, res, next) {
    res.useRender('admin/group/lvl');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.userId = req.session.merchantUserInfo.userId;
    useRequest.send(req , res , {
        url:useUrl.group.lvlAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin,function(req, res, next) {
    req.body.userId = req.session.merchantUserInfo.userId;
    useRequest.send(req , res , {
        url:useUrl.group.lvlAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.group.lvlList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    });
});
exports.router = router;
exports.__path = '/admin/group/lvl';