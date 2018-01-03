var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu1303'),function(req, res, next) {
    res.useRender('team/org');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.orgAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.orgList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/team/org';