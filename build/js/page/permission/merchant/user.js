$(function(){
    var userData,permissionData,menuData;
    var $table = $('.show-user-table');
    if(!$table[0])return false;
    var $window = $('.permission-user-window');
    var $userRoleWindow = $('.permission-user-role-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    $searchForm.submit(function(){
        doSearch();
        return false;
    });
    function doSearch(){
        $.get('/permission/merchant/user/data',$searchForm.serialize() , function(a){
            userData = a.data || [];
            setPage();
        });
    }
    setPermissionList();
    var permissionRoleObject;
    function setPermissionList(){
        Promise.all([
            new Promise(function(rev , rej){
                $.get('/permission/merchant/role/data' , function(a){
                    menuData = a.data;
                    rev();
                });
            }),
        ]).then(function(){
            permissionRoleObject = $('.show-permission-role-content').showPermissionMenu(menuData);
        });
    }
    var showData;
    var $page;
    function setPage(page){
        page -= 1;
        page = page || 0;
        showData = userData.slice(page * usePageSize , (page + 1) * usePageSize);
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+o.username+'</td>');
            $tr.append('<td>'+o.nickname+'</td>');
            $tr.append('<td>'+(o.uid||'')+'</td>');
            $tr.append('<td>'+({99:'超级管理员',50:'业务管理员',1:'操作员'})[o.type]+'</td>');
            $tr.append('<td>'+({0:'初始化密码',1:'正常',2:'停用'})[o.status]+'</td>');
            $tr.append('<td><div class="btn-group">' +
                (o.type == 99?'': '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>'
                    +'<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">删除</a>'
                    +(o.type == 50?'':'<a class="btn btn-sm btn-primary update-role-btn" index="'+i+'">角色</a>')) +
                '</div></td>');
            $table.append($tr);
        });
        if(!$page){
            $table.after($page = $('<div>').addClass('table-page mt-30'));
        }
        $page.dataTablePage({
            page:page + 1,
            allNumber:userData.length,
            allPage:Math.ceil(userData.length / usePageSize),
            done:setPage
        });
    }
    $('.add-user-btn').click(function(){
        $window.modal();
        $dataForm[0].reset();
        $window.find('[name=username]').prop('readonly' , false);
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        $window.find('[name=username]').prop('readonly' , true);
        $dataForm.__formData(updateData = showData[$(this).attr('index')]);
    });
    $table.on('click', '.delete-btn' , function(){
    });
    $table.on('click', '.update-role-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var roleId = updateData.roleId;
        if(typeof roleId === 'string')roleId = roleId.split(',');
        permissionRoleObject.reset();
        permissionRoleObject.setRole(roleId || []);
        $userRoleWindow.modal();
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        if(updateData)data._id = updateData._id;
        $.post('/permission/merchant/user/' + (updateData?'update':'add') , data , function(a){
            if(a.code ==0){
                $window.modal('hide');
                doSearch();
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $userRoleWindow.find('.this-submit-btn').click(function(){
        updateData.roleId = permissionRoleObject.getRole().join();
        $.post('/permission/merchant/user/update' , updateData , function(a){
            if(a.code ==0){
                $userRoleWindow.modal('hide');
            }else{
                useCommon.toast(a.message);
            }
        })
    });
    doSearch();
    //扫码添加操作员
    var qrcodeWindow = $('.permission-user-qrcode-window');
    var qrcodeContent = qrcodeWindow.find('.modal-body');
    var qrcodeCanvas,wsSocket;
    $('.add-qrcode-user-btn').click(function(){
        qrcodeWindow.modal();
        if(!qrcodeCanvas){
            qrcodeCanvas = new qrcodeLogin({
                content:qrcodeContent[0],
                env:NODE_ENV,
                channel:merchant_channel,
                width:300,
                height:300,
            })
        }
        if(!wsSocket){
            wsSocket = new wsLogin(wsData);
        }
    });
    var wsData = {
        env:NODE_ENV
    };
    wsData.onopen= function(ws){
        ws.send(JSON.stringify({
            type:'qrcodeAdd',
            channel:merchant_channel,
            itemType:'open'
        }));
        qrcodeCanvas.putCanvas(qrcodeCanvas.getUrl('/server/qrcode/operator/'+sessionJson.userInfo._id + '/' + sessionJson.merchantUserInfo.userId),'请扫码二维码成为操作员');
    };
    wsData.onmessage= function(data , ws){
        if(data.code === 0){
            if(data.type === 'qrcodeAdd' && data.itemType === 'login'){
                doSearch();
            }
        }
    };
    wsData.onerror = function(e){
        console.log(e);
    };
    wsData.onclose = function(e){

    };
    //wsLogin(wsData);
});