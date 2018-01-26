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
            type:'imp',
            status:'auditing'
        } , function(a){
            allData = a.data;
            setPage(page);
        });
    }
    var $page,autoPage;
    function setPage(page){
        autoPage = page;
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
            $tr.append('<td><div class="btn-group">' +
                //'<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>' +
                WY.authHtml(o.operaType === 'imp'&&o.status === 'auditing','<a class="btn btn-sm btn-primary wine-btn"  index="'+i+'">审核</a>') +
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
    var updateData;
    $table.on('click','.wine-btn',function(){
        var wineList = (updateData = showData[$(this).attr('index')]).wineLs;
        $window.find('.data-list').remove();
        wineList.forEach(function(a , i){
           $window.find('.table').append('<tr class="data-list">' +
               '<td>'+(i+1)+'</td>' +
               '<td>'+a.goodsName+'</td>' +
               '<td>'+a.accessQuantity+'</td>' +
               WY.authHtml(updateData.operaType === 'imp', '<td><input type="checkbox" class="wine-status-input "></td>') +
               '<td><input type="text" '+(updateData.operaType === 'imp'?'':'readonly')+' class="batch-input width-99"></td>'+
               '<td><input type="text" class="dic-input width-99"></td>' +
               '</tr>')
        });
        $window.find('.imp-data-list')[updateData.operaType==='imp'?'show':'hide']();
        $window.modal();
    });
    $window.on('click','.this-submit-btn',function(){
        if(updateData.operaType==='imp')doImp('pass');
        else doExp('pass');
    });
    $window.on('click','.this-cancel-btn',function(){
        if(updateData.operaType==='imp')doImp('refuse');
        else doExp('refuse');
    });
    function doImp(type){
        var accessDay = $window.find('[name=accessDay]').val();
        var sendData = {
            accessDay:accessDay,
            accessId:updateData.accessId,
            audit:type,
        };
        if(type==='pass'){
            if(!accessDay){
                useCommon.toast('请填写存酒天数');
                return false;
            }
            var oldWineList = updateData.wineLs;
            var wineList = [],message;
            $window.find('.wine-status-input').each(function(i , a){
                var $tr = $(this).closest('tr');
                var data = {
                    wineStatus:$(this).prop('checked')?'open':'noopen',
                    dic:$tr.find('.dic-input').val(),
                    serialNo:$tr.find('.batch-input').val(),
                    accessQuantity:oldWineList[i].accessQuantity,
                    accessWineId :oldWineList[i].accessWineId ,
                    goodsId :oldWineList[i].goodsId  ,
                };
                if(data.wineStatus === 'open'){
                    if(!data.serialNo){
                        message = '已开的酒需要添加标签!';
                        return false;
                    }
                }
                wineList.push(data);
            });
            if(message){
                useCommon.toast(message);
                return false;
            }
            sendData.wineList = wineList;
        }
        doSend('imp',sendData)
    }
    function doExp(type){
        var sendData = {
            accessId:updateData.accessId,
            seatId :updateData.seatId ,
            audit:type,
        };
        if(type==='pass'){
            var oldWineList = updateData.wineLs;
            var wineList = [];
            $window.find('.dic-input').each(function(i , a){
                var $tr = $(this).closest('tr');
                var data = {
                    dic:$tr.find('.dic-input').val(),
                    accessQuantity:oldWineList[i].accessQuantity,
                    wineStatus:oldWineList[i].wineStatus,
                    accessWineId :oldWineList[i].accessWineId ,
                    goodsId :oldWineList[i].goodsId  ,
                };
                wineList.push(data);
            });
            sendData.wineList = wineList;
        }
        doSend('exp',sendData)
    }
    function doSend(type , data){
        $.post('/wine/'+type , data,function(a){
            useCommon.toast(a.message);
            if(a.code  === 0){
                $window.modal('hide');
                doSearch(autoPage);
            }
        })
    }
});