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
        $.get('/admin/product/category/data',sendData , function(a){
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
            $tr.append('<td>'+o.typeName   +'</td>');
            $tr.append('<td><img src="'+o.ico+'" class="ico-40" alt=""></td>');
            $tr.append('<td>'+o.orderNum   +'</td>');
            $tr.append('<td>'+ Dictionary.text('productStatus' , o.status)   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                 // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                 // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
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
        $window.find('.show-file-content').attr('showImg','').showFileUpload();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        $window.find('.show-file-content').attr('showImg',updateData.ico ).showFileUpload();
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        var valid = useValidate.validator({
            typeName  :{
                required:1,
                message:'请输入商品类型名称'
            },
            ico  :{
                required:1,
                message:'请选择类型图标'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.goodsTypeId     = updateData.goodsTypeId    ;
        }else{
        }
        $.post('/admin/product/category/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData ?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});