define(function() {
    return function(app) {
        app.controller('homeControl', ['$scope', '$http', 'searchCache', 'attentionChanged', 'baseUrl', 'wxShare', 'hotWordsCache',
            function($scope, $http, searchCache, attentionChanged, baseUrl, wxShare, hotWordsCache) {
                wxShare.set({
                    desc: '【首页】'
                });
                $scope.attentionInfo = attentionChanged.get(function(bool) {
                    $scope.attentionInfo = bool;
                })
                searchCache.clean();

                $scope.hotWords = [];
                var hotWordsIndex = 0;
                $http({
                    url: baseUrl.baseUrl + 'weixin/getHotWords',
                    method: 'get'
                }).success(function(data) {
                    if (data.success) {
                        $scope.hotList = data;
                        $scope.changeSet();
                    }
                })
                $scope.changeSet = function() {
                    $scope.hotWords = $scope.hotList.data.slice(hotWordsIndex * 6, (hotWordsIndex + 1) * 6);
                    hotWordsCache.set($scope.hotWords);
                    hotWordsIndex++;
                    hotWordsIndex %= Math.ceil($scope.hotList.data.length / 6);
                };
                $http({
                    url: baseUrl.baseUrl + 'weixin/contentIndex',
                    method: 'get'
                }).success(function(data) {
                    if (data.success) {
                        data.data.length = 4;
                    }
                    $scope.extraList = data;
                })
            }
        ])
    }
})
