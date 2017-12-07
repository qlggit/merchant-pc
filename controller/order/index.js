var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0801'),function(req, res, next) {
    res.useRender('order/list');
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {

});
exports.router = router;
exports.__path = '/order';