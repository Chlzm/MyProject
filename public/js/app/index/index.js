(function(){
    var index = angular.module('app', []);
    index.run(function($http){

    });
    index.controller('PollListCtrl',function($scope,$http){
        var sc = $scope;
        $scope.polls = 343335;
        $scope.result = "";
        $scope.fn = function(num){
            $scope.result = "电脑";
        }
        var init = ({
            init : function(){
                this.getKnowledge();
                this.getOpera();
            },
            // 热门知识推荐
            getKnowledge : function(){
                $http({
                    url : '/getHotKnowledge',
                    method : 'POST',
                    data : {
                        page : 3
                    },
                    params : {
                        bb : 2
                    }
                }).success(function(result){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.dataList = result.result;
                        });
                    }, 0); 
                })
            },
            getOpera : function(){
                $http({
                    url : '/getOpera',
                    method : 'POST',
                    data : {
                        aa : 1
                    }
                }).success(function(result){
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.operaList = result.result;
                        });
                    }, 0);
                })
            }
        }).init();
        $scope.show = true;
    });
})();
