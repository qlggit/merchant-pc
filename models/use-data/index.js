global.bankListData = [];
var allData = {};
module.exports = {
    getAdminRole:function(findData,call){

    },
    getAdminMenuList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionAdmin.permissionMenu,
            done:function(a){
                call(a);
            }
        })
    },
    getAdminPermissionList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionAdmin.permission,
            done:function(a){
                call(a);
            }
        })
    },
    getMerchantMenuList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionMerchant.permissionMenu,
            done:function(a){
                call(a);
            }
        })
    },
    getMerchantPermissionList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionMerchant.permission,
            done:function(a){
                call(a);
            }
        })
    },
    getUserInfo:function(req , res  , username , call ){
        useRequest.send(req , res , {
            url:useUrl.permissionMerchant.userInfo,
            data:{
                username:username,
            },
            done:call
        })
    },
    getMerchantInfo:function(req , res  , channel , call ){
        call({
            id:channel||'1',
            code:'1',
            name:'酒吧名字',
        })
    },
    setPermission:function( req , res , userInfo ,call){
        req.session.userInfo = userInfo;
        req.session.username = userInfo.username;
        var permissionUrl = userInfo.username === 'admin'?useUrl.login.permission:useUrl.merchant.permission;
        useRequest.send(req , res , {
            url:permissionUrl,
            data:{
                username:userInfo.username,
                company:userInfo.company,
            },
            done:function(a){
                if(a.code !== 0) return call(a);
                req.session.permissionData = a.data;
                if(a.data){
                    if(a.data.status === 0){
                        a.redirectUrl = '/login/update';
                    }else{
                        var callback = req.session.callback || '';
                        if(callback === '/login/update'){
                            callback = '/';
                        }
                        a.redirectUrl = callback;
                    }
                }
                call(a);
            }
        });
    },
    init:function(){
    }
};


