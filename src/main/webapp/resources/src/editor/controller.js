define(function(require) {
    var angular = require('angular');
    return function(app) {
        app.controller('editorControl', ['$scope', '$http', '$location', 'baseUrl',
            function($scope, $http, $location, baseUrl) {
                var articleId = $location.search().id;
                $scope.content = {
                    componentName: 'rootComponent',
                    tree: [{}]
                };
                //return;
                if (articleId == 'localSource') {
                    var obj = JSON.parse(localStorage.getItem('article'));
                    $scope.content.tree = obj.content;
                    $scope.type = obj.type;
                    $scope.title = obj.title;
                    $scope.source = obj.source;
                } else if (articleId) {
                    $http({
                        url: baseUrl.baseUrl + 'system/content/filter/queryContentById_async',
                        method: 'get',
                        params: {
                            id: articleId
                        }
                    }).success(function(data) {
                        if (data.success) {
                            $scope.content.tree = data.data.contentObj;
                            $scope.type = data.data.type;
                            $scope.title = data.data.title;
                            $scope.source = data.data.source;
                        }
                    })
                }

                $scope.save = function() {
                    $http({
                        url: baseUrl.baseUrl + 'system/content/filter/saveOrUpdateContent_async',
                        method: 'post',
                        data: {
                            content: $scope.tree,
                            title: $scope.title,
                            type: $scope.type,
                            source: $scope.source,
                            id: articleId
                        },
                        headers: {
                            'Content-Type': 'application/json;'
                        }
                    }).success(function(data) {
                        alert(data.msg);
                    })
                };
                $scope.show = function() {
                    localStorage.setItem('article', JSON.stringify({
                        content: $scope.tree,
                        title: $scope.title,
                        type: $scope.type,
                        source: $scope.source
                    }));
                };
            }
        ]);
        //        app.controller('navbarController', ['$scope', '$http', 'baseUrl',
        //            function($scope, $http, baseUrl) {
        //                $http({
        //                    url: baseUrl.baseUrl + 'system/user/getSysUserRealName_async',
        //                    method: 'get'
        //                }).success(function(data) {
        //                    $scope.data = data;
        //                })
        //            }
        //        ])
    }
})
