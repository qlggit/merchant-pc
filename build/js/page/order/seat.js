$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $searchForm = $('.search-form');
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    })
    function doSearch(page){
        $.get('/order/seat/list',{
            pageNum:page || 1,
            pageSize:10,
        } , function(a){
            allData = a.data;
            setPage(page);
        });
    }
    var $page;
    function setPage(page){
        showData = allData.list;
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+o.orderNo+'</td>');
            $tr.append('<td>'+o.nickName+'</td>');
            $tr.append('<td>'+o.mobile+'</td>');
            $tr.append('<td>'+o.seatName+'</td>');
            $tr.append('<td>'+(o.lowCostAmount&&o.lowCostAmount.turnMoney())+'</td>');
            $tr.append('<td>'+(o.deductibleAmount&&o.deductibleAmount.turnMoney())+'</td>');
            $tr.append('<td>'+o.rowAddTime+'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.bookTime  , 'Y-m-d')+'</td>');
            $tr.append('<td>'+(o.payStatus==='ALREADY_PAY'?'已支付':'未支付')+'</td>');
            $tr.append('<td><div class="btn-group">' +
                '<a class="btn btn-sm btn-primary update-btn" target="_blank" href="/order/seat/info?orderNo='+o.orderNo+'">详情</a>' +
               WY.AuthHtml(o.dcStatus === 'wait', '<a class="btn btn-sm btn-primary cost-btn" index="'+i+'" >配送</a>') +
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
    var updateData;
    $table.on('click', '.cost-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.confirm({
            content:'确认开始进行配送此桌的消费品?',
            done:function(){
                $.post('/order/seat/cost',{
                    orderNo:updateData.orderNo
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(1);
                    }
                })
            }
        })
    });
    WY.ready('auto-load-dictionary',doSearch);
});