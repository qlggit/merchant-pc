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
    })
    function doSearch(page){
        var sendData = {
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/merchant/team/data',sendData , function(a){
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
            $tr.append('<td>'+o.nickname +'</td>');
            $tr.append('<td><img src="'+o.headImg +'" class="ico-40 show-big-img" alt=""></td>');
            $tr.append('<td>'+o.role  +'</td>');
            $tr.append('<td><a class="btn btn-sm show-btn" index="'+i+'">查看</a></td>');
            $tr.append('<td>'+o.orderNum  +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                // '<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">删除</a>' +
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
        $window.find('.show-file-content').attr('showImg','').showFileUpload();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        $window.find('.show-file-content').attr('showImg',updateData.headImg ).showFileUpload();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此活动?',
            done:function(){
                $.post('/merchant/team/change',{
                    type:type,
                    actId:updateData.actId
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(aotoPage);
                    }
                })
            }
        })
    });
    $table.on('click', '.delete-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认删除此活动?',
            done:function(){
                $.post('/merchant/team/delete',{
                    actId:updateData.actId
                } , function(a){
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
            nickname:{
                required:1,
                message:'请输入昵称'
            },
            role :{
                required:1,
                message:'请输入角色'
            },
            headImg :{
                required:1,
                message:'请上传显示图片'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.teamId   = updateData.teamId  ;
        }else{
        }
        $.post('/merchant/team/' + (updateData?'edit':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $table.on('click', '.show-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.alert({
            title:'个人简介',
            content:updateData.introduction,
        })
    });
    WY.ready('auto-load-dictionary',doSearch);
});