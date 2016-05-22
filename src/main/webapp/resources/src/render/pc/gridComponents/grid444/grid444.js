define(function(require) {
    return function(app) {
        app.directive('grid444', function() {
            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                replace: true,
                templateUrl: require.toUrl('./grid444.html')
            }
        })
    }
})
