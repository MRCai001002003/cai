define(function(require) {
    return function(app) {
        app.directive('grid444', function() {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: require.toUrl('./grid444.html'),
                replace: true,
				controller: ['$scope',
                    function($scope) {
						$scope.content=$scope.$parent.item;
                    }
                ],
                link: function($scope, element) {
                    //					树结构 = {
                    //                        componentName: 'grid444',
                    //                        tree: [{
                    //							下一级树
                    //						},{},{}...]
                    //                    };
                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'grid444',
                        tree: [{},{},{}]
                    };
					if ($scope.content.componentName != 'grid444') return;
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
