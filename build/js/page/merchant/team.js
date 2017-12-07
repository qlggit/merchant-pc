$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $searchForm = $('.search-form');
    var page = 1;
    function doSearch(page){
        $.get('/message/get/data',{
            goodsTypeId:$searchForm.find('[name=goodsTypeId]').val(),
            pageNum:page || 1,
            pageSize:1,
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
            $tr.append('<td>'+o.goodsName+'</td>');
            $tr.append('<td>'+o.img+'</td>');
            $tr.append('<td>'+o.goodsTypeName+'</td>');
            $tr.append('<td>'+o.unitPrice+'</td>');
            $tr.append('<td>'+o.unitPrice+'</td>');
            $tr.append('<td>'+o.unitPrice+'</td>');
            $tr.append('<td><div class="btn-group">' +
                '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>' +
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