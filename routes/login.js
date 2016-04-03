module.exports = function(o){
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
        var data = {name:req.body.name,password:req.body.password};
        o.db.user.find(data,function(err,doc){
            if(doc.length){
                req.session.sessname = doc[0].nickName;
                res.redirect(301,'/')
            }else{
                req.session.message = '用户名或密码错误';
                res.redirect(301,'/login');
            }
        })
    });
};
