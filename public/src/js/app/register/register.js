(function(){
    var index = angular.module('register', []);
    index.directive('ngKeyup',function(){
        return {
            restrict : 'A',
            link : function(scope,elem,attrs){
                var functionToCall = scope.$eval(attrs.ngKeyup);
                elem.on('keyup', function(e){
                    functionToCall(e.which);
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
            var state = false;
            if($scope.name.length && $scope.password.length && $scope.nickName.length){
                state = false;
            }else{
                state = true;
            }
            $scope.$apply(function(){
                $scope.state = state;
            });
            $scope.btnRegister = function(){
                $http({
                    url : '/register',
                    method : 'POST',
                    data : {
                        name : $scope.name,
                        password : $scope.password,
                        nickName : $scope.nickName
                    }
                }).success(function(result){
                    if(result && result.state === 1){
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
                    window.captchaObj = captchaObj;
                    // 将验证码加到id为captcha的元素里
                    captchaObj.appendTo("#captcha");
                    captchaObj.onReady(function () {
                        $("#wait")[0].className = "hide";
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
