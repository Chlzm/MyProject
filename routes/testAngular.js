module.exports = function(o){
    // 注册
    o.app.post('/getAngularInfo',function(req,res){
        o.db.info2.find({},function(err,doc){
            if(doc.length){
                res.json({
                    errorNumber : 1,
                    data : doc
                });
            }else{
                res.json({
                    errorNumber :0,
                    data : null
                });
            }
        })
    });
    
    
};
