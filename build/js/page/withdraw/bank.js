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
        $.get('/withdraw/bank/list', sendData , function(a){
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
            $tr.append('<td>'+o.accountName  +'</td>');
            $tr.append('<td>'+ o.bankName +'</td>');
            $tr.append('<td>'+o.openAddress   +'</td>');
            $tr.append('<td>'+o.accountPermit   +'</td>');
            $tr.append('<td>'+o.bankCard   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                 '<a class="btn btn-sm btn-primary delete-btn">删除</a>' +
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
    });
    $table.on('click', '.delete-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认删除此银行卡?',
            done:function(){
                $.post('/withdraw/bank/delete',{
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
        var checkData = {
            accountName :{
                required:1,
                message:'请输入开户名'
            },
            bankCode   :{
                required:1,
                message:'请选择开户银行'
            },
            openAddress  :{
                required:1,
                message:'请输入开户行地址'
            },
            bankCard  :{
                required:1,
                message:'请输入银行卡号'
            },
            sendCode  :{
                required:1,
                message:'请输入验证码'
            },
        }
        if(updateData)delete checkData.sendCode;
        else data.phone = resJson.merchantInfo.supplierPhone;
        var valid = useValidate.validator(checkData,data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }

        if(updateData){
            data.supplierBankId    = updateData.supplierBankId   ;
        }else{
        }
        $.post('/withdraw/bank/' + (updateData?'edit':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});