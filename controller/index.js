var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, function(req, res, next) {
   res.useRender('index');
});
router.get('/logout', function(req, res, next) {
   req.session.userInfo = null;
   res.redirect('/');
});
exports.router = router;
exports.__path = '/';