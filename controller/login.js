var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('login',{
        NODE_ENV:process.env.NODE_ENV
    });
});
router.post('/qrcode', function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.login.qrcode,
        data:req.body,
        method:'POST',
        done:function(a){
            if(a.code !== 0) return res.useSend(a);
            useData.setPermission(req , res , a.data , function(a){
                res.useSend(a);
            });
        }
    })
});
router.get('/update',useValidate.hasLogin,  function(req, res, next) {
    res.render('login-update',{
        NODE_ENV:process.env.NODE_ENV
    });
});
router.post('/', function(req, res, next) {
    var loginUrl = req.body.username === 'admin'?useUrl.login.login:useUrl.merchant.login;
    useRequest.send(req , res , {
        url:loginUrl,
        data:req.body,
        method:'POST',
        done:function(a){
            if(a.code !== 0) return res.useSend(a);
            useData.setPermission(req , res , a.data , function(a){
                res.send(a);
            });
        }
    })
});
router.post('/update',useValidate.hasLogin, function(req, res, next) {
    var loginUrl = req.body.username === 'admin'?useUrl.login.update:useUrl.merchant.update;
    useRequest.send(req , res , {
        url:loginUrl,
        data:req.body,
        method:'POST',
        done:function(a){
            if(a.code === 0){
                req.session.userInfo.status = 1;
            }
             res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/login';