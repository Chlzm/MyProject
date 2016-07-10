define([], function () {
    

    (function () {
        var index = angular.module('myFishing', []);
        index.controller('float', function ($scope, $http) {
            ///fishing/getFloat  {type:1}
            $scope.type = "";
            var getInfo = function getInfo() {
                $http({
                    url: "/fishing/getFloat",
                    method: "post",
                    data: {
                        type: $scope.type
                    }
                }).success(function (result) {
                    $scope.data = result.data;
                });
            };
            getInfo();
            $scope.getFloatInfo = function () {
                getInfo();
            };
        });
    })();
});