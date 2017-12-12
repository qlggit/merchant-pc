$(function(){
    var $merchantForm = $('.merchant-info-form');
    $('.do-submit-btn').click(function(){
        var gpsLongitude = $merchantForm.find('[name=gpsLongitude]').val().split(',');
        $.post('/merchant/edit' , {
            supplierPhone:$merchantForm.find('[name=supplierPhone]').val(),
            typeCode:$merchantForm.find('[name=typeCode]').val(),
            supplierName:$merchantForm.find('[name=supplierName]').val(),
            supplierAddr:$merchantForm.find('[name=supplierAddr]').val(),
            companyProfile:$merchantForm.find('[name=companyProfile]').val(),
            teamProfile:$merchantForm.find('[name=teamProfile]').val(),
            headFile:$merchantForm.find('[name=headFile]').val(),
            gpsLongitude:gpsLongitude[0],
            gpsDimension:gpsLongitude[1],
        },function(a){
            useCommon.toast(a.message);
        });
        return false;
    })
});