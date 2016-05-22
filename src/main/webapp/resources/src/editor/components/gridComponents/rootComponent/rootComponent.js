define(function(require) {
    return function(app) {
        app.directive('rootComponent', ['$compile',
            function($compile) {
                return {
                    scope: true,
                    restrict: 'E',
                    templateUrl: require.toUrl('./rootComponent.html'),
                    replace: true,
                    controller: ['$scope',
                        function($scope) {
                            $scope.content = $scope.$parent.content;
                        }
                    ]
                };
            }
        ]);
    }
})
