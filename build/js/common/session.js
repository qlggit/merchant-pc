WY.isOwner = function(userId){
    var ownerUser = sessionJson.merchantUserInfo.userId.split('_')[0];
    return userId && userId === ownerUser;
};