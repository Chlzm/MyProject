module.exports = function(o){
    var path = require('path');
    var rootPath = path.dirname(__dirname);
    var privateKey = '36fc3fe98530eea08dfc6ce76e3d24c4';
    var publicKey = 'b46d1900d0a894591916ea94ea91bd2c';
    var geetest = require(rootPath + "/gt-sdk.js")(privateKey, publicKey);
    // 注册
    o.app.get('/register',function(req,res){
        res.render('register',{title:'注册页',message:req.session.registerMessage});
    });
    o.app.get('/registerSuccess',function(req,res){
        res.render('thankyou',{title:'注册成功'});
    });
    // 注册提交接口
    o.app.post('/register',function(req,res){
        var data = {
            name : req.body.name,
            password : req.body.password,
            nickName : req.body.nickName
        };
        geetest.validate({
            challenge: req.body.geetest_challenge,
            validate: req.body.geetest_validate,
            seccode: req.body.geetest_seccode
        },function (err, result) {
            var obj = {
                status: "success",
                message : '注册成功'
            };
            if (err || !result) {
                obj.status = "fail";
                obj.message = "注册失败";
            }else{
                var info = new o.db.user(data);
                info.save(function(err){
                    if(err){
                        req.session.registerMessage = "注册失败";
                    }else{
                        req.session.registerMessage && req.session.registerMessage.destroy();
                    }
                });
            }
            res.json(obj);
        });
    });

    o.app.get("/registerCode", function (req, res) {
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
    o.app.post("/validate", function (req, res) {

    });
};
