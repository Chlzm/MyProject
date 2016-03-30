exports.index = function(req,res){
	res.render('index',{title : __dirname});
}
exports.hello = function(req,res){
	res.render('hello',{title : new Date().toString()});
}
exports.thankyou = function(req,res){
	res.render('thankyou',{name:req.body.name})
}
