var express = require('express');
var router = express.Router();
router.get('/index',useValidate.hasLogin, usePermission.authMenu('menu06'),function(req, res, next) {
    res.useRender('spread/index');
});
exports.router = router;
exports.__path = '/spread';