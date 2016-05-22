define(function(require) {
    return function(app) {
        app.directive('jumbotron', function() {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: require.toUrl('./jumbotron.html'),
                replace: true,
                controller: ['$scope',
                    function($scope) {
                        $scope.content = $scope.$parent.item;
                    }
                ],
                link: function($scope, element, attrs) {
                    //					树结构={
                    //                        componentName: 'jumbotron',
                    //                        component: [{
                    //							smallTitle:[],
                    //							children:[{}]
                    //						}]
                    //					}
                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'jumbotron',
                        component: [{
                            title: [],
                            children: [{
                                text: []
                            }],
                            button:[]
                        }]
                    };

                    $scope.add = function(index) {
                        $scope.content.component.splice(index + 1, 0, {
                            title: [],
                            children: [{
                                text: []
                            }],
                            button:[]
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
