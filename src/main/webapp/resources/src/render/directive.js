define(function() {
    return function(app) {
        app.directive('component', ['$compile',
            function($compile) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var componentName = (attrs.component || '').replace(/([A-Z])/g, '-$1');
                        if (!componentName) return;
                        var ele = $compile('<' + componentName + '></' + componentName + '>')($scope);
                        element.append(ele);
                    }
                }
            }
        ]);
    }
})
