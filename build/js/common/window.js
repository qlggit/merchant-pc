(function(){
    var alertWindow,alertCb;
    WY.alert = function(options){
        if(typeof options !== 'object')options = {content:options};
        alertCb = options.done;
        if(!alertWindow){
            alertWindow = $('.bs-alert-window');
            alertWindow.on('click' , '.this-submit-btn',function(){
                if(alertCb && alertCb() === false)return false;
                alertWindow.modal('hide');
            });
        }
        alertWindow.find('.modal-title').text(options.title || '提示');
        alertWindow.find('.text-content').text(options.content || '提示');
        alertWindow.modal();
    };
    var confirmWindow,confirmCb,confirmCancelCb;
    WY.confirm = function(options){
        confirmCb = options.done;
        confirmCancelCb = options.cancel;
        if(!confirmWindow){
            confirmWindow = $('.bs-confirm-window');
            confirmWindow.on('click' , '.this-submit-btn',function(){
                if(confirmCb && confirmCb() === false)return false;
                confirmWindow.modal('hide');
            });
            confirmWindow.on('click' , '.this-close-btn',function(){
                if(confirmCancelCb && confirmCancelCb() === false)return false;
                confirmWindow.modal('hide');
            });
        }
        confirmWindow.find('.modal-title').text(options.title || '提示');
        confirmWindow.find('.text-content').text(options.content || '提示');
        confirmWindow.find('.this-submit-btn').text(options.submitText || '确定');
        confirmWindow.find('.this-close-btn').text(options.cancelText || '关闭');
        confirmWindow.modal();
    };
    var promptWindow,promptCb;
    WY.prompt = function(options){
        promptCb = options.done;
        if(!promptWindow){
            promptWindow = $('.bs-prompt-window');
            promptWindow.on('click' , '.this-submit-btn',function(){
                if(promptCb && promptCb(promptWindow.find('input').val()) === false)return false;
                promptWindow.modal('hide');
            });
        }
        promptWindow.find('.title').text(options.title || '提示');
        promptWindow.find('.modal-placeholder').text(options.content || '提示');
        promptWindow.find('input').val(options.input || '').attr('placeholder',options.placeholder || '')[0].focus();
        promptWindow.modal();
    };
    var $popover;
    WY.popover = function(options){
        $popover = $popover || $('.wy-popover');
        var container = $(options.container);
        var offset = container.offset();
        var top = offset.top + container.height();
        var left = offset.left;
        var $pop = container[0].popover = container[0].popover || $popover.clone();
        $pop.appendTo('body');
        $pop.css({
            top:top,
            left:left,
        });
        $pop.find('.popover-content').html(options.content);
        $pop.addClass(options.placement);
        $pop.addClass(options.className);
        $pop.show();
        $pop.click(function(){
            return false;
        });
        options.done && options.done($pop);
    };
    $(document).click(function(){
        $('.popover').hide();
    });
    // var $loadingWindow;
    // WY.loading = function(sts){
    //     $loadingWindow = $loadingWindow || $('.ms-loading-window');
    //     $loadingWindow[sts == 0?'hide':'show']();
    // };
    var $videoWindow;
    WY.showVideo = function(src , title){
        if(!$videoWindow){
            $videoWindow = $('.modal-video-window');
            $videoWindow.find('.aria-label').click(function(){

            });
        }
        $videoWindow.find('video').attr('src' , src);
        $videoWindow.find('.modal-title').text(title || '视频播放');
        $videoWindow.modal();
    };
    WY.showImage = function(src , title){
        $videoWindow = $videoWindow || $('.modal-image-window');
        $videoWindow.find('.img').css('background-image' , 'url('+src+')');
        $videoWindow.find('.modal-title').text(title || '图片展示');
        $videoWindow.modal();
    }
})();
