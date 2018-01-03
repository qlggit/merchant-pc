var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu001'),function(req, res, next) {
    res.useRender('admin/merchant/list');
});
router.post('/add',useValidate.hasLogin,function(req, res, next) {
    //添加商户
    useRequest.send(req , res , {
        url:useUrl.merchant.add,
        data:req.body,
        method:'POST',
        done:function(a){
            if(a.code !== 0)return res.useSend(a);
            var merchantId = a.data.supplierId;
            //添加管理员
            useRequest.send(req , res , {
                url:useUrl.permissionMerchant.merchantAdminAdd,
                data:{
                    username  :req.body.supplierPhone,
                    merchantName  :req.body.supplierName,
                    merchantId  :merchantId,
                    userId  :merchantId,
                    uid  :a.data.uuid ,
                },
                method:'POST',
                done:function(a){
                    res.useSend(a);
                }
            })
        }
    })
});
router.get('/data',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.list,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/delete',useValidate.hasLogin,function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.delete,
        data:req.body,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/admin/merchant';