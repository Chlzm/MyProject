var express = require("express");
var expressJade = require('express-jade');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes');
var db = require("./database/db.js");
var user = db.user;
var app = express();
app.set("views",__dirname + "/views");
app.set('view engine','jade');
app.use(express.static(__dirname + '/public'));
//app.use(express.static("../angularjs"));
app.use(cookieParser());
app.use(session({
	secret : '000000',
	name : 'testapp',
	cookie :{maxAge : 80000},
	resave : false,
	saveUninitialized : true
}));
app.use(bodyParser());
app.get('/hello',routes.hello);
app.get('/',function(req,res){
	res.render('index',{title:"首页"});
});
app.get('/value',function(req,res){
	res.render('newsletter');
})
app.post('/user/process?',function(req,res){
	//res.cookie('monster','mon2',{ maxAge: 20000,httpOnly:true, path:'/user/'});
	req.session.lastPage = '/process';
	res.render('thankyou',{name:'<p>'+req.path+'</p>'});
});
// 热门知识推荐
app.post('/getHotKnowledge',function(req,res){
	var query = db.knowledge.find({}).limit(4);
    query.exec(function(error,data){
        res.json({result:data})
    })
});
//
app.post('/getOpera',function(req,res){
    db.opera.find({},function(err,doc){
        res.json({result:doc})
    });
});
app.get('/thankyou',routes.thankyou);
app.listen(3000);