function Permission(){

}
Permission.auth = function(permissionCode){
    return function(req , res , next){
        req.__permissionCode = permissionCode;
        if(req.session.userInfo.type > 49)return next();
        var permissionList = req.session.permissionData.permissionList;
        if(permissionList.every(function(a){
            if(a.code === permissionCode){
                next();
                return false;
            }
            return true
            })){
            return res.sendErrorMessage('HTTP_CODE_406','');
        }
    }
};
Permission.authMenu = function(menuCode){
    return function(req , res , next){
        req.__menuCode = menuCode;
        if(req.session.userInfo.type > 49)return next();
        var menuList = req.session.permissionData.menuList;
        if(menuList.every(function(a){
                if(a.code === menuCode){
                    next();
                    return false;
                }
                return true
            })){
            return res.sendErrorMessage('HTTP_CODE_406','');
        }
    }
};
Permission.init = function(){
    Permission.menuList = {
        menu0101:'/permission',
        menu0102:'/permission/menu',

        menu0201:'/permission/merchant/role',
        menu0202:'/permission/merchant/user',

        menu0401:'/merchant',
        menu0402:'/merchant/music',
        menu0403:'/merchant/activity',
        menu0404:'/merchant/team',

        menu0501:'/message/get',
        menu0502:'/message/send',
        menu0503:'/message/order',

        menu0601:'/spread/wechat',
        menu0602:'/spread/bd',

        menu07:'/product',

        menu0801:'/order',
        menu0802:'/order/rate',
        menu0803:'/order/seat',

        menu09:useConfig.get('seatUrl')+'/server/merchant/seat/index',

        menu1001:'/member/group',
        menu1002:'/member/list',
        menu1003:'/member/spread',

        menu1101:'/withdraw',
        menu1102:'/withdraw/list',
        menu1103:'/withdraw/bank',


    };
};
module.exports = Permission;