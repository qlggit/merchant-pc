var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu00304'), function(req, res, next) {
    res.useRender('admin/finance/red');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.withdraw.redPacket,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/finance/red';