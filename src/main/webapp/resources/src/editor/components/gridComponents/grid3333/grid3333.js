define(function(require) {
    return function(app) {
        app.directive('grid3333', function() {
            return {
                scope:true,
                restrict: 'E',
                templateUrl: require.toUrl('./grid3333.html'),
                replace: true,
				controller: ['$scope',
                    function($scope) {
						$scope.content=$scope.$parent.item;
                    }
                ],
                link: function($scope, element) {
                    //					树结构 = {
                    //                        componentName: 'grid3333',
                    //                        tree: [{
                    //							下一级树
                    //						},{},{},{}...]
                    //                    };
                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'grid3333',
                        tree: [{},{},{},{}]
                    };
					if ($scope.content.componentName != 'grid3333') return;
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
