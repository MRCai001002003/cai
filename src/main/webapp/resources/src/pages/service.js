define(function(require) {
    var wxSDK = require('wxSDK');

    wxSDK.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx86d57a1e8ff79a41', // 必填，公众号的唯一标识 正式
        //        appId: 'wx9ce9166d0a82b891', // 必填，公众号的唯一标识 测试
        timestamp: 12131, // 必填，生成签名的时间戳
        nonceStr: 'nonceStr', // 必填，生成签名的随机串(zxlhliaojie,fddsads)
        signature: '7ED3536C52B4C257F32C711E889036F42F0D9BC6', // 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    return function(app) {
        app.service('wxShare', function() {
            var obj = {
                title: '了解企业信用信息',
                link: location.href,
                imgUrl: require.toUrl('../images/app-logo.png'),
                desc: '“了解”系“正信用”品牌旗下一款移动应用产品，主要将工商注册、失信、行政处罚等信息进行有机聚合，为金融、法律、咨询等行业提供企业信用信息查询、关注和分享等功能。有效降低经营成本、提高工作效率。',
                success: function() {
                    //alert('分享成功');
                },
                cancel: function() {
                    //alert('你取消了分享');
                }
            };
            this.set = function(arg) {
                for (var name in arg) {
                    obj[name] = arg[name];
                }
                //分享到朋友圈
                wxSDK.onMenuShareTimeline(obj);
                //分享给朋友
                wxSDK.onMenuShareAppMessage(obj);
                //分享到QQ
                wxSDK.onMenuShareQQ(obj);
                //分享到腾讯微博
                wxSDK.onMenuShareWeibo(obj);
                //分享到QQ空间
                wxSDK.onMenuShareQZone(obj);
            };
        });
        app.service('baseUrl', function() {
            this.baseUrl = '/Zheng/';
        });
        app.service('companyCache', ['$stateParams', '$state',
            function($stateParams, $state) {
                var companyCacheAmount = 5;
                var companyObj = {};
                var index = 11;
                this.get = function() {
                    var key = $state.current.name;
                    if (key == 'companyDetail') key = 'companyHome';
                    for (var min = index - companyCacheAmount; min < index; min++) {
                        var company = companyObj[min];
                        if (!company) continue;
                        if ($stateParams.corpId && $stateParams.corpId === company.corpId) {
                            return company[key]
                        } else if ($stateParams.corpName && $stateParams.corpName === company.corpName) {
                            return company[key];
                        }
                    }
                };
                this.set = function(value) {
                    var key = $state.current.name;
                    if (key == 'companyDetail') key = 'companyHome';
                    for (var min = index - companyCacheAmount; min < index; min++) {
                        var company = companyObj[min];
                        if (!company) continue;
                        if (company.corpId && company.corpId === $stateParams.corpId) {
                            company[key] = value;
                            return;
                        } else if (company.corpName && company.corpName === $stateParams.corpName) {
                            company[key] = value;
                            return;
                        }
                    }
                    if (!$stateParams.corpId && !$stateParams.corpName) return;
                    companyObj[index] = {
                        corpId: $stateParams.corpId,
                        corpName: $stateParams.corpName
                    };
                    companyObj[index][key] = value;
                    companyObj[index - companyCacheAmount] = null;
                    delete companyObj[index - companyCacheAmount];
                    index++;
                };
                this.clean = function() {
                    companyObj = {};
                };
                this.cleanItem = function() {
                    for (var min = index - companyCacheAmount; min < index; min++) {
                        var company = companyObj[min];
                        if (!company) continue;
                        if ($stateParams.corpId && $stateParams.corpId === company.corpId) {
                            companyObj[min] = undefined;
                        } else if ($stateParams.corpName && $stateParams.corpName === company.corpName) {
                            companyObj[min] = undefined;
                        }
                    }
                }
            }
        ]);
        app.service('attentionChanged', ['$http', 'baseUrl', 'inviteCode',
            function($http, baseUrl, inviteCode) {
                var attentionInfo;
                this.get = function(callback) {
                    if (attentionInfo === undefined) {
                        $http({
                            url: baseUrl.baseUrl + 'user/focuson/wxCorpchange',
                            method: 'get'
                        }).success(function(data) {
                            if (data && data.success && data.data) {
                                inviteCode.set(data.data.selfInviteCode)
                                attentionInfo = data.data.isChanged;
                                callback && callback(attentionInfo);
                                callback = null;
                            }
                        })
                    };
                    return false;
                };
                this.checked = function() {
                    attentionInfo = false;
                };
            }
        ]);
        app.service('inviteCode', function() {
            var inviteCode = '';
            this.set = function(arg) {
                inviteCode = arg;
            };
            this.get = function() {
                return inviteCode;
            }
        });
        app.service('attention', ['$http', '$stateParams', 'baseUrl',
            function($http, $stateParams, baseUrl) {
                var isAttention = {};
                this.get = function(callback) {
                    for (var name in $stateParams) {
                        if (isAttention[$stateParams[name]] !== undefined) {
                            return isAttention[$stateParams[name]];
                        }
                    }
                    if (!callback) return;
                    $http({
                        url: baseUrl.baseUrl + 'user/findIsAttention',
                        method: 'get',
                        params: {
                            corp_id: $stateParams.corpId,
                            corp_name: $stateParams.corpName
                        }
                    }).success(function(data) {
                        if (data.success) {
                            isAttention = !! data.data;
                            callback(isAttention);
                        }
                    })
                };
                this.set = function(arg) {
                    isAttention = {};
                    switch (arg) {
                        case 'false':
                            arg = false;
                            break;
                        case 'true':
                            arg = true;
                            break;
                    }
                    for (var name in $stateParams) {
                        isAttention[$stateParams[name]] = !! arg;
                    }
                };
            }
        ])
        app.service('searchCache', function() {
            var historyObj = {};
            this.set = function(obj) {
                for (var key in obj) {
                    historyObj[key] = obj[key];
                }
            };
            this.get = function() {
                return historyObj;
            };
            this.clean = function() {
                historyObj = {};
            }
        });
        app.service('browseTrace', function() {
            var arr = [];
            var trace = localStorage.getItem('trace');
            if (trace) {
                trace.replace(/[^|]+/g, function(str) {
                    var obj = {};
                    str.replace(/[^&]+/g, function(str) {
                        str = str.split('=');
                        obj[str[0]] = str[1];
                    })
                    arr.push(obj);
                })
            };

            function save() {
                if (arr.length > 10) arr.length = 10;
                var tempArr = [];
                for (var i = 0; i < arr.length; i++) {
                    tempArr[i] = (function(obj) {
                        var arr = [];
                        for (var key in obj) {
                            if (obj[key] !== '') {
                                arr.push(key + '=' + obj[key]);
                            }
                        }
                        return arr.join('&');
                    })(arr[i])
                }
                localStorage.setItem('trace', tempArr.join('|'))
            }
            var data = {
                data: {
                    list: arr
                },
                success: true,
                msg: '历史记录获取成功'
            };
            this.get = function() {
                data.data.list = arr;
                return data;
            };
            this.add = function(obj) {
                for (var i = 0; i < arr.length; i++) {
                    if (obj.corp_id == arr[i].corp_id) {
                        arr.unshift(arr.splice(i, 1)[0]);
                        save();
                        return;
                    }
                }
                arr.unshift(obj);
                save();
            };
            this.clean = function() {
                arr = [];
                localStorage.removeItem('trace');
            }
        })
        app.factory('logoutInterceptor', ['$q',
            function($q) {
                var progressBar = document.getElementById('progress-bar');
                var interceptor = {
                    request: function(config) {
                        progressBar.style.display = 'block';
                        return config;
                    },
                    response: function(response) {
                        progressBar.style.display = 'none';
                        if (typeof response.data === 'object') {
                            if (/未登录/.test(response.data.msg)) {
                                location.replace('#/login')
                                return {};
                            }
                        }
                        return response;
                    },
                    requestError: function(rejection) {
                        return $q.reject(rejection);
                    },
                    responseError: function(rejection) {
                        return rejection
                    }
                }
                return interceptor;
            }
        ]);
        app.service('hotWordsCache', function() {
            var cache = [];
            this.set = function(arg) {
                cache = arg;
            };
            this.get = function() {
                return cache;
            }
        })
    }
})
