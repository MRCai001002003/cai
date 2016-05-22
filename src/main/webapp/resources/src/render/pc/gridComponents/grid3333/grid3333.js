define(function(require) {
    return function(app) {
        app.directive('grid3333', function() {
            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                replace: true,
                templateUrl: require.toUrl('./grid3333.html')
            }
        })
    }
})
