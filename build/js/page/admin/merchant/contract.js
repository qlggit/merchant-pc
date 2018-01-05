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
        $.get('/admin/merchant/contract/data',sendData , function(a){
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
            $tr.append('<td>'+o.partyB  +'</td>');
            $tr.append('<td>'+o.chargeRatio   +'</td>');
            $tr.append('<td>'+o.contractNumber   +'</td>');
            $tr.append('<td>'+( o.deadline )  +'</td>');
            $tr.append('<td>'+o.startDate   +'</td>');
            $tr.append('<td>'+o.endDate   +'</td>');
            $tr.append('<td><div class="btn-group">' +
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
            partyB :{
                required:1,
                message:'请输入商户名称'
            },
            chargeRatio  :{
                required:1,
                message:'请输入服务费比例'
            },
            contractNumber  :{
                required:1,
                message:'请输入合同编号'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.contractId     = updateData.contractId    ;
        }else{
        }
        $.post('/admin/merchant/contract/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.contractId  ?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});