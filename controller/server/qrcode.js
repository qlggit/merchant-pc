var express = require('express');
var router = express.Router();
router.get('/login/:loginId',useValidate.wechatLogin, function(req, res, next) {
    res.render('qrcode/login',{
        __CSRF:req.session.__CSRF,
        loginId:req.params.loginId,
        uid:req.session.unionid,
        NODE_ENV:process.env.NODE_ENV || ''
    });
});
router.get('/operator/:admin' , useValidate.wechatLogin, function(req, res, next) {
    req.session.parentUserName = req.params.admin;
    useData.getUserInfo(req , res , req.params.admin,function(userInfo){
        userInfo = userInfo.data;
        useData.getMerchantInfo(req , res , userInfo.company , function(merchantInfo){
            req.session.merchantInfo = merchantInfo;
            res.render('qrcode/operator',{
                __CSRF:req.session.__CSRF,
                merchantInfo:merchantInfo,
                uid:req.session.unionid,
                env:process.env.NODE_ENV || ''
            });
        });
    });

});
router.post('/operator' , useValidate.wechatLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.permissionMerchant.qrcodeAdd,
        data:{
            uid:req.session.unionid,
            username:req.session.unionid,
            nickname:req.session.nickname,
            company:req.session.merchantInfo.id,
            createOperator:req.session.parentUserName,
        },
        method:'POST',
        done:function(a){
            res.send(a);
        }
    });
});
router.post('/login' , useValidate.wechatLogin , function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.login.qrcodeLogin,
        data:{
            uid:req.session.unionid,
            username:req.session.unionid,
            nickname:req.session.nickname,
            company:req.session.merchantInfo.id,
            createOperator:req.session.parentUserName,
        },
        method:'POST',
        done:function(a){
            res.send(a);
        }
    });
});
exports.router = router;
exports.__path = '/server/qrcode';