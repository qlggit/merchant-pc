var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.product.list,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/product/list';