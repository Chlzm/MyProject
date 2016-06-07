define([], function () {
    'use strict';

    (function () {
        var index = angular.module('register', []);
        index.directive('ngKeyup', function () {
            return {
                restrict: 'A',
                link: function link(scope, elem, attrs) {
                    var functionToCall = scope.$eval(attrs.ngKeyup);
                    elem.on('keyup', function (e) {
                        functionToCall && functionToCall(e.which);
                    });
                }
            };
        });
        index.controller('Register', function ($scope, $http) {
            $scope.name = ""; // 用户名
            $scope.password = ""; // 密码
            $scope.nickName = ""; // 昵称
            $scope.state = true;
            $scope.watch = function () {
                if ($scope.name.length && $scope.password.length && $scope.nickName.length) {
                    $scope.state = false;
                } else {
                    $scope.state = true;
                }
            };
            // 点击注册按钮
            $scope.btnRegister = function () {
                if ($scope.rf.$invalid) {
                    console.log($scope.rf);
                    return;
                }
                $http({
                    url: '/register',
                    method: 'POST',
                    data: {
                        name: $scope.name,
                        password: $scope.password,
                        nickName: $scope.nickName
                    }
                }).success(function (result) {
                    if (result && result.errorNumber === 1) {
                        alert(result.message);
                        location.href = '/registerSuccess';
                    }
                });
            };
            $scope.isNumber = /\d/;
            var init = {
                init: function init() {}
            }.init();
            $scope.show = true;
        });
    })();
});