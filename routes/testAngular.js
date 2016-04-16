module.exports = function(o){
    // 注册
    o.app.post('/getAngularInfo',function(req,res){
        o.db.info.find({},function(err,doc){
            if(doc.length){
                //req.session.sessname = doc[0].nickName;
                res.json({
                    errorNumber : 1,
                    message : doc
                });
                //res.redirect(301,'/')
            }else{
                res.json({
                    errorNumber :1,
                    message : doc
                });
                //req.session.message = '用户名或密码错误';
                //res.redirect(301,'/login');
            }
        })
    });
    
    
};
