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
        $.get('/wine/list/data',{
            pageNum:page || 1,
            pageSize:10,
            isDone:'init',
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
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+o.nickName +'</td>');
            $tr.append('<td>'+o.total  +'</td>');
            $tr.append('<td>'+Dictionary.text('operaType',o.operaType )+'</td>');
            $tr.append('<td>'+o.batchNo   +'</td>');
            $tr.append('<td>'+o.applyTime   +'</td>');
            $tr.append('<td>'+o.expireTime    +'</td>');
            $tr.append('<td><div class="btn-group">' +
                //'<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>' +
                '<a class="btn btn-sm btn-primary wine-btn"  index="'+i+'">酒水</a>' +
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
    WY.ready('auto-load-dictionary',doSearch);
    var $window = $('.wine-info-window');
    $table.on('click','.wine-btn',function(){
        var wineList = showData[$(this).attr('index')].wineLs;
        $window.find('.data-list').remove();
        wineList.forEach(function(a , i){
           $window.find('.table').append('<tr>' +
               '<td>'+(i+1)+'</td>' +
               '<td>'+a.goodsName+'</td>' +
               '<td>'+a.accessQuantity+'</td>' +
               '<td>'+(a.wineStatus === 'open' ? '已开' : '未开')+'</td>' +
               '<td>'+a.serialNo+'</td>' +
               '<td>'+a.dic+'</td>' +
               '</tr>')
        });
        $window.modal();
    });
});