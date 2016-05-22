define(function() {
    return function(app) {
        app.filter('toHtml', function() {
            return function(oldValue) {
                if (!oldValue) return '';
                return oldValue.join('');
            }
        })
    }
})
