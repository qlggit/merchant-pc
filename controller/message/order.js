var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0503'),function(req, res, next) {
    res.useRender('message/order');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    res.send({});
});
exports.router = router;
exports.__path = '/message/order';