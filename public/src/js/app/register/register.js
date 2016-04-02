(function(){
    var index = angular.module('register', []);
    index.controller('Register',function($scope,$http){
        $scope.userName = "222";           // 用户名
        $scope.password = "";      // 密码
        $scope.nickName = "";      // 昵称
        var init = ({
            init : function(){

            }
        }).init();
        $scope.show = true;
    });
})();
