(function(){
    const index = angular.module('app', []);
    index.controller('PollListCtrl',function($scope,$http){
        $scope.fn1 = () => {
            $scope.result = "电脑2323";
        }
        const init = ({
            init(){
                this.getKnowledge();
                this.getOpera();
                this.getFriends();
                this.getXiaobao();
            },
            getXiaobao(){
                $.ajax({
                    url : '/getXiaoBao',
                    type : 'POST',
                    data : {

                    },
                    success(result){
                        console.log(result);
                    }
                })
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
                }).success(result=>{
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
