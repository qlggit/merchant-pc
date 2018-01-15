var express = require('express');
var router = express.Router();
router.post('/send', function(req, res, next) {
   useRequest.send(req , res , {
     url:useUrl.sms.send,
     data:{
       sendType:req.body.sendType || 'BINDING',
       phone:req.body.phone,
       ip:req.remoteAddress
     },
     method:'POST',
     notBody:1,
     done:function(a){
       res.useSend(a)
     }
   })
});
exports.router = router;
exports.__path = '/sms';
