var express = require("express");
var expressJade = require('express-jade');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db = require("./database/db.js");
var app = express();
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
var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';
var geetest = require("./gt-sdk.js")(privateKey, publicKey);
if(app.get('env') === 'development'){
    app.use(function(err,req,res,next) {
       req.status(err.status || 500);
        res.render('error',{
            message : err.message,
            error : err
        });
    });
}
var routes = require('./routes')({
	app:app,
	db : db,
    geetest : geetest
});
if(!module.parent){ 
    app.listen(3000);
    console.log('ok')
}
module.exports = app;