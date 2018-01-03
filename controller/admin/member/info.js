var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req  , res , {
        url:useUrl.user.info,
        data:req.query,
        done:function(a){
            res.useRender('admin/member/info', {
                userInfo:a.data
            })
        }
    })
});
exports.router = router;
exports.__path = '/admin/member/info';