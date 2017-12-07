(function(){
    useValidate.permission = {
		validator:function(data , type){
			var valid = useValidate.validator({
				username:{
					required:1,
					maxlength:20,
					requiredMessage:'请输入登录账号',
                    maxlengthMessage:'账号最长为20'
				},
				password:{
					required:1,
                    lengthRange:[6,18],
					requiredMessage:'请输入登录密码',
                    lengthRangeMessage:'登录密码为6-18位'
				}
			},data);
			return valid;
		}
	};
})();