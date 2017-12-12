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
            status:$searchForm.find('[namae=status]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/withdraw/list/data', sendData , function(a){
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
            $tr.append('<td>'+o.je / 100  +'</td>');
            $tr.append('<td>'+o.operatorName    +'</td>');
            $tr.append('<td>'+o.supplierName     +'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.rowAddTime )     +'</td>');
            $tr.append('<td>'+o.yhkLxMc    +'</td>');
            $tr.append('<td>'+Dictionary.text('withdrawStatus',o.status)   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary" index="'+i+'">详情</a>')) +
                '</div></td>');
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
        var valid = useValidate.validator({
            hm:{
                required:1,
                message:'请输入开户名'
            },
            khhdz :{
                required:1,
                message:'请输入开户行地址'
            },
            yhkh :{
                required:1,
                message:'请输入银行卡号'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.yhkId    = updateData.yhkId   ;
        }else{
        }
        $.post('/withdraw/bank/' + (updateData?'edit':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(data.yhkId?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});