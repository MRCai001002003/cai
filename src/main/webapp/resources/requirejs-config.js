require.config({
    baseUrl: '../resources/dist/',
    paths: {
        'angular': '../library/angular/angular.min',
        'ui.router': '../library/angular-ui-router/release/angular-ui-router.min',
        'angular.animate': '../library/angular-animate/angular-animate.min',
        'angular.sanitize': '../library/angular-sanitize/angular-sanitize.min',
		'angular.validate':'../library/angular-w5c-validator/w5cValidator.min',
        'iScroll': '../library/iscroll/build/iscroll-probe.min',
        'hammer': '../library/hammerjs/hammer.min',
		'wxSDK': 'https://res.wx.qq.com/open/js/jweixin-1.0.0',
		'd3':'../library/d3/d3.min'
    },
    urlArgs: 't=20160425',// + (new Date).getTime(),
    shim: {
        'angular': {
            exports: 'angular'
        },
        'iScroll': {
            exports: 'IScroll'
        },
        'hammer': {
            exports: 'Hammer'
        },
        'ui.router': ['angular'],
        'angular.animate': ['angular'],
        'angular.sanitize': ['angular'],
        'angular.validate': ['angular']
    }
});
