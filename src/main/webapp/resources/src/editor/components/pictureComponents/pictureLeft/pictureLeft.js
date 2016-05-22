define(function(require) {
    return function(app) {
        app.directive('pictureLeft', function() {
            return {
				scope: true,
                restrict: 'E',
                templateUrl: require.toUrl('./pictureLeft.html'),
                replace: true,
				controller: ['$scope',
                    function($scope) {
						$scope.content=$scope.$parent.item;
                    }
                ],
                link: function($scope, element, attrs) {
                    var parent = element.parent()[0];
					parent.content = $scope.content = $scope.content || {
                        componentName: 'pictureLeft',
                        component: [{
							imgSrc:'',
                            children: [{
                                text: []
                            }]
                        }]
                    };

                    $scope.add = function(index) {
                        $scope.content.component.splice(index + 1, 0,{
							imgSrc:'',
                            children: [{
                                text: []
                            }]
                        });
                    };
                    $scope.addChild = function(index, arr) {
                        arr.splice(index + 1, 0, {});
                    };
                    $scope.remove = function(index) {
                        $scope.content.component.splice(index, 1);
                    };
					$scope.removeChild = function(index, arr, parentIndex) {
                        arr.splice(index, 1);
                        if (!arr.length) {
							$scope.content.component.splice(parentIndex, 1);
                        }
                    }
                }
            };
        });
    }
})
