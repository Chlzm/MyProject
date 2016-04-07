(function(){
    var index = angular.module('register', []);
    index.directive('ngKeyup',function(){
        return {
            restrict : 'A',
            link : function(scope,elem,attrs){
                var functionToCall = scope.$eval(attrs.ngKeyup);
                elem.on('keyup', function(e){
                    functionToCall && functionToCall(e.which);
                });
            }
        }
    });
    index.controller('Register',function($scope,$http){
        $scope.name = "";      // 用户名
        $scope.password = "";      // 密码
        $scope.nickName = "";      // 昵称
        $scope.state = true;
        $scope.watch = function(){
            if($scope.name.length && $scope.password.length && $scope.nickName.length){
                $scope.state = false;
            }else{
                $scope.state = true;
            }
            $scope.btnRegister = function(){
                let result = $scope.captchaObj.getValidate();
                if(!result){
                    alert('验证码错误');
                    return;
                }
                Object.assign(result,{
                    name : $scope.name,
                    password : $scope.password,
                    nickName : $scope.nickName
                });
                $http({
                    url : '/register',
                    method : 'POST',
                    data : result
                }).success(function(result){
                    if(result && result.status === 'success'){
                        alert(result.message);
                        location.href = '/registerSuccess';
                    }
                });
            }
        };
        var init = ({
            init : function(){
                this._register();
            },
            _register : function(){
                var handler = function(captchaObj){
                    var success = false;
                    $scope.captchaObj = captchaObj;
                    // 将验证码加到id为captcha的元素里
                    $scope.captchaObj.appendTo("#captcha");
                    $scope.captchaObj.onReady(function () {
                    });
                };
                $http({
                    url : '/registerCode',
                    method : 'get'
                }).success(function(data){
                    initGeetest({
                        gt: data.gt,
                        challenge: data.challenge,
                        product: "embed", // 产品形式
                        offline: !data.success
                    }, handler);
                });
            }
        }).init();
        $scope.show = true;
    });
})();
