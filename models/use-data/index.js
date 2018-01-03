var cacheData = {};
module.exports = {
    getAdminRole:function(findData,call){

    },
    getAdminMenuList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionAdmin.permissionMenu,
            data:{
                name:req.query.name,
            },
            done:function(a){
                call(a);
            }
        })
    },
    getAdminPermissionList:function(req , res ,call){
        useRequest.send(req , res ,{
            url:useUrl.permissionAdmin.permission,
            data:{
                name:req.query.name,
            },
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
    getUserInfo:function(req , res  , data , call ){
        useRequest.send(req , res , {
            url:useUrl.permissionMerchant.userInfo,
            data:data,
            done:call
        })
    },
    getMerchantInfo:function(req , res  , merchantId , call ){
        useRequest.send(req , res , {
            url:useUrl.merchant.info,
            data:{
                supplierId:merchantId,
            },
            done:call
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
    getAreaData:function(req , res ,call){
        var cache = cacheData.areaData;
        var date = useCommon.parseDate(new Date , 'Ymd');
        if(cache){
            call(cache.data);
            if(cache.date === date){
                return;
            }
        }
        var spec = ['110000','120000','500000','310000'];//直辖市不需要继续查
        useRequest.send(req , res ,{
            url:useUrl.city.patent,
            done:function(data){
                if(data.code === 0){
                    var parentData = data.data;
                    parentData = parentData.filter(function(a){
                        //去除港澳台
                        return ['710000','810000','820000'].indexOf(a.areaCode) === -1
                    });
                    var all = [];
                    var childData = [];
                    parentData.forEach(function(a){
                        if(spec.indexOf(a.areaCode) === -1){
                            all.push(new Promise(function(rev , rej){
                                useRequest.send(req , res , {
                                    url:useUrl.city.child,
                                    data:{
                                        parentCode:a.areaCode,
                                    },
                                    done:function(o){
                                        if(data.code === 0){
                                            childData = childData.concat(o.data);
                                            rev();
                                        }else rej();

                                    }
                                })
                            }));
                        }else{
                            childData.push(a);
                        }
                    });
                    Promise.all(all).then(function(){
                        childData.sort(function(a,b){
                            return a.alphabetical > b.alphabetical?1:-1;
                        });
                        cacheData.areaData = {
                            data:childData,
                            date:date,
                        };
                        call && call(childData);
                    }).catch(function(){
                        call && call([]);
                    })
                }
                else{
                    call && call([]);
                }
            }
        })
    },
    init:function(){
        this.getAreaData({session:{}},{});
    }
};


