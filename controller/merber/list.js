var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1002'), function(req, res, next) {
    res.useRender('member/list');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req  , res , {
        url:useUrl.member.list,
        data:req.query,
        done:function(a){
            res.useSend(a)
        }
    })
});
exports.router = router;
exports.__path = '/member/list';