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
            $tr.append('<td>'+Dictionary.text('appChannel',o.appChannel) +'</td>');
            $tr.append('<td>'+o.innerVersion   +'</td>');
            $tr.append('<td>'+o.outerVersion   +'</td>');
            $tr.append('<td>'+Dictionary.text('appStatus',o.appStatus )   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
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
        $window.find('.show-file-content').attr('showImg',updateData.musicPic ).showFileUpload();
        $window.find('.do-audio-content').attr('showImg',updateData.filePath ).doFileUpload();
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        var valid = useValidate.validator({
            appChannel :{
                required:1,
                message:'请选择平台'
            },
            innerVersion  :{
                required:1,
                message:'请输入内部版本号'
            },
            outerVersion  :{
                required:1,
                message:'请输入外部版本号'
            },
            appStatus :{
                required:1,
                message:'请输入外部版本号'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.supplierId    = updateData.supplierId   ;
        }else{
            data.headFile = ' ';
            data.status  = 'normal';
            data.supplierStar   = 3;
        }
        $.post('/admin/merchant/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.supplierId ?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    var searchTimer;
    $('.to-search-city').bind('input',function(){
        clearTimeout(searchTimer);
        var value = $(this).val().trim();
        var $cityCode = $('[name=cityCode]');
        $cityCode.html('');
        searchTimer = setTimeout(function(){
            $.get('/city/search',{
                value:value,
            },function(a){
                a.result.forEach(function(c){
                    $cityCode.append('<option value="'+c.areaCode+'">'+c.name+'</option>');
                });
                $cityCode.change();
            });
        });

    });
    WY.ready('auto-load-dictionary',doSearch);
});