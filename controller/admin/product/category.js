var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu000602'),function(req, res, next) {
    res.useRender('admin/product/category');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.product.categoryAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.product.categoryEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    req.query.pageNum = 1;
    req.query.pageSize = 20;
    useRequest.send(req , res , {
        url:useUrl.product.category,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/product/category';