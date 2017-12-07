;(function(){
    var $modalLoadingWindow;
    WY.bind('modal-handler' , function(content , options){
        content.find('[modal-handler]').each(function(){
            var handler = $(this).attr('modal-handler');
            var $content = $(this);
            handler.split(',').forEach(function(one){
                WY.trigger('modal-handler-'+one, $content , options);
            });

        });
    });
    $.modalLoading = function(content , options){
        $modalLoadingWindow = $modalLoadingWindow || $('.modal-loading-window');
        $modalLoadingWindow.find('.modal-content').html('').append(content).removeClass('back-none');
        if(options.backNone){
            $modalLoadingWindow.find('.modal-content').addClass('back-none');
        }
        WY.trigger('modal-handler' , $modalLoadingWindow,options);
        var $content  = $modalLoadingWindow.find('.modal-content').children();
        WY.trigger('modal-load',$content , options);
        if(!options.notModal){
            $modalLoadingWindow.modal();
        }
        else return $modalLoadingWindow;
        return $content;
    };
    $.modalLoadingView = function(url , call , options){
        if(!/^\//.test(url))url = '/common/view?view=' + url;
        if(options == null){
            options = {}
        }else if(options == true){
            options = {
               sts:1
            }
        }
        $.get(url , function(content){
            var $html;
            if(!options.sts){
                $html = $.modalLoading(content , options);
            }else{
                $html = content;
            }
            if(call)call($html);
        });
    };
    $.modalLoadingHide = function(){
        $modalLoadingWindow.modal('hide');
    };
    $(function(){
        var modalLoad;
        var options;
        var $this;
        function load(){
            $.modalLoadingView(modalLoad, function(content){

            },options);
        }
        $('body').on('click','[modal-load]' , function(){
            $this = $(this);
            modalLoad = $this.attr('modal-load');
            options = useCommon.parse($this.attr('modal-options'));
            load();
            return false;
        });
    });
})();