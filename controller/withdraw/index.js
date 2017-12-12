var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1101'), function(req, res, next) {
    res.useRender('withdraw/index');
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.operatorId = req.session.userInfo.userId || '123';
    req.body.supplierId  = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.withdraw.add,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/withdraw';