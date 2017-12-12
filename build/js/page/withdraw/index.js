$(function(){
   $('.this-submit-btn').click(function(){
       var data = {
           je:$('.withdraw-number').val() * 100,
           yhkId :$('[name=yhkId]').val(),
       };
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