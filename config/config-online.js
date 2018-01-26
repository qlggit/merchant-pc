//admin 1234yqs_admin
module.exports = {
    h5Api:'http://h5.yukew.com',
    seatUrl:'http://wx.yukew.com',
    hostname:'ws.yukew.com',
    qrcodeApi:'http://sh.yukew.com',
    wechatLoginUrl:'http://h5.yukew.com/wechat/entrance/wxsh',
    wechatJssdkUrl:'http://h5.yukew.com/wechat/jssdk/wxsh',
    "log4js":{
        "customBaseDir" :"../logs/merchant-pc/",
        "customDefaultAtt" :{
            "type": "dateFile",
            "absolute": true,
            "alwaysIncludePattern": true
        },
        "appenders": [
            {"type": "console", "category": "console"},
            {"pattern": "debug/yyyyMMdd.log", "category": "logDebug"},
            {"pattern": "info/yyyyMMdd.log", "category": "logInfo"},
            {"pattern": "warn/yyyyMMdd.log", "category": "logWarn"},
            {"pattern": "err/yyyyMMdd.log", "category": "logErr"}
        ],
        "replaceConsole": true,
        "allConsole":true,
        "levels":{ "logDebug": "DEBUG", "logInfo": "DEBUG", "logWarn": "DEBUG", "logErr": "DEBUG"}
    }
};

