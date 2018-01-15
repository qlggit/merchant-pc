var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1103'), function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.info,
        data:{
            supplierId:req.session.userInfo.company
        },
        done:function(a){
            res.useRender('withdraw/bank',{
                resJson:{
                    merchantInfo:a.data
                }
            });
        }
    });
});
router.get('/list',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.list,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/codeList',function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.bank.codeList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/add',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    req.body.yzm = 123456;
    useRequest.send(req , res , {
        url:useUrl.sms.check,
        data:{
            sendType:req.body.sendType || 'PAY_PWD',
            phone:req.body.phone,
            sendCode:req.body.sendCode,
        },
        method:'POST',
        notBody:1,
        done:function(a){
            if(a.code === 0){
                useRequest.send(req , res , {
                    url:useUrl.bank.add,
                    data:req.body,
                    method:'POST',
                    done:function(a){
                        res.useSend(a);
                    }
                })
            }else{
                res.useSend(a);
            }
        }
    })

});
router.post('/edit',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.edit,
        data:req.body,
        method:'POST',
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/delete',useValidate.hasLogin, function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.bank.delete,
        data:req.body,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/withdraw/bank';