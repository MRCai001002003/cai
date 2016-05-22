define(function(require) {
    return function(app) {
        app.directive('blockComponent', function() {
            return {
                scope:true,
                restrict: 'E',
                templateUrl: require.toUrl('./blockComponent.html'),
                replace: true,
                controller: ['$scope',
                    function($scope) {
						$scope.content=$scope.$parent.item;
                    }
                ],
                link: function($scope, element) {
                    //					树结构 = {
                    //                        componentName: 'blockComponent',
                    //                        tree: [{
                    //							下一级树
                    //						}]
                    //                    };
                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'blockComponent',
                        tree: [{}]
                    };
                    $scope.add = function(index) {
                        $scope.content.tree.splice(index + 1, 0, {});
                    };
                    $scope.remove = function(index) {
                        $scope.content.tree.splice(index, 1);
                    };
                }
            };
        });
    }
})
