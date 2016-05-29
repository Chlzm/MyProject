module.exports = function(o){
    // 登录页面
    o.app.get('/fishing',function(req,res){
        res.render('fishingFloat',{title : '浮漂介绍'});
    });
    //
    o.app.post('/fishing/getFloat',function(req,res){
        var data = {};
        if(req.body.type){
            data.type = req.body.type;
        }
        o.db.fishing.find(data,function(err,doc){
            if(doc.length){
                res.json({
                    data:doc
                });
            }else{
                res.json({
                    data:[]
                });
            }
        });
    });
};
