$(function(){
    $('.cost-btn').click(function(){
        WY.confirm({
            content:'确认开始进行配送此桌的消费品?',
            done:function(){
                $.post('/order/seat/cost',{
                    orderNo:hrefData.orderNo
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        location.reload();
                    }
                })
            }
        })
    });
    $('.cost-done-btn').click(function(){
        WY.confirm({
            content:'确认此桌个人离桌?',
            done:function(){
                $.post('/order/seat/cost/done',{
                    orderNo:hrefData.orderNo
                } , function(a){
                    useCommon.toast(a.message);
                    if(a.code === 0){
                        location.reload();
                    }
                })
            }
        })
    });
});