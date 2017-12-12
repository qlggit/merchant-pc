var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0402'),function(req, res, next) {
    res.useRender('merchant/music');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.musicAdd,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.musicList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.merchant.musicEdit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/change',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant[req.body.type === 'up'?'musicUp':'musicDown'],
        data:{
            supplierMusicId:req.body.supplierMusicId
        },
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/merchant/music';