var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin, usePermission.authMenu('menu0801'),function(req, res, next) {
    res.useRender('order/seat');
});
router.get('/info',useValidate.hasLogin, function(req, res, next) {
    var all = [];
    all.push(new Promise(function(rev , rej ){
        useRequest.send(req , res , {
            url:useUrl.order.seatInfo,
            data:{
                orderNo:req.query.orderNo
            },
            done:function(data){
                rev(data.data);
            }
        });
    }));
    all.push(new Promise(function(rev , rej ){
        useRequest.send(req , res , {
            url:useUrl.order.infoBySeat,
            data:{
                seatOrderNo:req.query.orderNo,
                payStatus:'ALREADY_PAY'
            },
            done:function(data){
                rev(data.data);
            }
        });
    }));
    all.push(new Promise(function(rev , rej ){
        useRequest.send(req , res , {
            url:useUrl.order.pingList,
            data:{
                orderNo:req.query.orderNo,
                pageNum:1,
                pageSize:5,
            },
            done:function(data){
                rev(data.data && data.data.list);
            }
        });
    }));
    Promise.all(all).then(function(a){
        res.useRender('order/seat-info',{
            seatOrder:a[0],
            order:a[1],
            ping:a[2],
        });
    });
});
router.get('/list',useValidate.hasLogin, function(req , res , next) {
    req.query.supplierId = req.session.userInfo.company;
    useRequest.send(req , res , {
        url:useUrl.order.seatList,
        data:req.query,
        done:function(data){
            res.useSend(data);
        }
    });
});
router.post('/cost',useValidate.hasLogin, function(req , res , next) {
    useRequest.send(req , res , {
        url:useUrl.order.seatCost,
        data:req.body,
        method:'POST',
        notBody:1,
        done:function(data){
            res.useSend(data);
        }
    });
});
exports.router = router;
exports.__path = '/order/seat';