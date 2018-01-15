WY.permissionAuth = function(code){
    if(!code || sessionJson.userInfo.type > 49)return true;
    if(sessionJson.permissionData.permissionCode.indexOf(code) > -1)return true;
};
WY.permissionAuthHtml = function(code , html){
    if(!code || sessionJson.userInfo.type > 49)return html;
    if(sessionJson.permissionData.permissionCode.indexOf(code) > -1)return html;
    return '';
};
WY.authHtml = function(code , html){
    if(code)return html;
    return '';
};