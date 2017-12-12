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
            status:$searchForm.find('[name=status]').val(),
            musicName:$searchForm.find('[name=musicName]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/merchant/activity/data',sendData , function(a){
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
            $tr.append('<td>'+o.actName +'</td>');
            $tr.append('<td>'+o.actDate  +'</td>');
            $tr.append('<td><a href="'+o.link+'" target="_blank">链接</a></td>');
            $tr.append('<td><img src="'+o.faceFileId +'" class="ico-40" alt=""></td>');
            $tr.append('<td>'+({
                normal:'初始化',
                up:'上架',
                down:'下架',
            })[o.status]+'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                (WY.permissionAuth('')&&o.status !== 'up'?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                (WY.permissionAuth('')&&o.status === 'up'?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
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
        $window.find('.show-file-content').attr('showImg',updateData.faceFileId ).showFileUpload();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此活动?',
            done:function(){
                $.post('/merchant/activity/change',{
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
                $.post('/merchant/activity/delete',{
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
            actName:{
                required:1,
                message:'请输入活动名称'
            },
            actDate :{
                required:1,
                message:'请输入活动时间'
            },
            faceFileId :{
                required:1,
                message:'请上传音乐图片'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.actId   = updateData.actId  ;
        }else{
        }
        $.post('/merchant/activity/' + (updateData?'edit':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.actId?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});