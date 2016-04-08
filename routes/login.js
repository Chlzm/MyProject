module.exports = function(o){
    var path = require('path');
    var rootPath = path.dirname(__dirname);
    var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
    var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';
    var geetest = require(rootPath + "/gt-sdk.js")(privateKey, publicKey);
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
        geetest.validate({
            challenge: req.body.geetest_challenge,
            validate: req.body.geetest_validate,
            seccode: req.body.geetest_seccode
        },function (err, result) {
            if (err || !result) {
                req.session.message = '验证码校验失败，请稍后重试';
                res.redirect(301,'/login');
                res.json({
                    errorNumber : 0,
                    errorMessage : '验证码校验失败，请稍后重试'
                });
                /*req.session.message = '验证码校验失败，请稍后重试';
                res.redirect(301,'/login');*/
            }else{
                o.db.user.find(data,function(err,doc){
                    if(doc.length){
                        req.session.sessname = doc[0].nickName;
                        res.json({
                            errorNumber : 1,
                            message : '登录成功'
                        });
                        //res.redirect(301,'/')
                    }else{
                        req.session.message = '用户名或密码错误';
                        res.redirect(301,'/login');
                    }
                })
            }
        });
    });

    o.app.get("/loginVerifyCode", function (req, res) {
        geetest.register(function (err, data) {
            if (err) {
                res.send(JSON.stringify({
                    gt: publicKey,
                    success: 0
                }));
            } else {
                res.send(JSON.stringify({
                    gt: publicKey,
                    challenge: data,
                    success: 1
                }));
            }
        });
    });
};
