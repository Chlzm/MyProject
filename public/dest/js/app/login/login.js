define([], function () {
    'use strict';

    (function () {
        var index = angular.module('myLogin', []);
        index.controller('login', function ($scope, $http) {
            // 用户登录
            $scope.btnLogin = function () {
                // 获取验证状态 false or object
                var result = $scope.captchaObj.getValidate();
                if (!result) {
                    alert('验证码错误');
                    return;
                }
                // 合并对象
                Object.assign(result, {
                    name: $scope.name,
                    password: $scope.password
                });
                $http({
                    url: '/login',
                    method: 'post',
                    data: result
                }).success(function (result) {
                    if (result && result.errorNumber) {
                        location.href = "/";
                    }
                });
            };
            var init = {
                init: function init() {
                    this.renderVerifyCode();
                },
                renderVerifyCode: function renderVerifyCode() {
                    var handler = function handler(captchaObj) {
                        $scope.captchaObj = captchaObj;
                        $scope.captchaObj.appendTo("#captcha");
                        $scope.captchaObj.onReady(function () {
                            //...
                        });
                    };
                    $http({
                        url: '/loginVerifyCode',
                        method: 'get'
                    }).success(function (data) {
                        initGeetest({
                            gt: data.gt,
                            challenge: data.challenge,
                            product: "embed", // 产品形式
                            offline: !data.success
                        }, handler);
                    });
                },
                _btnLogin: function _btnLogin() {}
            }.init();
        });
    })();
});