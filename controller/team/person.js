var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu1301'),function(req, res, next) {
    res.useRender('team/person');
});
router.post('/duty',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.personAddDuty,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/task',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.personAddTask,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/amount',useValidate.hasLogin,function(req, res, next) {
    req.body.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.personAmount,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/data',useValidate.hasLogin, function(req, res, next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.team.personList,
        data:req.query,
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/team/person';