var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1101'), function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.info,
        data:{
            supplierId:req.session.userInfo.company
        },
        done:function(a){
            res.useRender('withdraw/index',{
                merchantInfo:a.data
            });
        }
    })
});
router.get('/detail',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.withdraw.info,
        data:req.query,
        done:function(a){
            res.useRender('withdraw/info',{
                withdrawInfo:a.data
            });
        }
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.operatorId = req.session.userInfo.userId || '123';
    req.body.supplierId  = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.withdraw.add,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/withdraw';