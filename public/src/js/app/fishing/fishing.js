(function(){
    const index = angular.module('myFishing', []);
    index.controller('float',function($scope,$http){
        ///fishing/getFloat  {type:1}
        $scope.type = "";
        let getInfo = ()=>{
            $http({
                url : "/fishing/getFloat",
                method : "post",
                data : {
                    type : $scope.type
                }
            }).success(result =>{
                $scope.data = result.data;
            });
        };
        getInfo();
        $scope.getFloatInfo = function () {
            getInfo();
        }
    });
})();
