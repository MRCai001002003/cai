define(function(require) {
    //加载框架
    var angular = require('angular');
    require('ui.router');
    require('angular.animate');
    require('angular.sanitize');
    require('angular.messages');



    //初始化
    var app = angular.module("app", ['ui.router', 'ngSanitize', 'ngAnimate','ngMessages']);
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider) {
            //未登录拦截
            //$httpProvider.interceptors.push('logoutInterceptor');


            //配置路由
            $urlRouterProvider.when('', '/home');

            $stateProvider.state("home", {
                url: '/home',
                templateUrl: require.toUrl('./pages/home/home.html'),
                controller: 'homeControl'
            }).state('register', {
                url: '/register',
                templateUrl: require.toUrl('./pages/register/register.html'),
                controller: 'registerControl'
            }).state('registerInfo', {
                url: '/registerInfo',
                templateUrl: require.toUrl('./pages/registerInfo/registerInfo.html'),
                controller: 'registerInfoControl'
            }).state('registed', {
                url: '/registed',
                templateUrl: require.toUrl('./pages/registed/registed.html'),
                controller: 'registedControl'
            })
        }
    ]);

    require('./pages/service')(app);
    //    //    加载指令
    require('./pages/filter')(app);
    //
    require('./pages/directive')(app);
    //
    //    //加载控制器

    require('./pages/home/home')(app);
    require('./pages/register/register')(app);
    require('./pages/registerInfo/registerInfo')(app);
    require('./pages/registed/registed')(app);

    //启动应用
    angular.element(document).ready(function() {
        var alertEle = document.getElementById('alert');
        var alertEleOldClassName = alertEle.className;
        var isAlert = false;
        var alertCallback = null;
        window.alert = function(msg, callback) {
            alertEle.style.display = 'block';
            setTimeout(function() {
                alertEle.className = alertEleOldClassName + ' modal-show';
                isAlert = true;
            }, 0);
            alertEle.getElementsByTagName('p')[0].innerText = msg;
            alertCallback = callback;
        };
        alertEle.getElementsByTagName('button')[0].onclick = function() {
            isAlert = false;
            alertEle.className = alertEleOldClassName;
            alertCallback && alertCallback();
            alertCallback = null;
        };

        function hide() {
            if (!isAlert) {
                alertEle.style.display = 'none';
            }
        }
        alertEle.addEventListener('webkitTransitionEnd', hide);
        alertEle.addEventListener('transitionend', hide);

        var bodyEle = document.body;
        window.prompt = function(msg) {
            var promptObj = document.createElement('div');
            bodyEle.appendChild(promptObj);
            promptObj.className = 'prompt-msg';
            promptObj.innerHTML = '<div class="prompt"><p class="text-overflow fl"></p></div>';
            var msgBox = promptObj.getElementsByTagName('p')[0];
            var msgDiv = promptObj.getElementsByTagName('div')[0];
            msgBox.innerText = msg;
            var width = msgBox.offsetWidth;
            msgDiv.style.width = width + 'px';
            msgDiv.style.marginLeft = width / -2 + 'px';

            function hide() {
                bodyEle.removeChild(promptObj);
                promptObj = msgBox = msgDiv = null;
            }
            promptObj.addEventListener('webkitAnimationEnd', hide);
            promptObj.addEventListener('animationend', hide);
        };



        var ele = document.getElementById('page-wrap');
        app.run(['$rootScope', '$location', '$state',

            function($rootScope, $location, $state) {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    var animateObj = {
                        home: {
                            register: 'slideInRight slideOutLeft'
                        },
                        register: {
                            home: 'slideInLeft slideOutRight',
                            registerInfo: 'slideInRight slideOutLeft'
                        },
                        registerInfo: {
                            register: 'slideInLeft slideOutRight',
                            registed: 'slideInRight slideOutLeft',
                        },
                        registed: {
                            registerInfo: 'slideInLeft slideOutRight'
                        }
                    };
                    var animateClass = animateObj[fromState.name] || '';
                    animateClass = animateClass[toState.name] || '';
                    ele.className = 'page-wrap animated ui-view-container ' + animateClass;
                });
            }
        ]);
        //console.log(app);
        angular.bootstrap(document, ['app']);
    })
})
