(function(){
    $.fn.showPermissionMenu = function(autoMenu , autoPermission){
        var autoParentMenu;
        var parentMenuList = [],allMenuList=[],allPermissionList=[];
        function ParentMenu(data , i){
            this.code = data.code;
            this._id = data._id;
            this.name = data.name;
            this.index = i;
            this.init();
        }
        ParentMenu.prototype = {
            init:function(){
                var childMenu = this.getMenu();
                var $childEle = $('<div class="pl-15">');
                var checkSign = this.checkSign = 'ParentMenu' + this.index;
                this.ele = this.createElement();
                this.checkbox = this.ele.find(':checkbox');
                this.ele.append($childEle);
                this.checkbox.click(function(e){
                    var checked = $(this).prop('checked');
                    menuList.forEach(function(a){
                        a.setChildChecked(checked);
                    });
                });
                var menuList = this.menuList = [];
                childMenu.forEach(function(a , i){
                    var menu = new Menu(a , i , checkSign);
                    menuList.push(menu);
                    allMenuList.push(menu);
                    $childEle.append(menu.ele);
                });
            },
            setChecked:function(checked){
                this.checkbox.prop('checked' , checked);
            },
            getMenu:function(){
                var code = this.code;
                return autoMenu.filter(function(a){
                    return code && code == a.parentCode ;
                });
            },
            createElement:function(){
                return $('<div><input _id="'+this._id+'" code="'+this.code+'"  type="checkbox" permission-all="'+this.checkSign+'"><h3 class="inline-block" >'+this.name+'</h3></div>');
            }
        };
        function Menu(data , i , parentSign){
            this.code = data.code;
            this.name = data.name;
            this.index = i;
            this._id = data._id;
            this.parentSign = parentSign;
            this.parentCode= data.parentCode;
            this.init();
        }
        Menu.prototype = {
            init:function(){
                var $childEle = $('<div class="pl-15">').hide();
                this.checkSign = this.parentSign + 'Menu' + this.index;
                this.ele = this.createElement();
                this.checkbox = this.ele.find(':checkbox');
                var _this = this;
                this.ele.find('.title').click(function(){
                    _this.childShow = !_this.childShow;
                    _this.showChild();
                });
                this.checkbox.click(function(e){
                    _this.checkedChange();
                });
                this.childShow = false;
                this.childEle = $childEle;
                this.ele.append($childEle);
                var childPermission = this.getPermission();
                var permissionList = this.permissionList = [];
                childPermission.forEach(function(a , i){
                    var permission = new Permission(a , i , _this.checkSign);
                    permissionList.push(permission);
                    allPermissionList.push(permission);
                    $childEle.append(permission.ele);
                });
            },
            showChild:function(){
                this.childEle[this.childShow?'hide':'show']();
            },
            getPermission:function(){
                if(!autoPermission)return [];
                var code = this.code;
                return autoPermission.filter(function(a){
                    return code == a.menuCode;
                });
            },
            checkedChange:function(){
                var checked = this.checkbox.prop('checked');
                var allChecked = !$('[permission-one='+this.parentSign+']:not(:checked)').length;
                $('[permission-all='+this.parentSign+']').prop('checked',allChecked);
                this.permissionList.forEach(function(a){a.checkbox.prop('checked',checked)});
            },
            setChecked:function(checked){
                this.checkbox.prop('checked' , checked);
                this.checkedChange();
            },
            setChildChecked:function(checked){
                this.checkbox.prop('checked' , checked);
                this.permissionList.forEach(function(a){a.checkbox.prop('checked',checked)});
            },
            setParentChecked:function(checked){
                this.checkbox.prop('checked' , checked);
                var allChecked = !$('[permission-one='+this.parentSign+']:not(:checked)').length;
                $('[permission-all='+this.parentSign+']').prop('checked',allChecked);
            },
            createElement:function(){
                return $('<div><input _id="'+this._id+'"  type="checkbox" code="'+this.code+'" permission-all="'+this.checkSign+'" permission-one="'+this.parentSign+'" ><h4 class="title cursor-pointer inline-block">'+this.name+'</h4></div>');
            }
        };
        function Permission(data , i , parentSign){
            this.code = data.code;
            this.name = data.name;
            this.index = i;
            this.parentSign = parentSign;
            this.menuCode= data.menuCode;
            this.init();
        }
        Permission.prototype = {
            init:function(){
                this.ele = this.createElement();
                var _this = this;
                this.checkbox = this.ele.find(':checkbox');
                this.checkbox.click(function(e){
                    _this.checkedChange();
                });
            },
            checkedChange:function(){
                var _this = this;
                allMenuList.every(function(a){
                    if(a.code == _this.menuCode){
                        a.setParentChecked(!$('[permission-one='+_this.parentSign+']:not(:checked)').length);
                        return false;
                    }
                    return true;
                });
            },
            setChecked:function(checked){
                this.checkbox.prop('checked' , checked);
                this.checkedChange();
            },
            createElement:function(){
                return $('<label class="width-100"><input type="checkbox" code="'+this.code+'" permission-one="'+this.parentSign+'">'+this.name+'</label>');
            }
        };
        var $this = this;
        autoParentMenu = autoMenu.filter(function(a){
            return !a.parentCode;
        });
        $this.html('');
        autoParentMenu.forEach(function(a , i){
            var parentMenu = new ParentMenu(a , i);
            parentMenuList.push(parentMenu);
            $this.append(parentMenu.ele);
        });
        return {
            setRole:function(checked){
                if(typeof checked == 'string')checked = checked.split(',');
                parentMenuList.forEach(function(a){
                    if(checked.indexOf(a._id) > -1){
                        a.setChecked(true);
                    }
                });
            },
            getRole:function(checked){
                var rt = [];
                parentMenuList.forEach(function(a){
                    if(a.checkbox.prop('checked')){
                        rt.push(a._id);
                    }
                });
                return rt;
            },
            setMenu:function(checked){
                if(typeof checked == 'string')checked = checked.split(',');
                allMenuList.forEach(function(a){
                    if(checked.indexOf(a.code) > -1){
                        a.setChecked(true);
                    }
                });
            },
            getMenu:function(checked){
                var rt = [];
                allMenuList.forEach(function(a){
                    if(a.checkbox.prop('checked')){
                        rt.push(a.code);
                        rt.push(a.parentCode);
                    }
                });
                return $.unique(rt);
            },
            getChecked:function(){
                var rt = [];
                allPermissionList.forEach(function(a){
                    if(a.checkbox.prop('checked')){
                        rt.push(a.code);
                    }
                });
                return rt;
            },
            setChecked:function(checked){
                if(typeof checked == 'string')checked = checked.split(',');
                allPermissionList.forEach(function(a){
                    if(checked.indexOf(a.code) > -1){
                        a.setChecked(true);
                    }
                });
            },
            reset:function(){
                $this.find(':checkbox').prop('checked' , false);
            }
        };
    };
})();
