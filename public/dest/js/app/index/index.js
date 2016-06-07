define([], function () {
    'use strict';

    (function () {
        var index = angular.module('app', []);
        index.controller('PollListCtrl', function ($scope, $http) {
            $scope.fn1 = function () {
                $scope.result = "电脑2323";
            };
            var init = {
                init: function init() {
                    this.getKnowledge();
                    this.getOpera();
                    this.getFriends();
                },
                getKnowledge: function getKnowledge() {
                    $http({
                        url: '/getHotKnowledge',
                        method: 'POST',
                        data: {
                            aa: 1
                        }
                    }).success(function (result) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.dataList = result.result;
                            });
                        }, 0);
                    });
                },
                getOpera: function getOpera() {
                    $http({
                        url: '/getOpera',
                        method: 'POST',
                        data: {
                            aa: 1
                        }
                    }).success(function (result) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.operaList = result.result;
                            });
                        }, 0);
                    });
                },
                getFriends: function getFriends() {
                    $http({
                        url: '/getFriends',
                        method: 'POST',
                        data: {
                            aa: 1
                        }
                    }).success(function (result) {
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.friendsList = result.result;
                            });
                        }, 0);
                    });
                }
            }.init();
            $scope.show = true;
        });
    })();
});