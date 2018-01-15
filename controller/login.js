var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('login',{
        hostname:useConfig.get('hostname'),
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
router.get('/update', function(req, res, next) {
    res.render('login-update',{
        NODE_ENV:process.env.NODE_ENV
    });
});
router.get('/rongToken', function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.user.rongToken,
        data:req.query,
        done:function(a){
            return res.useSend(a);
        }
    })
});
router.post('/', function(req, res, next) {
    var isAdmin = req.body.username === 'admin';
    var loginUrl = isAdmin?useUrl.login.login:useUrl.merchant.login;
    useRequest.send(req , res , {
        url:loginUrl,
        data:req.body,
        method:'POST',
        done:function(a){
            if(a.code !== 0) return res.useSend(a);
            var loginData = a.data;
            useRequest.send(req , res , {
                url:useUrl.login.apiLogin,
                data:{
                    deviceType:'PC',
                    sType :'sys' ,
                    uid:a.data.uid || (isAdmin?'admin':a.data.username + '-' + a.data.company)
                },
                method:'POST',
                done:function(a){
                    if(a.code !== 0)return res.useSend(a);
                    req.session.merchantUserInfo = a.data;
                    useData.setPermission(req , res , loginData , function(a){
                        res.useSend(a);
                    });
                }
            })
        }
    })
});
router.post('/update', function(req, res, next) {
    req.body.username = req.session.username;
    var loginUrl = req.session.username === 'admin'?useUrl.login.update:useUrl.merchant.reset;
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