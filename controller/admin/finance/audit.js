var express = require('express');
var router = express.Router();
router.post('/',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.withdraw.audit,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/finance/audit';