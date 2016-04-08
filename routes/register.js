module.exports = function(o){
    // 注册
    o.app.get('/register',function(req,res){
        res.render('register',{title:'注册页',message:req.session.registerMessage});
    });
    o.app.get('/registerSuccess',function(req,res){
        res.render('thankyou',{title:'注册成功'});
    });
    // 注册提交接口
    o.app.post('/register',function(req,res){
        var data = {
            name : req.body.name,
            password : req.body.password,
            nickName : req.body.nickName
        };
        var info = new o.db.user(data);
        info.save(function(err){
            if(err){
                req.session.registerMessage = "注册失败";
            }else{
                req.session.registerMessage && req.session.registerMessage.destroy();
            }
            res.json(obj);
        });
        
    });
    
};
