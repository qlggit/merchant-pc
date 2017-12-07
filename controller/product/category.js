var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.product.category,
        data:{
        },
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/product/category';