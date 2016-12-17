module.exports = function(o){
    var WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({ port: 8081 });
    wss.on('connection', function (ws) {
        console.log('client connected');
        ws.on('message', function (message) {
            ws.send({
                data:JSON.parse(message).data
            },{mask:true});
        });
    });
}