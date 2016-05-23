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
            }).state("query", {
                url: '/query?searchType',
                templateUrl: require.toUrl('./pages/query/query.html'),
                controller: 'queryControl',
            }).state('companyHome', {
                url: '/companyHome?corpId?corpName',
                templateUrl: require.toUrl('./pages/companyHome/companyHome.html'),
                controller: 'companyHomeControl'
            }).state('recordsTransferInfo', {
                url: '/recordsTransferInfo?corpId?corpName',
                templateUrl: require.toUrl('./pages/recordsTransferInfo/recordsTransferInfo.html'),
                controller: 'recordsTransferInfoControl'
            }).state('negativeInfo', {
                url: '/negativeInfo?corpId?corpName',
                templateUrl: require.toUrl('./pages/negativeInfo/negativeInfo.html'),
                controller: 'negativeInfoControl'
            }).state('lawsuit', {
                url: '/lawsuit?corpId?corpName',
                templateUrl: require.toUrl('./pages/lawsuit/lawsuit.html'),
                controller: 'lawsuitControl'
            }).state('seeminglyRelevance', {
                url: '/seeminglyRelevance?corpId?corpName',
                templateUrl: require.toUrl('./pages/seeminglyRelevance/seeminglyRelevance.html'),
                controller: 'seeminglyRelevanceControl'
            }).state('companyDetail', {
                url: '/companyDetail?corpId?corpName',
                templateUrl: require.toUrl('./pages/companyDetail/companyDetail.html'),
                controller: 'companyDetailControl'
            }).state('shareholderInfo', {
                url: '/shareholderInfo?corpId?corpName',
                templateUrl: require.toUrl('./pages/shareholderInfo/shareholderInfo.html'),
                controller: 'shareholderInfoControl'
            }).state('leaderInfo', {
                url: '/leaderInfo?corpId?corpName',
                templateUrl: require.toUrl('./pages/leaderInfo/leaderInfo.html'),
                controller: 'leaderInfoControl'
            }).state('embranchment', {
                url: '/embranchment?corpId?corpName',
                templateUrl: require.toUrl('./pages/embranchment/embranchment.html'),
                controller: 'embranchmentControl'
            }).state('companyComment', {
                url: '/companyComment?corpId?corpName',
                templateUrl: require.toUrl('./pages/companyComment/companyComment.html'),
                controller: 'companyCommentControl'
            }).state('recruit', {
                url: '/recruit?corpId?corpName',
                templateUrl: require.toUrl('./pages/recruit/recruit.html'),
                controller: 'recruitControl'
            }).state('personalInfo', {
                url: '/personalInfo?keyword',
                templateUrl: require.toUrl('./pages/personalInfo/personalInfo.html'),
                controller: 'personalInfoControl'
            }).state('attentionInfo', {
                url: '/attentionInfo',
                templateUrl: require.toUrl('./pages/attentionInfo/attentionInfo.html'),
                controller: 'attentionInfoControl'
            }).state('userCenter', {
                url: '/userCenter',
                templateUrl: require.toUrl('./pages/userCenter/userCenter.html'),
                controller: 'userCenterControl'
            }).state('appeal', {
                url: '/appeal',
                templateUrl: require.toUrl('./pages/appeal/appeal.html'),
                controller: 'appealControl'
            }).state('changePassword', {
                url: '/changePassword',
                templateUrl: require.toUrl('./pages/changePassword/changePassword.html'),
                controller: 'changePasswordControl'
            }).state('appShare', {
                url: '/appShare',
                templateUrl: require.toUrl('./pages/appShare/appShare.html')
            }).state('mianZeShengMin', {
                url: '/mianZeShengMin',
                templateUrl: require.toUrl('./pages/mianZeShengMin/mianZeShengMin.html')
            }).state('login', {
                url: '/login',
                templateUrl: require.toUrl('./pages/login/login.html'),
                controller: 'loginControl'
            }).state('register', {
                url: '/register',
                templateUrl: require.toUrl('./pages/register/register.html'),
                controller: 'registerControl'
            }).state('passwordForget', {
                url: '/passwordForget',
                templateUrl: require.toUrl('./pages/passwordForget/passwordForget.html'),
                controller: 'passwordForgetControl'
            }).state('creditReport', {
                url: '/creditReport?corpId?corpName',
                templateUrl: require.toUrl('./pages/creditReport/creditReport.html'),
                controller: 'creditReportControl'
            }).state('surroundRent', {
                url: '/surroundRent?corpId?corpName',
                templateUrl: require.toUrl('./pages/surroundRent/surroundRent.html'),
                controller: 'surroundRentControl'
            }).state('corpFamily', {
                url: '/corpFamily?corpId?corpName',
                templateUrl: require.toUrl('./pages/corpFamily/corpFamily.html')
            }).state('article', {
                url: '/article?id',
                templateUrl: require.toUrl('./pages/article/article.html'),
                controller: 'articleControl'
            }).state('personalQuery', {
                url: '/personalQuery',
                templateUrl: require.toUrl('./pages/personalQuery/personalQuery.html'),
                controller: 'personalQueryControl'
            }).state('patent', {
                url: '/patent?corpId?corpName',
                templateUrl: require.toUrl('./pages/patent/patent.html'),
                controller: 'patentControl'
            }).state('patentDetail', {
                url: '/patentDetail?id',
                templateUrl: require.toUrl('./pages/patentDetail/patentDetail.html'),
                controller: 'patentDetailControl'
            }).state('copyright', {
                url: '/copyright?corpId?corpName',
                templateUrl: require.toUrl('./pages/copyright/copyright.html'),
                controller: 'copyrightControl'
            }).state('product', {
                url: '/product?corpId?corpName',
                templateUrl: require.toUrl('./pages/product/product.html'),
                controller: 'productControl'
            }).state('productDetail', {
                url: '/productDetail?id',
                templateUrl: require.toUrl('./pages/productDetail/productDetail.html'),
                controller: 'productDetailControl'
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
    require('./pages/query/query')(app);
    require('./pages/companyHome/companyHome')(app);
    require('./pages/negativeInfo/negativeInfo')(app);
    require('./pages/lawsuit/lawsuit')(app);
    require('./pages/seeminglyRelevance/seeminglyRelevance')(app);
    require('./pages/companyDetail/companyDetail')(app);
    require('./pages/recruit/recruit')(app);
    // require('./pages/shareholderInfo/shareholderInfo')(app);
    require('./pages/companyComment/companyComment')(app);
    require('./pages/attentionInfo/attentionInfo')(app);
    require('./pages/userCenter/userCenter')(app);
    require('./pages/personalInfo/personalInfo')(app);
    require('./pages/recordsTransferInfo/recordsTransferInfo')(app);
    require('./pages/leaderInfo/leaderInfo')(app);
    require('./pages/embranchment/embranchment')(app);
    require('./pages/changePassword/changePassword')(app);
    require('./pages/appeal/appeal')(app);
    require('./pages/login/login')(app);
    require('./pages/register/register')(app);
    require('./pages/passwordForget/passwordForget')(app);
    require('./pages/creditReport/creditReport')(app);
    require('./pages/surroundRent/surroundRent')(app);
    require('./pages/article/article')(app);
    require('./pages/personalQuery/personalQuery')(app);
    require('./pages/patent/patent')(app);
    require('./pages/patentDetail/patentDetail')(app);
    require('./pages/copyright/copyright')(app);
    require('./pages/product/product')(app);
    require('./pages/productDetail/productDetail')(app);
    //    require('./pages/corpFimily/corpFimily')(app);


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
