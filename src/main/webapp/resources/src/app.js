define(function(require) {
    //加载框架
    var angular = require('angular');
    require('ui.router');
    require('angular.animate');
    require('angular.sanitize');



    //初始化
    var app = angular.module("app", ['ui.router', 'ngSanitize', 'ngAnimate']);
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider) {
            //未登录拦截
            $httpProvider.interceptors.push('logoutInterceptor');


            //配置路由
            $urlRouterProvider.when('', '/home');

            $stateProvider.state("home", {
                url: '/home',
                templateUrl: require.toUrl('./pages/home/home.html'),
                controller: 'homeControl'
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
        app.run(['$rootScope', '$location', '$state', 'inviteCode',

            function($rootScope, $location, $state, inviteCode) {
                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    if (!inviteCode.get()) {
                        inviteCode.set($location.search().inviteCode || '');
                    }
                    var animateObj = {
                        home: {
                            query: 'zoomOut slideInRight',
                            attentionInfo: 'zoomOut zoomIn',
                            userCenter: 'zoomOut zoomIn',
                            companyHome: 'slideInRight slideOutLeft',
                            article: 'slideInRight slideOutLeft',
                            personalQuery: 'slideInRight slideOutLeft'
                        },
                        personalQuery: {
                            home: 'slideInLeft slideOutRight',
                            personalInfo: 'slideInRight slideOutLeft'
                        },
                        article: {
                            home: 'slideOutRight slideInLeft',
                            companyHome: 'slideOutLeft slideInRight'
                        },
                        attentionInfo: {
                            home: 'zoomOut zoomIn',
                            userCenter: 'zoomOut zoomIn',
                            companyHome: 'slideInRight slideOutLeft'
                        },
                        userCenter: {
                            home: 'zoomOut zoomIn',
                            attentionInfo: 'zoomOut zoomIn',
                            changePassword: 'slideOutLeft slideInRight',
                            appeal: 'slideOutLeft slideInRight',
                            appShare: 'slideOutLeft slideInRight',
                            mianZeShengMin: 'slideOutLeft slideInRight'
                        },
                        changePassword: {
                            userCenter: 'slideOutRight slideInLeft'
                        },
                        appeal: {
                            userCenter: 'slideOutRight slideInLeft'
                        },
                        appShare: {
                            userCenter: 'slideOutRight slideInLeft'
                        },
                        mianZeShengMin: {
                            userCenter: 'slideOutRight slideInLeft'
                        },
                        query: {
                            home: 'slideOutRight zoomIn',
                            companyHome: 'slideInRight slideOutLeft'
                        },
                        personalInfo: {
                            personalQuery: 'slideOutRight slideInLeft'
                        },
                        companyHome: {
                            query: 'slideOutRight slideInLeft',
                            recordsTransferInfo: 'slideOutLeft slideInRight',
                            negativeInfo: 'slideOutLeft slideInRight',
                            lawsuit: 'slideOutLeft slideInRight',
                            seeminglyRelevance: 'slideOutLeft slideInRight',
                            companyDetail: 'slideOutLeft slideInRight',
                            shareholderInfo: 'slideOutLeft slideInRight',
                            patent: 'slideOutLeft slideInRight',
                            copyright: 'slideOutLeft slideInRight',
                            product: 'slideOutLeft slideInRight',
                            leaderInfo: 'slideOutLeft slideInRight',
                            embranchment: 'slideOutLeft slideInRight',
                            recruit: 'slideOutLeft slideInRight',
                            companyComment: 'zoomOut fadeInUp',
                            attentionInfo: 'slideOutRight slideInLeft',
                            creditReport: 'zoomOut fadeInUp',
                            surroundRent: 'slideOutLeft slideInRight',
                            corpFamily: 'slideOutLeft slideInRight',
                            home: 'slideOutRight slideInLeft',
                            article: 'slideOutRight slideInLeft'
                        },
                        patent: {
                            companyHome: 'slideOutRight slideInLeft',
                            patentDetail: 'slideOutLeft slideInRight'
                        },
                        patentDetail: {
                            patent: 'slideOutRight slideInLeft'
                        },
                        copyright: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        product: {
                            companyHome: 'slideOutRight slideInLeft',
                            productDetail: 'slideOutLeft slideInRight',
                        },
                        productDetail: {
                            product: 'slideOutRight slideInLeft'
                        },
                        recordsTransferInfo: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        negativeInfo: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        lawsuit: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        seeminglyRelevance: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        companyDetail: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        shareholderInfo: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        leaderInfo: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        embranchment: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        recruit: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        companyComment: {
                            companyHome: 'fadeOutDown zoomIn'
                        },
                        register: {
                            home: 'fadeOutDown zoomIn'
                        },
                        creditReport: {
                            companyHome: 'fadeOutDown zoomIn'
                        },
                        surroundRent: {
                            companyHome: 'slideOutRight slideInLeft'
                        },
                        corpFamily: {
                            companyHome: 'slideOutRight slideInLeft'
                        }
                    };
                    if (fromState.name === 'login') {
                        animateClass = 'zoomOut fadeInUp';
                    } else if (toState.name === 'login') {
                        animateClass = 'fadeOut zoomIn';
                    } else {
                        var animateClass = animateObj[fromState.name] || '';
                        animateClass = animateClass[toState.name] || '';
                    }
                    ele.className = 'page-wrap animated ui-view-container ' + animateClass;
                });
            }
        ]);
		//console.log(app);
        angular.bootstrap(document, ['app']);
    })
})
