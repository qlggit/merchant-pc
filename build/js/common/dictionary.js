var Dictionary = {
	cache: {
        productStatus:{
			normal:'初始化',
			up:'上架',
			down:'下架',
		},
        showStatus:{
			normal:'正常',
            deleted:'隐藏',
		},
        appChannel:{
			android:'Android',
            ios:'IOS',
		},
        appStatus:{
			normal:'正常使用',
            up:'需要升级',
            die:'废弃的',
		},
        typeCode:{
			bar:'酒吧',
            clear:'清吧',
            ktv:'KTV',
		},
        starNum:{
			1:'非常满意',
            2:'满意',
            3:'一般',
            4:'不满意',
            5:'很不满意',
		},
        withdrawStatus:{
			1:'审核中',
            2:'审核通过',
            3:'提现成功',
            4:'提现失败',
            5:'退回',
		},
        bankList:{
			1:'中国工商银行',
            2:'中国农业银行',
            3:'中国银行',
            4:'中国建设银行',
            5:'中国光大银行',
            6:'中国民生银行',
            7:'华夏银行',
            8:'中信银行',
            9:'恒丰银行',
            10:'上海浦东发展银行',
            11:'交通银行',
            12:'浙商银行',
            13:'兴业银行',
            14:'深圳发展银行',
            15:'招商银行',
            16:'广东发展银行',
		},
	},
	get: function(code, onSuccess, onFault, onComplete) {
		var _this = this;
		if (!code) {
            onFault && onFault();
			return null;
		}
        var data = _this.cache[code];
		if(data){
            onSuccess && onSuccess(data);
            return data;
		}
		else if(/(\/)|(http)/.test(code)){
			$.get(code,function(a){
                _this.cache[code] = a.data.list || a.data;
                onSuccess && onSuccess(_this.cache[code]);
			});
		}
	},
	text: function(code, value) {
		var _this = this;
		var libarayText = '';
		if (!code || !value) return libarayText;
		if (_this.cache[code]) {
			libarayText = _this.cache[code][value] || '';
		}
		return libarayText;
	},
	load: function($ele , code , call) {
		var that = this;
        this.get(code , function(data){
            $ele.each(function(){
            	console.log(data);
                that.loadOption($(this) , data , {
                	key:$(this).attr('load-key'),
                	val:$(this).attr('load-val'),
				});
            });
            call && call();
		});
	},
	autoLoad:function(call){
        var that = this;
        var ele = $('[data-dictionary]');
        var loadCount = ele.length;
        if(loadCount === 0){
            call && call();
		}
        else ele.each(function(){
            that.load($(this) , $(this).attr('data-dictionary'),function(){
            	loadCount -- ;
            	if(loadCount === 0){
            		call && call();
				}
			});
        });
	},
	loadOption:function($ele , data , options){
		if(!Array.isArray(data))data = useCommon.objectToArray(data);
        if(!data.find(function(a){return a.key === ''}))data.unshift({key:'',value:'全部'});
        $.each(data , function( i , o){
        	$ele.append('<option value="' + (o[options.key || 'key']  || o.key || '')+ '">' + ( o[options.val || 'value'] || o.value || '') + '</option>');
		});
	}
};