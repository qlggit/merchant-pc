(function(){
    var alertWindow,alertCb;
    WY.alert = function(options){
        if(typeof options !== 'object')options = {content:options};
        confirmCb = options.done;
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
    var confirmWindow,confirmCb;
    WY.confirm = function(options){
        confirmCb = options.done;
        if(!confirmWindow){
            confirmWindow = $('.bs-confirm-window');
            confirmWindow.on('click' , '.this-submit-btn',function(){
                if(confirmCb && confirmCb() === false)return false;
                confirmWindow.modal('hide');
            });
        }
        confirmWindow.find('.modal-title').text(options.title || '提示');
        confirmWindow.find('.text-content').text(options.content || '提示');
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
    var $loadingWindow;
    WY.loading = function(sts){
        $loadingWindow = $loadingWindow || $('.wy-loading-window');
        $loadingWindow[sts?'show':'hide']();
    }
})();
