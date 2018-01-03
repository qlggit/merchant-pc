$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
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
            $tr.append('<td>'+o.amount / 100  +'</td>');
            $tr.append('<td>'+o.applyUserId    +'</td>');
            $tr.append('<td>'+o.supplierName     +'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.rowAddTime )     +'</td>');
            $tr.append('<td>'+o.bankName    +'</td>');
            $tr.append('<td>'+Dictionary.text('withdrawStatus',o.status)   +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary" target="_blank" href="/withdraw/detail?withdrawId='+o.withdrawId+'">详情</a>')) +
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
    WY.ready('auto-load-dictionary',doSearch);
});