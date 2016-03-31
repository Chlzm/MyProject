module.exports = function(o){
    o.app.get('/',function(req,res){
        res.render('index',{title:'首页'});
    });
    o.app.post('/getHotKnowledge',function(req,res){
        var query = o.db.knowledge.find({}).limit(4);
        query.exec(function(error,data){
            res.json({result:data})
        })
    });
    o.app.post('/getOpera',function(req,res){
        o.db.opera.find({},function(err,doc){
            res.json({result:doc})
        });
    });
}
