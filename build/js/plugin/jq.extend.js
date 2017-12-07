//显示遮罩
useCommon.backHideWindow = function(options){
    options = options || {};
    if(!options.type || options.type == 'show'){
        var div = $('<div>').addClass('show-window-back show-back-hide-window');
        $('body').append(div);
        if(options.handler){
            div.click(options.handler);
        }
        div.css({
            zIndex:options.content.css('zIndex')?(options.content.css('zIndex') - 1):1000
        });
        return div;
    }else{
        var hideEle;
        if(options.backHideWindow){
            hideEle = options.backHideWindow;
            options.backHideWindow.remove();
        }
        else hideEle = $('.show-back-hide-window');
        hideEle.hide(1,function(){
            $(this).remove();
        });
    }
};
//显示简易弹窗
useCommon.showEasyWindow = function(options){
    var content = $(options.content);
    var handler = function(){
        if(options.done)options.done();
        $(options.content).css({
            left:-9999
        });
        useCommon.backHideWindow({
            type:'hide',
            backHideWindow:content[0].backHideWindow,
            delay:options.delay
        });
    };
    if(options.type == 'hide'){
        return handler();
    }
    content.show().css({
        left:0
    });
    content[0].backHideWindow = useCommon.backHideWindow({
        content:content
    });
    content.find('.close-this-window-btn').click(function(){
        handler();
        return false;
    });
    var hasMainAble = !!content.find('.main').length;
    if(hasMainAble){
        content.find('.main').click(function(){return false;});
    }
    content.click(function(e){
        if(!options.hideAble){
            if(hasMainAble || e.target == this){
                handler();
            }
        }
    });
};
$.fn.showEasyWindow = function(type , hideAble , done){
    return this.each(function(){
        useCommon.showEasyWindow({
            content:this,
            type:type,
            hideAble:hideAble,
            done:done
        })
    });
};


(function(){
    var toastTimer;
    useCommon.toast = function(text , delay , call){
        var $toastWindow = $('.ms-toast-window');
        $toastWindow.show();
        $toastWindow.find('.text').text(text);
        if(isNaN(delay) || delay <=0)delay = 2000;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function(){
            $toastWindow.hide();
            if(call)call();
        } , delay);
    };
    var alertBackHide;

    useCommon.alert = function(options){
        if(typeof options == 'string'){
            options = {
                content:options
            };
        }
        var $alertWindow = $('.ms-alert-window');
        if(typeof options.content == 'string')options.content = options.content.slice(0 , 100);
        $alertWindow.find('.ms-alert-content').html(options.content);
        $alertWindow.show().css({
            left:0
        });
        var $alertMain = $alertWindow.find('.ms-alert-main');
        alertBackHide = alertBackHide || useCommon.backHideWindow({
                content:$alertWindow
        });
        $alertWindow.find('.ms-alert-submit-btn').unbind('click').click(function(){
            if(options.done)if(options.done() === false)return false;
            setTimeout(function(){
                $alertWindow.css({
                    left:-9999
                });
            });
            useCommon.backHideWindow({
                type:'hide',
                backHideWindow:alertBackHide
            });
            alertBackHide = null;
        });

    };
    //
   useCommon.prompt = function(options){
       var $alertWindow = $('.ms-prompt-window');
       $alertWindow.find('.prompt-title').text(options.title);
       $alertWindow.find('.prompt-input').val(options.value || '');
       $alertWindow.show().css({
           left:0
       });
       alertBackHide = alertBackHide || useCommon.backHideWindow({
               content:$alertWindow
           });
       $alertWindow.find('.ms-prompt-submit-btn').unbind('click').click(function(){
           if(options.done)if(options.done($alertWindow.find('.prompt-input').val()) === false)return false;
           setTimeout(function(){
               $alertWindow.css({
                   left:-9999
               });
           });
           useCommon.backHideWindow({
               type:'hide',
               backHideWindow:alertBackHide
           });
           alertBackHide = null;
       });
    };
    //
   useCommon.confirm = function(options){
       var $alertWindow = $('.ms-confirm-window');
       $alertWindow.find('.confirm-title').text(options.title);
       $alertWindow.show().css({
           left:0
       });
       alertBackHide = alertBackHide || useCommon.backHideWindow({
               content:$alertWindow
           });
       $alertWindow.find('.ms-confirm-submit-btn').unbind('click').click(function(){
           if(options.done)if(options.done() === false)return false;
           setTimeout(function(){
               $alertWindow.css({
                   left:-9999
               });
           });
           useCommon.backHideWindow({
               type:'hide',
               backHideWindow:alertBackHide
           });
           alertBackHide = null;
       });
    };
})();