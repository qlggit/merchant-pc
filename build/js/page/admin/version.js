$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $window = $('.show-info-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    var aotoPage = 1;
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    });
    function doSearch(page){
        var sendData = {
            appChannel:$searchForm.find('[name=appChannel]').val(),
            appStatus:$searchForm.find('[name=appStatus]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/admin/version/data',sendData , function(a){
            allData = a.data;
            setPage(page);
        });
    }
    var $page;
    function setPage(page){
        aotoPage = page;
        showData = allData.list;
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+Dictionary.text('appChannel',o.appType) +'</td>');
            $tr.append('<td>'+o.internalVersion   +'</td>');
            $tr.append('<td>'+o.externalVersion   +'</td>');
            $tr.append('<td>'+Dictionary.text('showStatus',o.isForce )  +'</td>');
            $tr.append('<td>'+(o.updateUrl || '')   +'</td>');
            $tr.append('<td>'+Dictionary.text('checkStatus',o.checkStatus )   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary change-btn" index="'+i+'">禁用</a>')) +
                '</div></td>');
            $table.append($tr);
        });
        if(!$page){
            $table.after($page = $('<div>').addClass('table-page mt-30'));
        }
        $page.dataTablePage({
            page:page,
            allNumber:allData.total,
            allPage:allData.pages,
            done:doSearch
        });
    }
    $('.add-new-btn').click(function(){
        $window.modal();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        $dataForm.find('[name=appType]').change();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.confirm({
            content:'确定'+$(this).text()+'此版本信息？',
            done:function(){
                $.post('/admin/version/off',{
                    id:updateData.appVersionId
                },function(a){
                 useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(aotoPage);
                    }
                })
            }
        })
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        var valid = useValidate.validator({
            appType :{
                required:1,
                message:'请选择平台'
            },
            internalVersion  :{
                required:1,
                isInt:1,
                message:'请输入有效的内部版本号'
            },
            externalVersion  :{
                required:1,
                message:'请输入外部版本号'
            },
            versionDescription :{
                required:1,
                message:'请输入版本描述'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.appVersionId     = updateData.appVersionId    ;
        }else{
        }
        $.post('/admin/version/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData ?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
    $window.find('[name=appType]').change(function(){
        if($(this).val() === 'ios'){
            $window.find('[name=checkStatus]').val('').closest('.form-group').show();
        }else{
            $window.find('[name=checkStatus]').val('PASS').closest('.form-group').hide();
        }
    });
});