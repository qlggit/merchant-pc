var express = require('express');
var router = express.Router();
router.post('/api',function(req , res , next){
    req.pipe(useRequest.request(useUrl.file.upload)).pipe(res);
});
exports.router = router;
exports.__path = '/file';