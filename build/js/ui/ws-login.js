function wsLogin(options){
    this.options = Object.assign({

    },options);
    this.init();
}
wsLogin.prototype = {
    init:function(){
        this.options.env = this.options.env || 'dev';
        this.ws();
    },
    ws:function(){
        var options = this.options;
        var wsUrl = 'ws://' + ({
            dev:'192.168.1.119:3004',
            test:'192.168.1.245:3004',
            online:'47.100.20.78:3004',
        })[this.options.env];
        var socket=new WebSocket(wsUrl);
        socket.onopen = function(){
            options.onopen && options.onopen(socket);
        };
        socket.onmessage= function(data){
            data = JSON.parse(data.data);
            console.log('has socket message');
            console.log(data);
            options.onmessage && options.onmessage(data,socket);
        };
        socket.onerror = function(e){
            options.onerror && options.onerror(e);
        };
        socket.onclose = function(e){
            options.onclose && options.onclose(e);
        };
        this.socket = socket;
    },
    send:function(msg){
        if(typeof msg === 'object')msg = JSON.stringify(msg);
        this.socket.send(msg);
    }
};