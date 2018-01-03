$(function(){
    var $merchantForm = $('.merchant-info-form');
    var $gpsLongitude  =$('[name=gpsLongitude]');
    var gpsLongitude = $gpsLongitude.val();
    var turnGps;
    $gpsLongitude.bind('input' , function(){
        if(gpsLongitude !== $(this).val()){
            turnGps = $(this).val().split(',');
            turnGps = bd09togcj02(turnGps[0],turnGps[1]);
            turnGps = gcj02towgs84(turnGps[0],turnGps[1]).join();
        }
    });
    $('.do-submit-btn').click(function(){
        var gpsLongitude = (turnGps || $merchantForm.find('[name=gpsLongitude]').val()).split(',');
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