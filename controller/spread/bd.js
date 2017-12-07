var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0602'),function(req, res, next) {
    res.useRender('spread/bd');
});
exports.router = router;
exports.__path = '/spread/bd';