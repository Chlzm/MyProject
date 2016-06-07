module.exports = function(o){
    // 登录页面
    o.app.get('/chart',function(req,res){
        res.render('fishingFloat',{title : '浮漂介绍'});
    });
};
