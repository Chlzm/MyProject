(function(){
    const index = angular.module('myLogin', []);
    index.controller('login',function($scope,$http){
        // 用户登录
        $scope.btnLogin = () =>{
            // 获取验证状态 false or object
            let result = $scope.captchaObj.getValidate();
            if(!result){
                alert('验证码错误');
                return;
            }
            // 合并对象
            Object.assign(result,{
                name : $scope.name,
                password : $scope.password
            });
            $http({
                url : '/login',
                method : 'post',
                data : result
            }).success(result =>{
                if(result && result.errorNumber){
                    location.href="/";
                }
            });
        };
        const init = ({
            init(){
                this.renderVerifyCode();
            },
            // 获取验证码信息
            renderVerifyCode(){
                const handler = captchaObj => {
                    $scope.captchaObj = captchaObj;
                    $scope.captchaObj.appendTo("#captcha");
                    $scope.captchaObj.onReady(function () {
                        //...
                    });
                };
                $http({
                    url : '/loginVerifyCode',
                    method : 'get'
                }).success(data =>{
                    initGeetest({
                        gt: data.gt,
                        challenge: data.challenge,
                        product: "embed", // 产品形式
                        offline: !data.success
                    }, handler);
                });
            },
            // 登录按钮
            _btnLogin(){

            }
        }).init();
    });
})();
