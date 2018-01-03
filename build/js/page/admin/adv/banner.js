$(function(){
    var allData,showData;
    var $table = $('.show-data-table');
    if(!$table[0])return false;
    var $window = $('.show-info-window');
    var $dataForm = $window.find('form');
    var $searchForm = $('.search-form');
    var aotoPage = 1;
    $searchForm.submit(function(){
        doSearch(1);
        return false;
    })
    function doSearch(page){
        var sendData = {
            clinetLoc:$searchForm.find('[name=clinetLoc]').val(),
            bannerTypeCode:$searchForm.find('[name=bannerTypeCode]').val(),
            pageNum:page || 1,
            pageSize:10,
        };
        $.get('/admin/adv/banner/data',sendData , function(a){
            allData = a.data;
            setPage(page);
        });
    }
    var $page;
    function setPage(page){
        aotoPage = page;
        showData = allData;
        $table.find('.data-list').remove();
        $.each(showData , function(i , o){
            var $tr = $('<tr>').addClass('data-list');
            $tr.append('<td>'+(i+1)+'</td>');
            $tr.append('<td>'+Dictionary.text('clientLoc',o.clinetLoc )  +'</td>');
            $tr.append('<td>'+Dictionary.text('typeCode',o.bannerTypeCode  )  +'</td>');
            $tr.append('<td>'+o.title    +'</td>');
            $tr.append('<td><img src="'+o.bannerUrl +'" alt="" class="ico-40"></td>');
            $tr.append('<td><a href="'+o.link +'">'+(o.link && '连接' || '')+'</a></td>');
            $tr.append('<td>'+Dictionary.text('productStatus',o.status )    +'</td>');
            $tr.append('<td><div class="btn-group">' +
                (WY.permissionAuthHtml('' , '<a class="btn btn-sm btn-primary update-btn" index="'+i+'">修改</a>')) +
                // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="up" index="'+i+'">上架</a>':'') +
                // (WY.permissionAuth('')?'<a class="btn btn-sm btn-primary change-btn" status="down" index="'+i+'">下架</a>':'') +
                // '<a class="btn btn-sm btn-primary delete-btn">删除</a>' +
                '</div></td>');
            $table.append($tr);
        });
    }
    $('.add-new-btn').click(function(){
        $window.modal();
        $window.find('.show-file-content').attr('showImg','').showFileUpload();
        $dataForm[0].reset();
        updateData = null;
    });
    var updateData;
    $table.on('click', '.update-btn' , function(){
        $window.modal();
        updateData = showData[$(this).attr('index')];
        $dataForm.__formData(updateData);
        $window.find('.show-file-content').attr('showImg',updateData.bannerUrl ).showFileUpload();
    });
    $table.on('click', '.change-btn' , function(){
        updateData = showData[$(this).attr('index')];
        var type = $(this).attr('status');
        WY.confirm({
            content:'确认'+$(this).text()+'此banner?',
            done:function(){
                $.post('/admin/adv/banner/change',{
                    type:type,
                    goodsId:updateData.goodsId
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        doSearch(aotoPage);
                    }
                })
            }
        })
    });
    $window.find('.this-submit-btn').click(function(){
        var data = $dataForm.__serializeJSON();
        var valid = useValidate.validator({
            clinetLoc :{
                required:1,
                message:'请选择渠道'
            },
            bannerTypeCode :{
                required:1,
                message:'请选择类型'
            },
            bannerUrl  :{
                required:1,
                message:'请上传图片'
            },
        },data);
        if(!valid.valid){
            useCommon.toast(valid.message);
            return false;
        }
        if(updateData){
            data.bannerId     = updateData.bannerId    ;
        }else{
        }
        $.post('/admin/adv/banner/' + (updateData?'update':'add') , data , function(a){
            if(a.code ===0){
                $window.modal('hide');
                doSearch(updateData?aotoPage:1);
            }else{
                useCommon.toast(a.message);
            }
        });
    });
    WY.ready('auto-load-dictionary',doSearch);
});