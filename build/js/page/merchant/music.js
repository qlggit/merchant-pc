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
        $.get('/merchant/music/data',sendData , function(a){
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
            $tr.append('<td>'+o.authorName +'</td>');
            $tr.append('<td>'+o.musicName  +'</td>');
            $tr.append('<td><img src="'+o.musicPic +'" class="ico-40 show-big-img" alt=""></td>');
            $tr.append('<td></td>');
            $tr.append('<td>'+({
                normal:'初始化',
                up:'上架',
                down:'下架',
            })[o.status]+'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                (WY.permissionAuth('')&&o.status !== 'up'?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                (WY.permissionAuth('')&&o.status === 'up'?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
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
        $window.find('.show-file-content').html('');
        $window.find('.do-audio-content').html('');
        $window.find('.do-audio-content').attr('showImg','').doFileUpload();
        $window.find('.show-file-content').attr('showImg','').showFileUpload();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        $window.find('.show-file-content').attr('showImg',updateData.musicPic ).showFileUpload();
        $window.find('.do-audio-content').attr('showImg',updateData.filePath ).doFileUpload();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此音乐?',
            done:function(){
                $.post('/merchant/music/change',{
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
            authorName:{
                required:1,
                message:'请输入作者'
            },
            musicName :{
                required:1,
                message:'请输入名称'
            },
            filePath :{
                required:1,
                message:'请上传音乐图片'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.supplierMusicId   = updateData.supplierMusicId  ;
        }else{
        }
        $.post('/merchant/music/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.supplierMusicId?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});