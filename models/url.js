var apiUrl = useConfig.get('apiUrl') ;
var h5Api = useConfig.get('h5Api') ;
module.exports = {
    file:{
        upload:h5Api + '/file/upload',
    },
    login:{
        login:h5Api + '/server/admin/login',
        update:h5Api + '/server/admin/login/update',
        permission:h5Api + '/server/admin/permission/data',
        qrcode:h5Api + '/server/merchant/login/qrcode',
    },
    permissionAdmin:{
        permission:h5Api + '/server/admin/permission/list',
        permissionAdd:h5Api + '/server/admin/permission/add',
        permissionUpdate:h5Api + '/server/admin/permission/update',
        permissionDelete:h5Api + '/server/admin/permission/delete',

        permissionMenu:h5Api + '/server/admin/permission/menuList',
        permissionMenuAdd:h5Api + '/server/admin/permission/menuAdd',
        permissionMenuUpdate:h5Api + '/server/admin/permission/menuUpdate',
        permissionMenuDelete:h5Api + '/server/admin/permission/menuDelete',

        role:h5Api + '/server/admin/permission/role',
        roleAdd:h5Api + '/server/admin/permission/roleAdd',
        roleUpdate:h5Api + '/server/admin/permission/roleUpdate',
        roleDelete:h5Api + '/server/admin/permission/roleDelete',

        user:h5Api + '/server/admin/permission/user',
        userAdd:h5Api + '/server/admin/permission/userAdd',
        userUpdate:h5Api + '/server/admin/permission/userUpdate',
        userDelete:h5Api + '/server/admin/permission/userDelete',
    },
    permissionMerchant:{
        permission:h5Api + '/server/merchant/permission/list',

        permissionMenu:h5Api + '/server/merchant/permission/menuList',

        role:h5Api + '/server/merchant/permission/role',
        roleAdd:h5Api + '/server/merchant/permission/roleAdd',
        roleUpdate:h5Api + '/server/merchant/permission/roleUpdate',
        roleDelete:h5Api + '/server/merchant/permission/roleDelete',

        user:h5Api + '/server/merchant/permission/user',
        userAdd:h5Api + '/server/merchant/permission/userAdd',
        userUpdate:h5Api + '/server/merchant/permission/userUpdate',
        userDelete:h5Api + '/server/merchant/permission/userDelete',

        userInfo:h5Api + '/server/merchant/permission/userInfo',

        qrcodeAdd:h5Api + '/server/merchant/permission/qrcode/add',
    },
    token:{
        check:h5Api + '/server/token',
    },
    user:{
        qrcodeAdd:h5Api + '/server/merchant/permission/user/qrcodeAdd',
    },
    merchant:{
        login:h5Api + '/server/merchant/login',
        update:h5Api + '/server/merchant/login/update',
        permission:h5Api + '/server/merchant/permission/data',

        info:apiUrl + '/api/supplier/v_1/info',
    },
    product:{
        list:apiUrl + '/mgr/goods/v_1/list',
        add:apiUrl + '/mgr/goods/v_1/add',
        up:apiUrl + '/mgr/goods/v_1/upGoods',
        down:apiUrl + '/mgr/goods/v_1/downGoods',
        edit:apiUrl + '/mgr/goods/v_1/edit',
        num:apiUrl + '/mgr/goods/v_1/editGoodsStock',
        category:apiUrl + '/api/goods/v_1/listGoodsType',
    },
    order:{
        seatList:apiUrl + '/api/seat/v_1/orderList',
    }
};