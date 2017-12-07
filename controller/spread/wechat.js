var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0601'),function(req, res, next) {
    res.useRender('spread/wechat');
});
exports.router = router;
exports.__path = '/spread/wechat';