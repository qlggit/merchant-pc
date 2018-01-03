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
            supplierName:$searchForm.find('[name=supplierName]').val(),
            supplierPhone:$searchForm.find('[name=supplierPhone]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/admin/merchant/data',sendData , function(a){
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
            $tr.append('<td>'+o.supplierName  +'</td>');
            $tr.append('<td>'+o.supplierPhone   +'</td>');
            $tr.append('<td>'+Dictionary.text('typeCode',o.typeCode )   +'</td>');
            $tr.append('<td>'+( o.cityName )  +'</td>');
            $tr.append('<td>'+o.supplierAddr   +'</td>');
            $tr.append('<td>' +'</td>');
            $tr.append('<td><div class="btn-group">' +
                //(WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
                (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary" href="'+
                    useCommon.addUrlParam((seatUrl+'/server/admin/seat/create'),{
                        token:sessionJson.merchantUserInfo.tokenModel.token,
                        userId:sessionJson.merchantUserInfo.tokenModel.userId,
                        merchantId:o.supplierId ,
                    })
                    +'" target="_blank">座位管理</a>':'') +
                '<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">删除</a>' +
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
        $window.find('.do-audio-content').attr('showImg','').doFileUpload();
        $dataForm[0].reset();
        updateData = null;
    });
    $table.on('click', '.delete-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认删除此商家?',
            done:function(){
                $.post('/admin/merchant/delete',{
                    supplierId:updateData.supplierId
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(aotoPage);
                    }
                })
            }
        })
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
            supplierName :{
                required:1,
                message:'请输入商户名称'
            },
            supplierPhone  :{
                required:1,
                message:'请输入商户电话'
            },
            typeCode  :{
                required:1,
                message:'请选择商户类型'
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