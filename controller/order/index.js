var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0802'),function(req, res, next) {
    res.useRender('order/list');
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.order.list,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.get('/product',useValidate.hasLogin, function(req, res, next) {
    var all = [];
    all.push(new Promise(function(rev){
        useRequest.send(req , res , {
            url:useUrl.order.infoBySeat,
            data:req.query,
            done:function(data){
                rev(data.data && data.data.list || data.data);
            }
        });
    }));
    all.push(new Promise(function(rev){
        useRequest.send(req , res , {
            url:useUrl.order.giveList,
            data:req.query,
            done:function(data){
                rev(data.data && data.data.list || data.data);
            }
        });
    }));
    Promise.all(all).then(function(v){
        res.sendSuccess([].concat(v[0],v[1]));
    });
});
exports.router = router;
exports.__path = '/order';