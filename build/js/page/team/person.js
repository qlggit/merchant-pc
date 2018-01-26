$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $window = $('.show-info-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    var autoPage = 1;
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    })
    function doSearch(page){
        var sendData = {
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/team/person/data',sendData , function(a){
            allData = a.data;
            setPage(page);
        });
    }
    var $page;
    function setPage(page){
        autoPage = page;
        showData = allData.list;
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+o.nickname +'</td>');
            $tr.append('<td>'+o.dutyName  +'</td>');
            $tr.append('<td>'+o.mobile  +'</td>');
            // $tr.append('<td>'+(o.defaultAmount/100||0)  +'</td>');
            // $tr.append('<td>'+(o.defaultAmount/100||0)  +'</td>');
            $tr.append('<td>'+Dictionary.text('gender',o.gender)   +'</td>');
            $tr.append('<td><img src="'+o.headImg+'" class="ico-40" alt=""></td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary task-btn" index="'+i+'">业绩</a>')) +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary duty-btn" index="'+i+'">职位</a>')) +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary amount-btn" index="'+i+'">额度</a>')) +
                // (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary" target="_blank" href="/member/list?spreadUserId='+o.userId+'">客户</a>')) +
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
    $('.add-new-btn').click(function(){
        $window.modal();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        $dataForm[0].reset();
        $dataForm.__formData(updateData);
    });
    var $dutyWindow = $('.show-duty-window');
    $dutyWindow.find('.this-submit-btn').click(function(){
        $.post('/team/person/duty',{
            dutyId:$dutyWindow.find('[name=dutyId]').val(),
            staffId:updateData.staffId,
        },function(a){
            if(a.code ===0){
                $dutyWindow.modal('hide');
                doSearch(autoPage);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $table.on('click', '.duty-btn' , function(){
        updateData = showData[$(this).attr('index')];
        $dutyWindow.modal();
    });
    var $taskWindow = $('.show-task-window');
    $table.on('click', '.task-btn' , function(){
        updateData = showData[$(this).attr('index')];
        $taskWindow.modal();
        $taskWindow.find('.data-list').remove();
    });
    $taskWindow.find('.this-submit-btn').click(function(){
        var setDate = $taskWindow.find('[name=setDate]').val();
        var year = useCommon.parseDate(new Date , 'Y') - 0;
        if(setDate < useCommon.parseDate(new Date , 'm') - 0){
            year += 1;
        }
        setDate = [year , setDate].join('-');
        $.post('/team/person/task',{
            setDate:setDate,
            staffId:updateData.staffId,
            amount:$taskWindow.find('[name=amount]').val()*100,
        },function(a){
            if(a.code ===0){
                $taskWindow.modal('hide');
                doSearch(autoPage);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    $table.on('click', '.amount-btn' , function(){
        updateData = showData[$(this).attr('index')];
        WY.prompt({
            content:'请输入最大消费额度',
            done:function(v){
                if(isNaN(v)){
                    useCommon.toast('请输入有效的额度');
                    return false;
                }
                $.post('/team/person/amount',{
                    staffId:updateData.staffId,
                    amount:v*100,
                },function(a){
                    if(a.code ===0){
                        doSearch(autoPage);
                    }else{
                        useCommon.toast(a.message);
                    }
                });
            }
        })
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        var valid = useValidate.validator({
            dutyName:{
                required:1,
                message:'请输入职位名称'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.dutyId  = updateData.dutyId ;
        }else{
        }
        data.unitPrice *= 100;
        $.post('/team/person/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData?autoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);


    //扫码添加操作员
    var qrcodeWindow = $('.permission-user-qrcode-window');
    var qrcodeContent = qrcodeWindow.find('.modal-body');
    var qrcodeCanvas,wsSocket;
    $('.add-qrcode-user-btn').click(function(){
        qrcodeWindow.modal();
        if(!qrcodeCanvas){
            qrcodeCanvas = new qrcodeLogin({
                content:qrcodeContent[0],
                env:NODE_ENV,
                channel:merchant_channel,
                width:300,
                height:300,
            })
        }
        if(!wsSocket){
            wsSocket = new wsLogin(wsData);
        }
    });
    var wsData = {
        env:NODE_ENV
    };
    wsData.onopen= function(ws){
        ws.send(JSON.stringify({
            type:'qrcodeAdd',
            channel:merchant_channel,
            itemType:'open'
        }));
        qrcodeCanvas.putCanvas(qrcodeCanvas.getUrl('/server/qrcode/operator/'+sessionJson.userInfo._id + '/' + sessionJson.merchantUserInfo.userId),'请扫码二维码成为操作员');
    };
    wsData.onmessage= function(data , ws){
        if(data.code === 0){
            if(data.type === 'qrcodeAdd' && data.itemType === 'login'){
                doSearch();
            }
        }
    };
    wsData.onerror = function(e){
        console.log(e);
    };
    wsData.onclose = function(e){

    };
});