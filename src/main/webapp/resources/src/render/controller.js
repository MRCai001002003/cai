define(function() {
    return function(app) {
        app.controller('renderController', ['$scope', '$http', '$location', 'baseUrl',
            function($scope, $http, $location, baseUrl) {
                var sourceId = $location.search().id;
                if (sourceId == 'localSource') {
                    var obj = JSON.parse(localStorage.getItem('article'));
                    $scope.tree = obj.content;
                    $scope.type = obj.type;
                    $scope.title = obj.title;
                    $scope.source = obj.source;
                } else {
                    $http({
                        url: baseUrl.baseUrl + 'system/content/filter/queryContentById_async',
                        method: 'get',
                        params: {
                            id: sourceId
                        }
                    }).success(function(data) {
                        if (data.success) {
                            $scope.tree = data.data.contentObj;
                            $scope.type = data.data.type;
                            $scope.title = data.data.title;
                            $scope.source = data.data.source;
                        }
                    })
                }
            }
        ]);
        app.controller('navbarController', ['$scope', '$http', 'baseUrl',
            function($scope, $http, baseUrl) {
                $http({
                    url: baseUrl.baseUrl + 'system/user/getSysUserRealName_async',
                    method: 'get'
                }).success(function(data) {
                    $scope.data = data;
                })
            }
        ])
    }
})
