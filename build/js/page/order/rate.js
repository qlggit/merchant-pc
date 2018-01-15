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
            starNum:$searchForm.find('[name=starNum]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/order/rate/data',sendData , function(a){
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
            $tr.append('<td>'+o.nickName   +'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.rowAddTime)    +'</td>');
            $tr.append('<td><a class="btn btn-sm show-btn" index="'+i+'">查看</a></td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuth('')&&o.showMe  === 'y'? ( '<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">隐藏</a>'):'') +
                '<a class="btn btn-sm btn-primary delete-btn" index="'+i+'">删除</a>' +
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
    $table.on('click', '.delete-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.confirm({
            content:'确认隐藏此评论?',
            done:function(){
                $.post('/order/rate/delete',{
                    commentId:updateData.commentId
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(aotoPage);
                    }
                })
            }
        })
    });
    $table.on('click', '.show-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.alert({
            title:'评论内容',
            content:updateData.content,
        })
    });
    WY.ready('auto-load-dictionary',doSearch);
});