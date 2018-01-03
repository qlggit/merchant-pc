var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu00601'),function(req, res, next) {
    res.useRender('admin/product/list');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.product.list,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/admin/product/list';