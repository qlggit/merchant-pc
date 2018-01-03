var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0404'),function(req, res, next) {
    res.useRender('merchant/team');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    req.body.status = 'normal';
    useRequest.send(req , res , {
        url:useUrl.merchant.teamAdd,
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
        url:useUrl.merchant.teamList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/edit',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.teamEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/merchant/team';