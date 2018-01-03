var express = require('express');
var router = express.Router();
router.post('/api',function(req , res , next){
    req.pipe(useRequest.request(useUrl.file.upload)).pipe(res);
});
router.get('/down',function(req , res , next){
    req.pipe(useRequest.request(req.query.url)).pipe(res);
});
exports.router = router;
exports.__path = '/file';