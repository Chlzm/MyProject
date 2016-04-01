module.exports = function(o){
    // 首页
    o.app.get('/',function(req,res){
        if(!req.session.sessname){
            res.redirect(301,'/login');
        }
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
        res.render('login',{title : '用户登录'})
    });
    // 登录接品
    o.app.post('/login',function(req,res){
        var data = {name:req.body.name,pwd:Number(req.body.password)};
        o.db.user.count(data,function(err,doc){
            if(doc){
                req.session.sessname = req.body.name;
                res.redirect(301,'/')
            }else{
                res.redirect(301,'/xiaobao');
            }
        })
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
