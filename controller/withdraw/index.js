var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1101'), function(req, res, next) {
    res.useRender('withdraw/index');
});
exports.router = router;
exports.__path = '/withdraw';