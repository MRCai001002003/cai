define(function(require) {
    return function(app) {
        app.directive('listUl', function() {
            return {
                scope: {
                    content: '='
                },
                restrict: 'E',
                replace: true,
                templateUrl: require.toUrl('./listUl.html'),
            }
        })
    }
})
