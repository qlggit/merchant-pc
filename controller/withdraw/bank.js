var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1103'), function(req, res, next) {
    res.useRender('withdraw/bank');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    res.send({
        data:{list:[]}
    });
});
exports.router = router;
exports.__path = '/withdraw/bank';