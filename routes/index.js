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
    // 热门知识接口
    o.app.post('/getHotKnowledge',function(req,res){
        var query = o.db.knowledge.find({}).limit(4);
        query.exec(function(error,data){
            //data.page = req.body.page;
            res.json({result:data})
        });
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
    });
    // 找朋友信息推荐
    o.app.get('/testAngular',function(req,res){
        res.render('testAngular',{title:'angular 测试'})
    });
    // 登录页路由
    require('./login')(o);
    // 注册页路曲
    require('./register')(o);
    // 
    require('./testAngular')(o);
}
