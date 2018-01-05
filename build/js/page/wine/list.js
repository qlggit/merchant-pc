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
            $tr.append('<td>'+o.orderNo  +'</td>');
            $tr.append('<td>'+o.applyTime   +'</td>');
            $tr.append('<td>'+o.expireTime    +'</td>');
            $tr.append('<td><div class="btn-group">' +
                //'<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>' +
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
    WY.ready('auto-load-dictionary',doSearch);
});