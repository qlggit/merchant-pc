$(function(){
   $('.this-submit-btn').click(function(){
       var data = {
           amount :$('.withdraw-number').val() * 100,
           bankId  :$('[name=bankId]').val(),
       };
       if(data.amount  < 50000){
           useCommon.toast('最小提现金额500');
           return false;
       }
       $.post('/withdraw/add' ,data , function(a){
          useCommon.toast(a.message , 0 , function(){
              if(a.code === 0){
                    location.href = '/withdraw/list';
              }
          })
       });
   });
   $('.withdraw-number').bind('input',function(){
       var v = this.value.trim();
       if(v && !isNaN(v)){
           $('.show-withdraw-number').show().html('到账金额:' + (v * .85).toFixed(2));
       }
   });
});