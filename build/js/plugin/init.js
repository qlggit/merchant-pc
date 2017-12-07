
//loading
;(function(){
    Object.defineProperties(useCommon , {
        loading:{
            set:function(sts){
                var loadingEle = $('.ms-loading-window');
                if(!loadingEle.showEasyWindow)return false;
                if(sts){
                    loadingEle.showEasyWindow(null , 1);
                }
                else{
                    loadingEle.showEasyWindow('hide');
                }
            }
        }
    });
})();