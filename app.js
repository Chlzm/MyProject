var express = require("express");
var expressJade = require('express-jade');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');
var db = require("./database/db.js");
var app = express();
app.use(compression());
app.set("views",__dirname + "/views");
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
	secret : '000000',
	name : 'testapp',
	cookie : {maxAge : 800000},
	resave : false,
	saveUninitialized : true
}));
app.use(bodyParser());
if(app.get('env') === 'development'){
    app.use(function(err,req,res,next) {
       req.status(err.status || 500);
        res.render('error',{
            message : err.message,
            error : err
        });
    });
}
/*
var websoket = require('./module/websoket');
websoket({
    app:app
});
*/
var routes = require('./routes')({
	app:app,
	db : db
});
var http = require('http').Server(app);
var io = require('socket.io')(http);
console.log(io)
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        console.log('message: ' + msg);

        io.emit('chat message', msg);
    });
});
http.listen(3000);
module.exports = app;