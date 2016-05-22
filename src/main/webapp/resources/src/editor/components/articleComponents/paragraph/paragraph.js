define(function(require) {
    return function(app) {
        app.directive('paragraph', function() {
            return {
                scope:true,
                restrict: 'E',
                templateUrl: require.toUrl('./paragraph.html'),
                replace: true,
				controller: ['$scope',
                    function($scope) {
						$scope.content=$scope.$parent.item;
                    }
                ],
                link: function($scope, element) {
                    //					树结构={
                    //						componentName:'paragraph',
                    //						component:[{
                    //							下一级树
                    //						}]
                    //					}
                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'paragraph',
                        component: [{}]
                    };
                    if ($scope.content.componentName != 'paragraph') return;
                    $scope.add = function(index) {
                        $scope.content.component.splice(index + 1, 0, {});
                    };
                    $scope.remove = function(index) {
                        $scope.content.component.splice(index, 1);
                    };
                }
            };
        });
    }
})
