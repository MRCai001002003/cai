define(function(require) {
    return function(app) {
        app.directive('paragraph', function() {
            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                replace: true,
                templateUrl: require.toUrl('./paragraph.html')
            }
        })
    }
})
