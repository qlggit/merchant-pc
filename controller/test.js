var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();
router.get('/get',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:req.query.url,
        done:function(d){
            res.send(d);
        }
    })
});
exports.router = router;
exports.__path = '/';
exports.router = router;
exports.__path = '/test';