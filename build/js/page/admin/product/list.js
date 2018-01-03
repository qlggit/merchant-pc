$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $window = $('.product-info-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    var aotoPage = 1;
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    })
    function doSearch(page){
        var sendData = {
            supplierId:$searchForm.find('[name=supplierId]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        sendData.status = $searchForm.find('[name=status]').val();
        $.get('/admin/product/list/data',sendData , function(a){
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
            $tr.append('<td>'+o.goodsName+'</td>');
            $tr.append('<td>'+o.supplierName+'</td>');
            $tr.append('<td>'+o.goodsTypeName+'</td>');
            $tr.append('<td>'+o.unitPrice/100+'</td>');
            $tr.append('<td>'+o.totalStockNum+'</td>');
            $tr.append('<td>'+o.stockNum+'</td>');
            $tr.append('<td>'+({
                normal:'初始化',
                up:'上架',
                down:'下架',
            })[o.status]+'</td>');
            $tr.append('<td><div class="btn-group">' +
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
        $window.find('.show-file-content').attr('showImg','').showFileUpload();
        $window.find('[name=totalStockNum]').prop('readonly',false);
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        $window.find('[name=totalStockNum]').prop('readonly',true);
        updateData = showData[$(this).attr('index')]
        updateData.unitPrice /= 100;
        $dataForm.__formData(updateData);
        $window.find('.show-file-content').attr('showImg',updateData.headImg).showFileUpload();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此商品?',
            done:function(){
               $.post('/product/change',{
                   type:type,
                   goodsId:updateData.goodsId
               } , function(a){
                   useCommon.toast(a.message);
                   if(a.code === 0){
                       doSearch(aotoPage);
                   }
               })
            }
        })
    });
    $table.on('click', '.num-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.prompt({
            content:'输入要变更的库存',
            done:function(v){
                if(isNaN(v) || (v-0 !== (v | 0))){
                    useCommon.toast('请输入有效的库存数字');
                    return false;
                }
               $.post('/product/num',{
                   stockNum:v,
                   goodsId:updateData.goodsId
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
            totalStockNum:{
                required:1,
                isNumber:0,
                min:0,
                message:'请输入库存'
            },
            unitPrice:{
                required:1,
                isNumber:0,
                min:0,
                message:'请输入单价'
            },
            goodsName:{
                required:1,
                message:'请输入名称'
            },
            headImg:{
                required:1,
                message:'请上传头图'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.goodsId  = updateData.goodsId ;
            delete data.totalStockNum;
        }else{
            data.stockNum = data.totalStockNum;
        }
        data.unitPrice *= 100;
        $.post('/product/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.goodsId?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});