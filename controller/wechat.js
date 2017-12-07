var express = require('express');
var router = express.Router();
router.get('/entrance', function(req, res, next) {
    req.session.openId = req.query.openid;
    req.session.nickname = req.query.nickname;
    req.session.unionid = req.query.unionid || req.query.openid || req.session.unionid;
    res.useRedirect(useCommon.addUrlParam(req.session.callback || '/' , {
        uid:req.session.unionid
    }));
});
router.get('/login', function(req, res, next) {
    if(req.session.unionid){
        return res.useRedirect(req.session.callback || '/');
    }
    res.redirect(useConfig.get('wechatLoginUrl'));
});
router.get('/jssdk', function(req, res, next) {
    useRequest.send(req , res , {
        url:useConfig.get('wechatJssdkUrl'),
        data:req.body,
        method:'POST',
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/wechat';
