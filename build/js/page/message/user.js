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
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/message/user/data', sendData , function(a){
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
            $tr.append('<td>'+o.username   +'</td>');
            $tr.append('<td>'+o.userPhone    +'</td>');
            $tr.append('<td><a class="btn btn-sm show-btn" index="'+i+'">查看</a></td>');
            $tr.append('<td>'+useCommon.parseDate(o.rowAddTime )     +'</td>');
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
    $table.on('click', '.show-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.alert({
            title:'评论内容',
            content:updateData.content,
        })
    });
    WY.ready('auto-load-dictionary',doSearch);
});