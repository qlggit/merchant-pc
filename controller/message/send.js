var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0502'),function(req, res, next) {
    res.useRender('message/send');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    res.useSend({});
});
exports.router = router;
exports.__path = '/message/send';