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

        apiLogin:apiUrl + '/api/user/v_1/login',
    },
    permissionAdmin:{
        permission:h5Api + '/server/admin/permission/list',
        permissionAdd:h5Api + '/server/admin/permission/add',
        permissionUpdate:h5Api + '/server/admin/permission/update',
        permissionChange:h5Api + '/server/admin/permission/change',
        permissionDelete:h5Api + '/server/admin/permission/delete',

        permissionMenu:h5Api + '/server/admin/permission/menuList',
        permissionMenuAdd:h5Api + '/server/admin/permission/menuAdd',
        permissionMenuUpdate:h5Api + '/server/admin/permission/menuUpdate',
        permissionMenuChange:h5Api + '/server/admin/permission/menuChange',
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

        merchantAdminAdd : h5Api + '/server/merchant/add',
    },
    token:{
        check:h5Api + '/server/token',
    },
    user:{
        qrcodeAdd:h5Api + '/server/merchant/permission/user/qrcodeAdd',
    },
    merchant:{
        login:h5Api + '/server/merchant/login',
        reset:h5Api + '/server/merchant/login/update',
        permission:h5Api + '/server/merchant/permission/data',

        info:apiUrl + '/mgr/supplier/v_1/info',
        edit:apiUrl + '/mgr/supplier/v_1/edit',
        add:apiUrl + '/mgr/supplier/v_1/add',
        list:apiUrl + '/mgr/supplier/v_1/list',

        musicAdd:apiUrl + '/mgr/supplier/music/v_1/add',
        musicEdit:apiUrl + '/mgr/supplier/music/v_1/edit',
        musicList:apiUrl + '/mgr/supplier/music/v_1/list',
        musicDown:apiUrl + '/mgr/supplier/music/v_1/down',
        musicUp:apiUrl + '/mgr/supplier/music/v_1/up',


        actAdd:apiUrl + '/mgr/supplier/act/v_1/add',
        actDelete:apiUrl + '/mgr/supplier/act/v_1/delete',
        actDown:apiUrl + '/mgr/supplier/act/v_1/down',
        actUp:apiUrl + '/mgr/supplier/act/v_1/up',
        actEdit:apiUrl + '/mgr/supplier/act/v_1/edit',
        actList:apiUrl + '/mgr/supplier/act/v_1/list',


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
        list:apiUrl + '/api/shopping/v_1/list',

        seatList:apiUrl + '/api/seat/v_1/orderList',


        rateList:apiUrl + '/mgr/comment/v_1/list',
        rateDelete:apiUrl + '/mgr/comment/v_1/delete',
    },
    bank:{
        list:apiUrl + '/mgr/finance/yhk/v_1/list',
        add:apiUrl + '/mgr/finance/yhk/v_1/add',
        edit:apiUrl + '/mgr/finance/yhk/v_1/edit',
        delete:apiUrl + '/mgr/finance/yhk/v_1/delete',
    },
    withdraw:{
        add:apiUrl + '/mgr/finance/txgl/v_1/add',
        list:apiUrl + '/mgr/finance/txgl/v_1/list',
        info:apiUrl + '/mgr/finance/txgl/v_1/info',

        stream:apiUrl + '/mgr/finance/lszd/v_1/list',
    },
    city:{
        patent:apiUrl + '/api/area/v_1/list',
        child:apiUrl + '/api/area/v_1/childList',
    },
};