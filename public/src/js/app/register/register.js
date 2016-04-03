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
        $scope.userName = "";      // 用户名
        $scope.password = "";      // 密码
        $scope.nickName = "";      // 昵称
        $scope.state = true;
        $scope.watch = function(){
            var state = false;
            if($scope.userName.length && $scope.password.length && $scope.nickName.length){
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
                        userName : $scope.userName,
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
        }
        var init = ({
            init : function(){

            },
            _register : function(){

            }
        }).init();
        $scope.show = true;
    });
})();