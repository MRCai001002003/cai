define(function(require) {
    return function(app) {
        app.directive('blockComponent', function() {
            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                replace: true,
                templateUrl: require.toUrl('./blockComponent.html')
            }
        })
    }
})
