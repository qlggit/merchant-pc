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
            pageNum:page || 1,
            pageSize:100,
        };
        $.get('/merchant/env/data',sendData , function(a){
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
            $tr.append('<td>'+(
                o.fileType === 'img'?('<img src="'+o.filePath +'" class="ico-40 show-big-img" alt="">')
            :('<a class="btn btn-sm btn-primary show-video-btn" index="'+i+'">播放</a>')
            )+'</td>');
            $tr.append('<td>'+( o.fileType === 'video'&&o.link&&'<img src="'+o.link +'" class="ico-40 show-big-img" alt="">'||'')+'</td>');
            $tr.append('<td>'+Dictionary.text('productStatus',o.status)+'</td>');
            $tr.append('<td>'+o.orderNum+'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                // (WY.permissionAuth('')&&o.status !== 'up'?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                // (WY.permissionAuth('')&&o.status === 'up'?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
                // '<a class="btn btn-sm btn-primary delete-btn">删除</a>' +
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
        $window.find('.show-file-content-one').html('').closest('.form-group').hide();
        $window.find('.do-audio-content').html('').closest('.form-group').hide();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        $dataForm[0].reset();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        if(updateData.fileType  === 'img'){
            $window.find('.show-file-content-one').attr('showImg',updateData.filePath ).showFileUpload().closest('.form-group').show();
            $window.find('.do-audio-content').closest('.form-group').hide();
        }else{
            $window.find('.do-audio-content').attr('showImg',updateData.filePath ).doFileUpload({done:doFileUpload}).closest('.form-group').show();
            $window.find('.show-file-content-one').hide();
        }
    });
    $table.on('click', '.show-video-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.showVideo(updateData.filePath);
    });
    function doFileUpload(path){
        WY.captureImage(path , function(path){
            $window.find('[name=link]').val(path);
        });
    }
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此场景?',
            done:function(){
                $.post('/merchant/env/change',{
                    type:type,
                    supplierMusicId:updateData.supplierMusicId
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
            fileType:{
                required:1,
                message:'请选择文件类型'
            },
            filePath :{
                required:1,
                message:'请上传文件'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.supplierFileId   = updateData.supplierFileId  ;
        }else{
        }
        $.post('/merchant/env/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.supplierFileId?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $('[name=fileType]').change(function(){
        if($(this).val() === 'img'){
            $('.do-audio-content').html('').closest('.form-group').hide();
            $('.show-file-content-one').showFileUpload().closest('.form-group').show();
        }else{
            $('.do-audio-content').attr('accept','video/mp4').doFileUpload({done:doFileUpload}).closest('.form-group').show();
            $('.show-file-content-one').html('').closest('.form-group').hide();
        }
    });
    WY.ready('auto-load-dictionary',doSearch);
});