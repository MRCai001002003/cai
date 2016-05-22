define(function() {
    return function(app) {
        app.factory('baseUrl', function() {
            return {
                baseUrl: '/xj-sys/'
            }
        });
        app.factory('httpResponsePermissionInterceptor', ['$q', '$location',
            function($q, $location) {
                return function(promise) {
                    return promise.then(function(response) {
                        return response;
                    }, function(response) {
                        if (response.status === 403 || response.status === 401) {
                            $location.path('/home');
                            return $q.reject(response);
                        }
                        return $q.reject(response);
                    });
                };
            }
        ]);
        app.factory('logoutInterceptor', ['$q',
            function($q) {
                var interceptor = {
                    'request': function(config) {
                        return config;
                    },
                    'response': function(response) {
                        if (typeof response.data === 'object') {
                            if (response.data.msg == '请登录') {
                                location.href = './login';
                                return;
                            }
                        }
                        return response;
                    },
                    'requestError': function(rejection) {
                        return $q.reject(rejection);
                    },
                    'responseError': function(rejection) {
                        return rejection
                    }
                }
                return interceptor;
            }
        ])
    }
})
