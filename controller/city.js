var express = require('express');
var router = express.Router();
router.get('/data',  function(req, res, next) {
    useData.getAreaData(req , res , function(a){
        res.useSend({
            code:'10000',
            result:a
        });
    })
});
router.get('/search',  function(req, res, next) {
    var value = req.query.value;
    var reg = new RegExp('.*' + value.split('').join('.*') + '.*');
    useData.getAreaData(req , res , function(a){
        res.useSend({
            code:'10000',
            result:a.filter(function(b){
                return reg.test(b.alphabetical) || reg.test(b.alphabeticalFirstAlphabet)  || reg.test(b.name)
            })
        });
    })
});
router.get('/data/flush',  function(req, res, next) {
    useData.getAreaData(req , res , function(a){
        res.sendSuccess(a);
    })
});
exports.router = router;
exports.__path = '/city';