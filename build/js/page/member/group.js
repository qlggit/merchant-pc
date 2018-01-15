$(function(){
    var allToken = localStorage.allToken;
    var userKey = sessionJson.username || sessionJson.userInfo.uid || sessionJson.userInfo._id;
    var token;
    if(allToken){
        allToken = JSON.parse(allToken);
        token = allToken[userKey];
    }else allToken = {};
    var chatRoomId;
    var chatGroupId = chatRoomId = resJson.merchantInfo.chatGroupId;
    $.get('/login/rongToken',function(a){
        allToken[userKey] = token = a.data;
        localStorage.allToken = JSON.stringify(allToken);
        start();
    });
    var $sendMessage = $('.send-message'),$messageContent = $('.message-content');
    var $sendBtn = $('.send-btn');
    var $memberContent = $('.member-left');
    function putOneMember(data){
        $memberContent.append('<div class="member-list">' +
            '                        <div class="member-item flex-left">' +
            '                            <img src="'+data.headImg +'" class="border-rad-100" alt="">' +
            '                            <div class="pl-20">' +
            '                                <div class="fz-32 color-24">'+data.nickName +'</div>' +
            '                                <div class="fz-24 color-128 pt-10"></div>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>');
    }
    var pageNum=1,pageSize=100;
    function searchUser(){
        $.get('/member/group/user',{
            pageNum:pageNum,
            pageSize:pageSize,
            groupsId:chatGroupId,
        } , function(a){
            $('.show-user-number').text(a.data.total);
            a.data.list.forEach(function(d){
                putOneMember(d);
            });
            if(!a.data.isLastPage){
                pageNum++;
                searchUser();
            }
        });
    }
    searchUser();
    $sendBtn.click(function(){
        var msg = $sendMessage.val();
        if(!msg.trim()){
            useCommon.toast('请输入内容');
            return false;
        }
        sendMessage({
            content:msg,
            extra:'管理员',
            done:rightMsg
        })
    });
    function resetScrollTop(){
        $messageContent[0].scrollTop+=10000;
    }
    var lastMsgDate;
    function addDate(){
        if(lastMsgDate || Date.now() - lastMsgDate > 60*1000){
            var $div = $('<div class="date color-104 fz-24 mb-20 margin-auto">'+useCommon.parseDate(lastMsgDate = new Date)+'</div>');
            $messageContent.append($div);
        }
    }
    function getExtra(data,userId){
        return WY.isOwner(userId)?data.extra:'<div class="btn-lx border-24 fz-32">删除</div>';
    }
    function rightMsg(data , userId){
        addDate();
        $sendMessage.val('');
        var $div = $('<div class="message right flex-right flex-top ">' +
            '                    <div class="flex-center ">' +
            '                        <div class="content break-all">'+data.content+'</div>' +
            '                        <img src="/images/ico/san-right.png" class="ico-30 " alt="">' +
            '                    </div>' +
            '                    <div class="pt-10">' +
            '                        <img class="mr-30 head-img border-rad-100" src="'+resJson.merchantInfo.headFile+'" alt="">' +
            '                        <div class="color-128 fz-24 pt-10">'+getExtra(data,userId)+'</div>' +
            '                    </div>' +
            '                </div>');
        $messageContent.append($div);
        resetScrollTop();
    }
    function leftMsg(data){
        addDate();
        var content = data.content || data;
        var senderUserId = data.senderUserId;
        var $div = $('<div class="message left flex-left flex-top ">' +
            '                    <div class="pt-10">' +
            '                        <img class="mr-30 head-img border-rad-100" src="'+resJson.merchantInfo.headFile+'" alt="">' +
            '                        <div class="color-128 fz-24 pt-10">'+getExtra(content,userId)+'</div>' +
            '                    </div>' +
            '                    <div class="flex-center ">' +
            '                        <img src="/images/ico/san-left.png" class="ico-30" alt="">' +
            '                        <div class="content break-all">'+content.content+'</div>' +
            '                    </div>' +
            '                </div>');
        $messageContent.append($div);
        resetScrollTop();
    }
    function start(){
        RongIMLib.RongIMClient.init(resJson.rongcloudAppKey);
        RongIMClient.setConnectionStatusListener({
            onChanged: function (status) {
                switch (status) {
                    case RongIMLib.ConnectionStatus.CONNECTED:
                        console.log('链接成功');
                        break;
                    case RongIMLib.ConnectionStatus.CONNECTING:
                        console.log('正在链接');
                        break;
                    case RongIMLib.ConnectionStatus.DISCONNECTED:
                        console.log('断开连接');
                        break;
                    case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                        console.log('其他设备登录');
                        break;
                    case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                        console.log('域名不正确');
                        break;
                    case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                        console.log('网络不可用');
                        break;
                }
            }});
        RongIMClient.setOnReceiveMessageListener({
            onReceived: function (message) {
                console.log(message);
                switch(message.messageType){
                    case RongIMClient.MessageType.TextMessage:
                        leftMsg(message);
                        // message.content.content => 消息内容
                        break;
                    case RongIMClient.MessageType.VoiceMessage:
                        // 对声音进行预加载
                        // message.content.content 格式为 AMR 格式的 base64 码
                        break;
                    case RongIMClient.MessageType.ImageMessage:
                        // message.content.content => 图片缩略图 base64。
                        // message.content.imageUri => 原图 URL。
                        break;
                    case RongIMClient.MessageType.DiscussionNotificationMessage:
                        // message.content.extension => 讨论组中的人员。
                        break;
                    case RongIMClient.MessageType.LocationMessage:
                        // message.content.latiude => 纬度。
                        // message.content.longitude => 经度。
                        // message.content.content => 位置图片 base64。
                        break;
                    case RongIMClient.MessageType.RichContentMessage:
                        // message.content.content => 文本消息内容。
                        // message.content.imageUri => 图片 base64。
                        // message.content.url => 原图 URL。
                        break;
                    case RongIMClient.MessageType.InformationNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ContactNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.ProfileNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandNotificationMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.CommandMessage:
                        // do something...
                        break;
                    case RongIMClient.MessageType.UnknownMessage:
                        // do something...
                        break;
                    default:
                    // do something...
                }
            }
        });
        RongIMClient.connect(token, {
            onSuccess: function(userId) {
                console.log("Connect successfully." + userId);
            },
            onTokenIncorrect: function() {
                console.log('token无效');
            },
            onError:function(errorCode){
                console.log(errorCode);
            }
        });
        var callback = {
            onSuccess: function(userId) {
                console.log("Reconnect successfully." + userId);
            },
            onTokenIncorrect: function() {
                console.log('token无效');
            },
            onError:function(errorCode){
                console.log(errorCode);
            }
        };
        var config = {
            // 默认 false, true 启用自动重连，启用则为必选参数
            auto: true,
            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
            // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
            rate: [100, 1000, 3000, 6000, 10000]
        };
        RongIMClient.reconnect(callback, config);
    }
    window.sendMessage = function (data){
        var msg = new RongIMLib.TextMessage({content:data.content,extra:data.extra});
        var conversationtype = RongIMLib.ConversationType.GROUP; // 单聊,其他会话选择相应的消息类型即可。
        var targetId = chatGroupId;
        RongIMClient.getInstance().sendMessage(conversationtype, targetId+'', msg, {
            onSuccess:function(){
                console.log("Send successfully");
                data.done && data.done(data);
            },
            onError: function (errorCode,message) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = '未知错误';
                        break;
                }
                useCommon.toast('发送失败:' + info);
            }
        } );
    }
});