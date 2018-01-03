$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $searchForm = $('.search-form');
    var page = 1;
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    })
    function doSearch(page){
        $.get('/admin/member/list/data',{
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
            $tr.append('<td>'+o.nickname+'</td>');
            $tr.append('<td>'+o.userId+'</td>');
            $tr.append('<td>'+Dictionary.text('gender' , o.gender)+'</td>');
            $tr.append('<td>'+o.mobile+'</td>');
            $tr.append('<td>'+(o.balance/100 || 0).toFixed(2)+'</td>');
            $tr.append('<td>'+(o.provincesName || '')+(o.cityName || '')+'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.registerTime,'Y-m-d')+'</td>');
            $tr.append('<td><div class="btn-group">' +
                '<a class="btn btn-sm btn-primary" index="'+i+'">消费详情</a>' +
                '<a class="btn btn-sm btn-primary" target="_blank" href="/admin/member/info?userId='+o.userId+'">个人资料</a>' +
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