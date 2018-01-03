$(function(){
    var $pageLeft = $('.page-left');
    $pageLeft.find('.menu-title').click(function(){
        if($(this).hasClass('active'))return false;
        $pageLeft.find('.menu-title').removeClass('active');
        $(this).addClass('active');
    });
    $pageLeft.find('[href]').click(function(){
        var href = $(this).attr('href');
        var code = $(this).attr('code');
        console.log(href , code);
        if(href){
            if(code === 'menu09'){
                href = useCommon.addUrlParam(href , {
                    token:sessionJson.merchantUserInfo.tokenModel.token,
                    userId:sessionJson.merchantUserInfo.tokenModel.userId,
                    username:sessionJson.username,
                    merchantId:sessionJson.userInfo.company
                });
            }
            if(/^http/.test(href)){
                window.open(href);
            }else{
                location.href = href;
            }
        }
    });
    $('.sidebar-toggle-box').click(function(){
        $('.page-container').toggleClass('hide-left');
    });
});