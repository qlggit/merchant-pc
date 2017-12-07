jQuery(document).ready(function() {
    $('.page-container .login-form').submit(function(){
        var username = $(this).find('[name=username]').val();
        var password = $(this).find('[name=password]').val();
        hideMessage();
        if(username === '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password === '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        ajax({
           url:'/login',
           method:'POST',
           data:{
               username:username,
               password:md5(password),
           },
           done:function(a){
               if(a.code === 0){
                   var redirectUrl = a.redirectUrl || '/';
                   location.href = redirectUrl;
               }
               else showMessage(a.message);
           }
        });
        return false;
    });
    $('.page-container .update-form').submit(function(){
        var username = $(this).find('[name=username]').val();
        var password = $(this).find('[name=password]').val();
        var newPassword = $(this).find('[name=newPassword]').val();
        hideMessage();
        if(username === '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '27px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.username').focus();
            });
            return false;
        }
        if(password === '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '96px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        if(newPassword === '') {
            $(this).find('.error').fadeOut('fast', function(){
                $(this).css('top', '165px');
            });
            $(this).find('.error').fadeIn('fast', function(){
                $(this).parent().find('.password').focus();
            });
            return false;
        }
        ajax({
            url:'/login/update',
            method:'POST',
            data:{
                username:username,
                password:md5(password),
                newPassword:md5(newPassword),
            },
            done:function(a){
                if(a.code === 0){
                    var redirectUrl = a.redirectUrl || '/';
                    location.href = redirectUrl;
                }
                else showMessage(a.message);
            }
        });
        return false;
    });
    $('.page-container form .username, .page-container form .password').keyup(function(){
        $(this).parent().find('.error').fadeOut('fast');
    });
});
function showMessage(html){
    $('.error-message').html(html).show();
}
function hideMessage(){
    $('.error-message').hide();
}
$('.toggle-show-btn').click(function(){
    $('.login-form').show();
    $(this).closest('form').hide();
});

(function(){
    //扫码登录
    var content = $('.show-qrcode-content')[0];
    var wsData = {
        env:NODE_ENV
    };
    wsData.onopen= function(ws){
        ws.send(JSON.stringify({
            type:'qrcodeLogin',
            itemType:'open',
        }));
    };
    wsData.onmessage= function(data , ws){
        if(data.code === 0){
            if(data.itemType === 'open'){
                qrcodeCanvas.putCanvas(qrcodeCanvas.getUrl('/server/qrcode/login/'+data.data),'请扫码登录商户管理系统');
            }else if(data.itemType === 'login'){
                $.post('/login/qrcode',{
                    loginId:data.data,
                },function(a){
                    ws.send(JSON.stringify({
                        code:a.code,
                        data:data.data,
                        message:a.message,
                        type:'qrcodeLogin',
                        itemType:'complete',
                    }));
                    if(a.code === 0){
                        location.href = '/';
                    }
                });
            }
        }
    };
    var qrcodeCanvas = new qrcodeLogin({
        content:content,
        env:NODE_ENV,
        width:300,
        height:300,
    }),wsSocket = new wsLogin(wsData);
})();
function ajax(options){
    var xhr = new XMLHttpRequest();
    options.method = options.method || 'GET';
    xhr.open(options.method.toUpperCase(), options.url);
    xhr.onreadystatechange=state_Change;
    function state_Change()
    {
        if (xhr.readyState===4)
        {
            var response = xhr.responseText;
            if (xhr.status===200)
            {
                try{
                    response = JSON.parse(response);
                }catch (e){}
                options.done && options.done(response);
                return false;
            }
            options.error && options.error();
        }
    }
    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    xhr.setRequestHeader( 'content-type','application/json');
    xhr.onerror = function(e) {
        options.error && options.error(e);
    };
    xhr.send(JSON.stringify(options.data || {}));
}
