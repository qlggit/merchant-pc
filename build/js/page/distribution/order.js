$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $searchForm = $('.search-form');
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    });
    function doSearch(page){
        $.get('/order/seat/list',{
            pageNum:page || 1,
            pageSize:10,
            dcStatus:'wait',
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
            $tr.append('<td>'+o.orderNo+'</td>');
            $tr.append('<td>'+(o.lowCostAmount/100 || 0).toFixed(2)+'</td>');
            $tr.append('<td>'+o.nickName+'</td>');
            $tr.append('<td>'+o.mobile+'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.rowAddTime)+'</td>');
            $tr.append('<td>'+useCommon.parseDate(o.bookTime)+'</td>');
            $tr.append('<td>'+o.seatName+'</td>');
            $tr.append('<td><div class="btn-group">' +
                '<a class="btn btn-sm btn-primary open-btn" index="'+i+'">展开</a>' +
                '<a class="btn btn-sm btn-primary distribute-btn" index="'+i+'" style="display: none">配送</a>' +
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
    var updateData;
    $table.on('click','.open-btn',function(){
        updateData = showData[$(this).attr('index')];
        var $tr = $(this).closest('tr');
        if($(this).hasClass('is-open')){
            $(this).text('收缩');
            $(this).siblings('.distribute-btn').hide();
            $(this).removeClass('.is-open');
            $tr.next('.tr-item').hide();
        }else{
            $(this).text('展开');
            $(this).addClass('is-open');
            $(this).siblings('.distribute-btn').show();
            if($tr.next('.tr-item').length){
                $tr.next('.tr-item').show();
            }else{
                $.get('/order/infoBySeat',{
                    seatOrderNo:updateData.orderNo,
                },function(a){
                    makeNewTr(a.data , $tr);
                })
            }
        }
    });
    function doSearchPerson(){
        $.get('/team/person/data',{
            pageNum:1,
            pageSize:20,
            supplierId:sessionJson.supplierId,
            dutyName:'服务员',
        },function(a){
            setPersonList(a.data.list);
        });
    }
    var inputTimer;
    $('.search-input').bind('input' , function(){
        var val;
        if(val = $(this).val()){
            clearTimeout(inputTimer);
            inputTimer = setTimeout(function(){
                doSearchPerson(val);
            },300);
        }
    });
    var goodsIds;
    $table.on('click','.distribute-btn',function(){
        updateData = showData[$(this).attr('index')];
        var $tr = $(this).closest('tr').next('.tr-item');
        $window.find('.data-list').remove();
        var $table = $window.find('.table');
        goodsIds = $tr.find('[code]:checked').map(function(){
            var $tr = $(this).closest('tr');
            $table.append('<tr>' +
                '<td>'+$tr.find('.distribute-name').html()+'</td>' +
                '<td>'+$tr.find('.distribute-quantity').html()+'</td>' +
                '</tr>')
            return $(this).attr('code');
        }).toArray().join();
        if(!goodsIds){
            useCommon.toast('请先选择要配送的商品');
            return false;
        }
        $window.modal();
    });
    function setPersonList(data){
        $window.find('[name=staffId]').html('<option value="">请选择</option>');
        data.forEach(function(a){
            $window.find('[name=staffId]').append('<option value="'+a.staffId+'">'+a.nickname+'</option>')
        });
    }
    function makeNewTr(data , $tr){
        var $newTr = $('<tr class="data-list tr-item">');
        $tr.after($newTr);
        var $td = $('<td>').attr('colspan',$tr.children().length).appendTo($newTr);
        var $table = $('<table class="table">').appendTo($td);
        $table.append('<tr><td>商品名称</td><td>数量</td><td>选择<input check-all="check-'+data[0].seatOrderNo+'" type="checkbox"></td></tr>');
        var detailLs = [];
        data.forEach(function(a){
            a.detailLs.forEach(function(b){
                if(!b.status)detailLs.push(b);
            });
        });
        detailLs.forEach(function(a){
            $table.append('<tr class="data-list">' +
                '<td class="distribute-name">'+a.goodsName+'</td>' +
                '<td class="distribute-quantity">'+a.quantity+'</td>' +
                '<td><input type="checkbox" code="'+a.goodsId+'" check-one="check-'+data[0].seatOrderNo+'"></td>' +
                '</tr>')
        })
    }

    var $window = $('.distribute-info-window');
    $window.find('.this-submit-btn').click(function(){
        var staffId = $window.find('[name=staffId]').val();
        if(!staffId){
            useCommon.toast('请先选择服务员');
            return false;
        }
        $.post('/distribution/order/do',{
            orderNo:updateData.orderNo,
            staffId:staffId,
            goodsIds:goodsIds
        },function(a){
           useCommon.toast(a.message);
            if(a.code === 0){
                $window.modal('hide');
               doSearch(1);
           }
        });
    });
    doSearchPerson();
});