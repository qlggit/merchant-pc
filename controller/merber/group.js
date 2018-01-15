var express = require('express');
var router = express.Router();
router.get('/',useValidate.hasLogin,usePermission.authMenu('menu1001'), function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.merchant.info,
        data:{
            supplierId:req.session.userInfo.company
        },
        done:function(a){
            useRequest.send(req , res , {
                url:useUrl.member.addChatGroup,
                data:{
                    chatGroupId:a.data.chatGroupId,
                },
                method:"post",
                notBody:1,
                done:function(b){
                    res.useRender('member/group',{
                        resJson:{
                            rongcloudAppKey:'bmdehs6pb10es',
                            merchantInfo:a.data,
                        }
                    });
                }
            })
        }
    })
});
router.post('/delMember',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.member.delChatMember,
        data:{
            delUserId :req.body.userId,
        },
        method:"post",
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.post('/quit',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.member.quitGroup,
        data:{
            groupsId :req.body.groupsId,
        },
        method:"post",
        notBody:1,
        done:function(a){
            res.useSend(a);
        }
    })
});
router.get('/user',useValidate.hasLogin, function(req, res, next) {
    useRequest.send(req , res , {
        url:useUrl.member.groupUser,
        data:{
            groupsId :req.query.groupsId,
            pageNum:req.query.pageNum,
            pageSize:req.query.pageSize,
        },
        done:function(a){
            res.useSend(a);
        }
    })
});
exports.router = router;
exports.__path = '/member/group';