var express = require('express');
var router = express.Router();

router.get('/data',useValidate.hasLogin, function(req, res, next) {
    useData.getMerchantPermissionList(req , res , function(a){
        res.useSend(a);
    })
});
router.get('/menu/data',useValidate.hasLogin, function(req, res, next) {
    useData.getMerchantMenuList(req , res , function(a){
        res.useSend(a);
    })
});
exports.router = router;
exports.__path = '/permission/merchant';