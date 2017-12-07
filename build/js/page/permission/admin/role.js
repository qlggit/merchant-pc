$(function(){
    var roleData,permissionData,menuData;
    var $table = $('.show-role-table');
    if(!$table[0])return false;
    var $window = $('.permission-role-window');
    var $permissionRelationWindow = $('.permission-info-window');
    var $menuRelationWindow = $('.permission-menu-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    $searchForm.submit(function(){
        doSearch();
        return false;
    });
    function doSearch(){
        $.get('/permission/admin/role/data' ,$searchForm.serialize(), function(a){
            roleData = a.data;
            setPage();
        });
    }
    setPermissionList();
    var permissionInfoObject;
    var permissionMenuObject;
    function setPermissionList(){
        Promise.all([
            new Promise(function(rev , rej){
                $.get('/permission/admin/data' , function(a){
                    permissionData = a.data;
                    rev();
                });
            }),
            new Promise(function(rev , rej){
                $.get('/permission/admin/menu/data' , function(a){
                    menuData = a.data;
                    rev();
                });
            }),
        ]).then(function(){
            permissionMenuObject = $('.show-permission-menu-content').showPermissionMenu(menuData);
        });
    }
    var showData;
    var $page;
    function setPage(page){
        page -= 1;
        page = page || 0;
        showData = roleData.slice(page * usePageSize , (page + 1) * usePageSize);
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+o.name+'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.updateTime)+'</td>');
            $tr.append('<td><div class="btn-group">' +
                '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>' +
                '<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">删除</a>' +
                '<a class="btn btn-sm btn-primary update-menu-btn" index="'+i+'">菜单</a>' +
                '<a class="btn btn-sm btn-primary update-relation-btn" index="'+i+'">权限</a>' +
                '</div></td>');
            $table.append($tr);
        });
        if(!$page){
            $table.after($page = $('<div>').addClass('table-page mt-30'));
        }
        $page.dataTablePage({
            page:page + 1,
            allNumber:roleData.length,
            allPage:Math.ceil(roleData.length / usePageSize),
            done:setPage
        });
    }
    $('.add-group-btn').click(function(){
        $window.modal();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        $dataForm.__formData(updateData = showData[$(this).attr('index')]);
    });
    $table.on('click', '.delete-btn' , function(){
    });
    $table.on('click', '.update-relation-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var menuCode = updateData.menuCode;
        if(typeof menuCode == 'string')menuCode = menuCode.split(',');
        permissionInfoObject = $('.show-permission-info-content').showPermissionMenu(menuData.filter(function(a){
            return menuCode.indexOf(a.code) > -1;
        }) , permissionData);
        permissionInfoObject.reset();
        permissionInfoObject.setChecked(updateData.permissionCode || []);
        $permissionRelationWindow.modal();
    });
    $table.on('click', '.update-menu-btn' , function(){
        updateData = showData[$(this).attr('index')];
        permissionMenuObject.reset();
        permissionMenuObject.setMenu(updateData.menuCode || []);
        $menuRelationWindow.modal();
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        if(updateData)data._id = updateData._id;
        $.post('/permission/admin/role/' + (updateData?'update':'add') , data , function(a){
            if(a.code ==0){
                $window.modal('hide');
                doSearch();
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $permissionRelationWindow.find('.this-submit-btn').click(function(){
        updateData.permissionCode = permissionInfoObject.getChecked().join();
        $.post('/permission/admin/role/update' , updateData , function(a){
            if(a.code ==0){
                $permissionRelationWindow.modal('hide');
            }else{
                useCommon.toast(a.message);
            }
        })
    });
    $menuRelationWindow.find('.this-submit-btn').click(function(){
        updateData.menuCode = permissionMenuObject.getMenu().join();
        $.post('/permission/admin/role/update' , updateData , function(a){
            if(a.code ==0){
                $menuRelationWindow.modal('hide');
            }else{
                useCommon.toast(a.message);
            }
        })
    });
    doSearch();
});