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
            status:'normal',
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/admin/finance/red/data', sendData , function(a){
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
            $tr.append('<td>'+o.nickname    +'</td>');
            $tr.append('<td>'+o.countGrab     +'</td>');
            $tr.append('<td>'+Dictionary.text('redStatus',o.status)   +'</td>');
            $tr.append('<td>'+o.expireTime    +'</td>');
            $tr.append('<td><div class="btn-group">' +
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
    $table.on('click', '.audit-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'审核当前提现',
            submitText:'通过',
            cancelText:'拒绝',
            done:function(){
                doAudit({
                    withdrawId:updateData.withdrawId,
                    audit:'pass',
                })
            },
            cancel:function(){
                WY.prompt({
                    content:'拒绝原因',
                    done:function(v){
                        doAudit({
                            withdrawId:updateData.withdrawId,
                            audit:'refuse',
                            replyContent:v,
                        })
                    }
                })
            }
        });
        function doAudit(data){
            $.post('/admin/finance/audit',data, function(a){
                useCommon.toast(a.message);
                if(a.code === 0){
                    doSearch(aotoPage);
                }
            })
        }
    });
    WY.ready('auto-load-dictionary',doSearch);
});