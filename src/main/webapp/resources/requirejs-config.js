require.config({
    baseUrl: '/CMS/resources/src/',
    paths: {
        'jquery': '../library/jquery/dist/jquery.min',
        'angular': '../library/angular/angular.min',
        'ui.router': '../library/angular-ui-router/release/angular-ui-router.min',
        'ui.tree': '../library/angular-ui-tree/dist/angular-ui-tree.min',
		'angular.animate':'../library/angular-animate/angular-animate.min',
        'bootstrap': '../library/bootstrap/dist/js/bootstrap.min',
        'jquery.validate': '../library/jquery-validation/dist/jquery.validate.min'
    },
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'ui.router': ['angular'],
        'ui.tree': ['angular'],
        'angular.animate': ['angular'],
        'bootstrap': ['jquery'],
        'angular.validate': ['angular'],
        'jquery.validate': ['jquery']
    }
});
require(['bootstrap']);
