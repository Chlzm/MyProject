module.exports = function(o){
    // 首页
    o.app.get('/',function(req,res){
        res.render('index',{title:'首页',userName:req.session.sessname});
    });
    o.app.get('/xiaobao',function(req,res){
        res.render('hello',{title:'首页'});
    });
    o.app.get('/lisheng',function(req,res){
        res.render('thankyou',{title : '<p>ddd</p>'})
    });
    // 登录页面
    o.app.get('/login',function(req,res){
        res.render('login',{title : '用户登录',message:req.session.message});
    });
    // 退出登录
    o.app.get('/logout',function(req,res){
        req.session.sessname && req.session.destroy('sessname');
        res.redirect(301,'/');
    });
    // 登录接口
    o.app.post('/login',function(req,res){
        var data = {name:req.body.name,pwd:req.body.password};
        o.db.user.find(data,function(err,doc){
           /* req.session.sessname = doc[0].nickName;
            res.redirect(301,'/')*/
            if(doc.length){
                req.session.sessname = doc[0].nickName;
                res.redirect(301,'/')
            }else{
                req.session.message = '用户名或密码错误';
                res.redirect(301,'/login');
            }
        })
    });
    // 注册
    o.app.get('/register',function(req,res){
        res.render('register',{title:'注册页',message:req.session.registerMessage});
    });
    // 注册提交接口
    o.app.post('/register',function(req,res){
        var data = {
            name : req.body.name,
            password : req.body.password,
            nickName : req.body.nickName
        }
        var info = new o.db.user(data);
        info.save(function(err){
            if(err){
                req.session.registerMessage = "注册失败";
            }else{
                req.session.registerMessage = "注册成功";
            }
            res.redirect(301,'/register')
        });
    });
    // 热门知识接口
    o.app.post('/getHotKnowledge',function(req,res){
        var query = o.db.knowledge.find({}).limit(4);
        query.exec(function(error,data){
            //data.page = req.body.page;
            res.json({result:data})
        })
    });
    // 热门戏曲接口
    o.app.post('/getOpera',function(req,res){
        o.db.opera.find({},function(err,doc){
            res.json({result:doc})
        });
    });
    // 找朋友信息推荐
    o.app.post('/getFriends',function(req,res){
        o.db.friends.find({},function(err,doc){
            res.json({result:doc});
        })
    })
}
