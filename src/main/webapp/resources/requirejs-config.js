require.config({
    baseUrl: '/CMS/resources/src/',
    paths: {
        'angular': '../library/angular/angular.min',
        'ui.router': '../library/angular-ui-router/release/angular-ui-router.min',
		'angular.animate':'../library/angular-animate/angular-animate.min',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui.router': ['angular'],
        'angular.animate': ['angular'],
    }
});
require(['bootstrap']);
