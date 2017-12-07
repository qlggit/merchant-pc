var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1001'), function(req, res, next) {
    res.useRender('member/group');
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    res.send({});
});
exports.router = router;
exports.__path = '/member/group';