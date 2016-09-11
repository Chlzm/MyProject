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
    o.app.post('/getXiaoBao',function(req,res){
        o.db.xiaobao.find({},'-_id',function(err,doc){
            res.json({result:doc});
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
    // react页面
    o.app.get('/react',function(req,res){
        res.render('react',{title:'学习react'})
    });
    //
    o.app.get('/flex',function(req,res){
       res.render('flex',{title:'练习flex'})
    });
    o.app.get('/es6',function(req,res){
       res.render('es6',{title:'es6-webpack'})
    });
    // 登录页路由
    require('./login')(o);
    // 注册页路曲
    require('./register')(o);
    // 
    require('./testAngular')(o);
    // 钓鱼浮漂介绍
    require('./fishing')(o);
}
