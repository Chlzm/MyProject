module.exports = function(o){
    
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
        var info = new o.db.user(data);
        info.save(function(err){
            var data = {
                state : 0,
                message : '注册失败'
            };
            if(err){
                req.session.registerMessage = "注册失败";
                //res.redirect(301,'/register');
            }else{
                req.session.registerMessage && req.session.registerMessage.destroy();
                data.state = 1;
                data.message = '注册成功'
                //res.redirect(301,'/login');
            }
            res.json(data);
        });
    });

    o.app.get("/registerCode", function (req, res) {
        o.geetest.register(function (err, data) {
            if (err) {
                res.send(JSON.stringify({
                    gt: 'b46d1900d0a894591916ea94ea91bd2c',
                    success: 0
                }));
            } else {
                res.send(JSON.stringify({
                    gt: 'b46d1900d0a894591916ea94ea91bd2c',
                    challenge: data,
                    success: 1
                }));
            }
        });
    });
    o.app.post("/validate", function (req, res) {
        o.geetest.validate({
            challenge: req.body.geetest_challenge,
            validate: req.body.geetest_validate,
            seccode: req.body.geetest_seccode
        }, function (err, result) {
            var data = {status: "success"};
            if (err || !result) {
                data.status = "fail";
            }
            res.send(JSON.stringify(data));
        });
    });
};
