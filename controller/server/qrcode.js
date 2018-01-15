var express = require('express');
var router = express.Router();
router.get('/login/:loginId',useValidate.wechatLogin, function(req, res, next) {
    res.render('qrcode/login',{
        hostname:useConfig.get('hostname'),
        __CSRF:req.session.__CSRF,
        loginId:req.params.loginId,
        uid:req.session.unionid,
        NODE_ENV:process.env.NODE_ENV || ''
    });
});
router.get('/operator/:_id/:userId' , useValidate.wechatLogin, function(req, res, next) {
    useData.getUserInfo(req , res , {
        uid:req.session.unionid,
    },function(userInfo){
        userInfo = userInfo.data;
        if(userInfo){
            if(userInfo.company){
                res.render('qrcode/operator',{
                    hostname:useConfig.get('hostname'),
                    hasCompany:1,
                    __CSRF:req.session.__CSRF,
                    companyName:userInfo.companyName,
                    uid:req.session.unionid,
                    env:process.env.NODE_ENV || ''
                });
                return
            }
        }
        useData.getUserInfo(req , res , {
            _id:req.params._id,
        } , function(d){
            var merchantUserInfo = d.data;
            req.session.merchantId = merchantUserInfo.company;
            req.session.parentUserId = merchantUserInfo.userId;
            useData.getMerchantInfo(req , res , merchantUserInfo.company , function(merchantInfo){
                merchantInfo = merchantInfo.data;
                req.session.merchantInfo = merchantInfo;
                res.render('qrcode/operator',{
                    hasCompany:0,
                    hostname:useConfig.get('hostname'),
                    __CSRF:req.session.__CSRF,
                    merchantInfo:merchantInfo,
                    uid:req.session.unionid,
                    env:process.env.NODE_ENV || ''
                });
            });
        })
    });

});
router.post('/operator' , useValidate.wechatLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.login.merchantLogin,
        data:{
            uid:req.session.unionid,
            openId:req.session.openId,
            nickname:req.session.nickname,
            headImg:req.session.headimgurl,
            gender:req.session.gender,
            deviceType:'mp',
            sType :'weixin',
            stype :'weixin',
            supplierId:req.session.merchantInfo.supplierId
        },
        method:'POST',
        done:function(a){
            if(a.code === 0){
                var mobile = a.data && a.data.mobile;
                useRequest.send(req , res , {
                    url:useUrl.permissionMerchant.qrcodeAdd,
                    data:{
                        uid:req.session.unionid,
                        username:mobile || req.session.unionid,
                        nickname:req.session.nickname,
                        companyName:req.session.merchantInfo.supplierName,
                        company:req.session.merchantInfo.supplierId,
                        createOperator:req.session.parentUserId,
                    },
                    method:'POST',
                    done:function(a){
                        res.useSend(a);
                    }
                });
            }else res.useSend(a);
        }
    });
});
exports.router = router;
exports.__path = '/server/qrcode';