$.fn.rangeTimeSelect = function(options){
    return this.each(function(){
        var $start = $(this).find('.start-time');
        var $end = $(this).find('.end-time');
        $start.datetimepicker({
            format:options.format || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:options.minView,
            startDate:new Date,
            endDate:options.endDate || $end.val(),
            todayBtn:'linked',
            todayHighlight:true,
        }).on('changeDate',function(e){
            $end.datetimepicker('setStartDate',  useCommon.parseDate(e.date,'Y-m-d'));
            $start.datetimepicker('hide');
        });
        $end.datetimepicker({
            format:options.format || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:options.minView,
            startDate:useCommon.parseDate(options.startTime || $start.val() || new Date),
            todayBtn:'linked',
            todayHighlight:true,
        }).on('changeDate',function(e){
            $start.datetimepicker('setEndDate', useCommon.parseDate(e.date,'Y-m-d'));
            $end.datetimepicker('hide');
        });
    });
};
$.fn.oneDatetimePicker = function(options){
    return this.each(function(){
        var dateOptions = {
            format:$(this).attr('format') || 'yyyy-mm-dd hh:ii:ss',
            autoclose:true,
            minView:$(this).attr('min-view'),
            todayBtn:'linked',
            todayHighlight:true,
        };
        var startDate = $(this).attr('start-date');
        if(startDate)dateOptions.startDate = startDate;
        var endDate = $(this).attr('end-date');
        if(endDate)dateOptions.endDate = endDate;
        $(this).datetimepicker(dateOptions);
    });
};