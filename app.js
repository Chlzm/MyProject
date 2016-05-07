let express = require("express");
let expressJade = require('express-jade');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let compression = require('compression');
let db = require("./database/db.js");
let app = express();
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
var routes = require('./routes')({
	app:app,
	db : db
});
if(!module.parent){ 
    app.listen(80);
    console.log('ok')
}
module.exports = app;