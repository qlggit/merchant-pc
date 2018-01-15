(function(){
    var isSmsSending;
    WY.sms = function(el , phone){
        el.onclick = function(e){
            if(!isSmsSending){
                var arg = 'PAY_PWD';
                if(!phone || !/^1\d{10}$/.test(phone)){
                    useCommon.toast('请输入有效的手机号');
                    return false;
                }
                $.post('/sms/send',{
                    sendType:arg,
                    phone:phone
                },function(a){
                    if(a.code === 0){
                        isSmsSending = 1;
                        dateTimer(el , 60 , function(){
                            isSmsSending = 0;
                        });
                    }else{
                        useCommon.toast(a.message);
                    }
                });
            }
            e.stopPropagation();
        }
    };
    $('.sms-btn').each(function(){
        WY.sms(this , resJson.merchantInfo.supplierPhone);
    });
})();