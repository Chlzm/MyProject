module.exports = function(o){
    // 后台接口
    o.app.post('/getAngularInfo',function(req,res){
        var result = req.body.name ? {name:req.body.name} : {};
        o.db.info2.find(result,function(err,doc){
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
