(function(){
    var index = angular.module('app', []);
    /*index.run(function($http){

    });*/

    index.controller('PollListCtrl',function($scope,$http){
        $scope.polls = 343335;
        $scope.result = "";
        $scope.fn = () => {
            $scope.result = "电脑";
        }
        let init = ({
            init(){
                this.getKnowledge();
                this.getOpera();
                this.getFriends();
            },
            // 热门知识推荐
            getKnowledge(){
                $http({
                    url : '/getHotKnowledge',
                    method : 'POST',
                    data : {
                        aa : 1
                    }
                }).success(result=>{
                    setTimeout(()=>{
                        $scope.$apply(()=>{
                            $scope.dataList = result.result;
                        });
                    }, 0); 
                })
            },
            getOpera(){
                $http({
                    url : '/getOpera',
                    method : 'POST',
                    data : {
                        aa : 1
                    }
                }).success(function(result){
                    setTimeout(()=>{
                        $scope.$apply(()=>{
                            $scope.operaList = result.result;
                        });
                    }, 0);
                })
            },
            // 热门戏曲
            getFriends(){
                $http({
                    url : '/getFriends',
                    method : 'POST',
                    data : {
                        aa : 1
                    }
                }).success(result=>{
                    setTimeout(()=>{
                        $scope.$apply(()=>{
                            $scope.friendsList = result.result;
                        });
                    }, 0);
                })
            }
        }).init();
        $scope.show = true;
    });
})();
