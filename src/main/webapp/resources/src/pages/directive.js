define(function(require) {
    var IScroll = require('iScroll');
    var Hammer = require('hammer');
    var angular = require('angular');
    var d3 = require('d3');
    var baseUrl = require('../common/js/baseUrl/baseUrl');
    return function(app) {
        app.directive('tap', function() {
            return function($scope, element, attrs, ctrl) {
                var hm = new Hammer(element[0]);
                hm.on('tap', function() {
                    $scope.$apply(attrs.tap);
                    if (element.attr('href') && element.attr('href') != 'javascript:;') {
                        location.href = attrs.href;
                    }
                })
            }
        });
        app.directive('articleHtml', ['$parse',
            function($parse) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var ele = element[0];
                        ele.innerHTML = $parse(attrs.articleHtml)($scope) || '';
                        var images = ele.getElementsByTagName('img');
                        for (var i = 0; i < images.length; i++) {
                            images[i].onload = images[i].onerror = function() {
                                $scope.$parent.updateHeightState = Math.random();
                                $scope.$apply();
                            };
                        }
                    }
                }
            }
        ]);
        app.directive('validateForm', function() {
            return {
                restrict: 'A',
                require: '^?form',
                link: function($scope, element, attrs, formCtrl) {
                    var ele = element[0];
                    element.on('submit', function() {
                        var isApply = false;
                        for (var i = 0; i < ele.length; i++) {
                            var name = ele[i].name;
                            if (name && formCtrl[name]) {
                                if (formCtrl[name].$invalid) {
                                    isApply = true;
                                    formCtrl[name].$pristine = false;
                                }
                            }
                        }
                        if (isApply) {
                            $scope.$apply();
                        } else {
                            $scope.$apply(attrs.validateForm);
                        }
                        return false;
                    })
                }
            }
        });
        app.directive('doValidate', function() {
            return {
                restrict: 'A',
                require: '^?form',
                link: function($scope, element, attrs, formCtrl) {
                    var hm = new Hammer(element[0]);
                    hm.on('tap', function() {
                        var isApply = false;
                        var name = attrs.doValidate;
                        if (name && formCtrl[name]) {
                            if (formCtrl[name].$invalid) {
                                isApply = true;
                                formCtrl[name].$pristine = false;
                                element.attr('is-disabled', 'true');
                            } else {
                                element.attr('is-disabled', 'false');
                            }
                        }
                        if (isApply) {
                            $scope.$apply();
                            return false;
                        }
                    })
                }
            }
        })
        app.directive("repeatKey", function() {
            return {
                require: "ngModel",
                link: function(scope, elem, attrs, ctrl) {
                    var otherInput = elem.inheritedData("$formController")[attrs.repeatKey];

                    ctrl.$parsers.push(function(value) {
                        if (value === otherInput.$viewValue) {
                            ctrl.$setValidity("repeatKey", true);
                            return value;
                        }
                        ctrl.$setValidity("repeatKey", false);
                    });

                    otherInput.$parsers.push(function(value) {
                        ctrl.$setValidity("repeatKey", value === ctrl.$viewValue);
                        return value;
                    });
                }
            };
        })

        app.directive('isNewYear', ['$rootScope', '$parse',
            function($rootScope, $parse) {
                var oldYear;
                var timer = null;

                function isNewYear(timeNumber) {
                    if (!timeNumber || typeof timeNumber != 'number') return false;
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        oldYear = undefined;
                    }, 0);
                    var date = new Date();
                    date.setTime(timeNumber);
                    var nowYear = date.getFullYear();
                    if (nowYear !== oldYear) {
                        oldYear = nowYear;
                        return true;
                    }
                    return false;
                }
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        if (!isNewYear($parse(attrs.isNewYear)($scope))) {
                            element.remove();
                        }
                    }
                }
            }
        ]);
        app.directive('companyDisplay', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {

                    setTimeout(function() {
                        var w1 = element.children()[0].offsetWidth;
                        var w2 = element.find('span')[0].offsetWidth;
                        if (w2 > w1) {
                            element.children().css('width', w2 + 'px');
                            var iscroll = new IScroll(element[0], {
                                scrollX: true,
                                scrollY: false
                            });
                        }
                    })
                }
            }
        });
        app.directive('slider', function() {
            return {
                restrict: 'A',
                link: function($scope, ele, attrs) {

                    var element = ele[0];
                    var boxWidth = element.offsetWidth;
                    var contentWidth = ele.find('li')[0].offsetWidth * ele.find('li').length;

                    var count = Math.ceil(contentWidth / boxWidth);

                    if (count < 2) return;

                    ele.find('ul').css('width', contentWidth + 'px');

                    var i = 0;
                    var str = '';
                    while (i < count) {
                        str += '<span></span>';
                        i++;
                    }
                    ele.next().html(str);
                    var dot = ele.next().find('span');
                    dot.eq('0').addClass('active');

                    var animateBox = ele.find('ul');

                    var iscroll = new IScroll(element, {
                        scrollX: true,
                        scrollY: false
                    });

                    function setIndex() {
                        var transformCss = getComputedStyle(animateBox[0], null).transform;
                        var distance = Number(transformCss.split(', ')[4]);
                        var index = Math.floor(distance / boxWidth) * -1;
                        if (index < 0) return;
                        dot.removeClass('active').eq(index).addClass('active');
                    }

                    animateBox.on('transitionend', setIndex);

                    ele.on('touchstart', function(ev) {

                        var touchEnd = function() {
                            document.removeEventListener('touchmove', setIndex);
                            document.removeEventListener('touchend', setIndex);
                        };
                        document.addEventListener('touchmove', setIndex, false);
                        document.addEventListener('touchend', setIndex, false);
                        ev.stopPropagation();
                        return false;
                    });
                }
            }
        });

        app.directive('iscroll', ['$parse',
            function($parse) {
                return {
                    link: function($scope, element, attrs) {
                        var iscroll = new IScroll(element[0], {
                            probeType: 2,
                            scrollbars: true,
                            fadeScrollbars: true,
                            shrinkScrollbars: 'clip'
                        });
                        element[0].children[0].style.minHeight = element[0].offsetHeight + 1 + 'px';
                        var isPagination = true;

                        var currentPage = 1;
                        var pages = 0;
                        var scrollDirection = null;

                        function updateFn() {
                            var getDataFn = $parse(attrs.pagination)($scope);
                            if (typeof getDataFn === 'function') {
                                getDataFn.call($scope, currentPage);
                            }
                        };
                        if (attrs.pagination) {
                            var eleUp = angular.element('<div class="update-prompt update-prompt-up"></div>');
                            var eleDown = angular.element('<div class="update-prompt update-prompt-down"></div>');
                            $scope.$watch(attrs.currentPage, function(newCurrentPage) {
                                if (newCurrentPage === undefined) {
                                    eleUp.addClass('hidden');
                                    eleDown.addClass('hidden');
                                    return;
                                } else {
                                    eleUp.removeClass('hidden');
                                    eleDown.removeClass('hidden');
                                    eleUp.removeClass('update-loading');
                                    eleDown.removeClass('update-loading');
                                }
                                currentPage = newCurrentPage;
                                pages = $parse(attrs.pages)($scope);
                                if (pages > 1 && isPagination) {
                                    isPagination = false;
                                    element.children().eq(0).addClass('pagination-content');
                                    element.append(eleUp);
                                    element.append(eleDown);
                                }
                                //                                if (currentPage == 1) {
                                //                                    eleUp.addClass('hidden');
                                //                                } else {
                                //                                    eleUp.removeClass('hidden');
                                //                                }
                                //
                                //                                if (currentPage == pages) {
                                //                                    eleDown.addClass('hidden');
                                //                                } else {
                                //                                    eleDown.removeClass('hidden');
                                //                                }
                            })

                            $scope.$watch(attrs.pages, function(n) {
                                pages = n || 0;
                            })
                            iscroll.on('scroll', function() {
                                if (currentPage === 1) {
                                    eleUp.addClass('hidden');
                                } else {
                                    eleUp.removeClass('hidden');
                                }

                                if (currentPage === pages) {
                                    eleDown.addClass('hidden');
                                } else {
                                    eleDown.removeClass('hidden');
                                }
                                if (this.y > 40) {
                                    scrollDirection = 'down';
                                    eleUp.text('正在刷新');
                                    eleUp.addClass('update-loading');
                                } else if (this.y - this.maxScrollY < -40) {
                                    scrollDirection = 'up';
                                    eleDown.text('正在加载');
                                    eleDown.addClass('update-loading');
                                } else {
                                    scrollDirection = null;
                                }
                            });

                            iscroll.on('scrollEnd', function() {
                                if (scrollDirection) {
                                    if (scrollDirection == 'up') {
                                        if (currentPage == pages) return;
                                        eleDown.text('');
                                        eleUp.text('');
                                        eleDown.removeClass('update-loading');
                                        currentPage++;
                                    }
                                    if (scrollDirection == 'down') {
                                        if (currentPage == 1) return;
                                        eleUp.text('');
                                        eleDown.text('');
                                        eleUp.removeClass('update-loading');
                                        currentPage--;
                                    }
                                    updateFn();
                                }
                                scrollDirection = null;
                            });
                        }
                        attrs.iscroll.split(';').forEach(function(item) {
                            $scope.$watch(item, function() {
                                setTimeout(function() {
                                    iscroll.refresh();
                                    iscroll.scrollTo(0, 0);
                                }, 200)
                            });
                        })
                    }
                }
            }
        ]);
        app.directive('tapClock', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var number = 60;
                    var oldValue = element.html();
                    var timer;
                    var isDisabled = false;
                    var hm = new Hammer(element[0]);
                    hm.on('tap', function() {
                        if (isDisabled) return;
                        if (attrs.doValidate) {
                            setTimeout(function() {
                                if (!element.attr('is-disabled') || element.attr('is-disabled') == 'true') return;
                                clock();
                            }, 0);
                        } else {
                            clock();
                        }

                        function clock() {
                            isDisabled = true;
                            $scope.$apply(attrs.tapClock);
                            element.prop('disabled', true);
                            element.html('重新获取(' + number + 's)');
                            timer = setInterval(function() {
                                number--;
                                if (number < 0) {
                                    clearInterval(timer);
                                    element.html(oldValue);
                                    element.prop('disabled', false);
                                    isDisabled = false;
                                    number = 60;
                                    return;
                                }
                                element.html('重新获取(' + number + 's)');
                            }, 1000)
                        }
                    })

                }
            }
        });
        app.directive('modal', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var isHide = false;
                    element.on('webkitTransitionEnd transitionend', function() {
                        !isHide && element.css('display', 'none');
                    })
                    $scope.$watch(attrs.modal, function(val) {
                        isHide = val;
                        if (val) {
                            element.css('display', 'block');
                            setTimeout(function() {
                                element.addClass('modal-show')
                            }, 0)
                        } else {
                            element.removeClass('modal-show');
                        }
                    })
                }
            }
        });
        app.directive('testCode', ['$http', '$state', '$parse', 'baseUrl',
            function($http, $state, $parser, baseUrl) {
                var isGoPage = true;
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        isGoPage = true;
                        var isWatch = false;
                        var hm = new Hammer(element[0]);
                        hm.on('tap', function() {
                            var isChecked = $parser(attrs.verifyCodeState)($scope);
                            if (isChecked) {
                                $state.go(attrs.targetPage, $parser(attrs.stateParams)($scope));
                            } else {
                                $scope.$apply(attrs.testCode);
                                if (isWatch) return;
                                isWatch = true;
                                var watch = $scope.$watch(attrs.verifyCodeState, function(val) {
                                    if (val && isGoPage) {
                                        watch();
                                        isGoPage = false;
                                        $state.go(attrs.targetPage, $parser(attrs.stateParams)($scope));
                                    }
                                })
                            }
                            return false;
                        })
                    }
                }
            }
        ])
        app.directive('cancelBubble', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var hm = new Hammer(element[0]);
                    hm.on('tap', function(ev) {
                        ev.srcEvent.stopPropagation();
                        ev.cancelBubble = true;
                    })
                }
            }
        });
        app.directive('empty', function() {
            return {
                restrict: 'E',
                template: '<div class="data-empty"><p><img src="../resources/images/data-empty.png"></p><p>该企业暂无相关信息！</p></div>',
                replace: true
            }
        });
        app.directive('loading', function() {
            return {
                restrict: 'E',
                //template: '<div class="loading"><div class="dot">努</div><div class="dot">力</div><div class="dot">加</div><div class="dot">载</div><div class="dot">中</div><div class="dot">请</div><div class="dot">稍</div><div class="dot">候</div></div>',
                template: '<div class="loading"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
                replace: true
            }
        });
        app.directive('attention', ['$state', '$http', '$stateParams', 'attention', 'baseUrl',
            function($state, $http, $stateParams, attention, baseUrl) {
                return {
                    scope: {},
                    restrict: 'E',
                    template: '<span class="icon text-red text-big" ng-class="{true:\'icon-star2\',false:\'icon-star\'}[isAttention]"></span>',
                    replace: true,
                    link: function($scope, element, attrs) {
                        $scope.isAttention = attention.get(function(isAttention) {
                            $scope.isAttention = isAttention;
                            //$scope.$apply();
                        });
                        var hm = new Hammer(element[0]);
                        hm.on('tap', function() {
                            if ($scope.isAttention === undefined) return;
                            $http({
                                url: baseUrl.baseUrl + ($scope.isAttention ? 'user/focuson/wxyzdelete' : 'user/focuson/wxyzcorp'),
                                method: 'post',
                                data: {
                                    corp_id: $stateParams.corpId
                                }
                            }).success(function(data) {
                                if (data.success) {
                                    switch (data.msg) {
                                        case '取消关注成功！':
                                            attention.set(false);
                                            $scope.isAttention = false;
                                            prompt(data.msg);
                                            break;
                                        case '添加关注成功！':
                                            attention.set(true);
                                            $scope.isAttention = true;
                                            prompt(data.msg);
                                            break;
                                    }
                                    //$scope.$apply();
                                }
                            })
                        })
                    }
                }
            }
        ]);
        app.directive('cancelAttention', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var hm = new Hammer(element[0]);
                    hm.on('panleft', function() {
                        element.addClass('active');
                    })
                    hm.on('panright', function() {
                        element.removeClass('active');
                    })
                }
            }
        });
        app.directive('replyMsg', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var input = document.getElementById('reply-msg-content');
                    var hm = new Hammer(element[0]);
                    hm.on('tap', function() {
                        input.focus();
                        $scope.$apply(attrs.replyMsg);
                    });
                }
            }
        });
        app.directive('backPage', ['$state', '$stateParams',
            function($state, $stateParams) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var hm = new Hammer(element[0]);
                        hm.on('tap', function() {
                            if (history.length > 1) {
                                history.back();
                            } else {
                                $state.go(attrs.backPage, $stateParams);
                            }
                        });
                    }
                }
            }
        ]);
        app.directive('progressBar', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    function toRadian(number) {
                        return 2 * Math.PI * number / 100;
                    }
                    var progressNum = +attrs.progressBar || 0;
                    var ele = element[0];
                    var width = ele.offsetWidth * 2 || 80;
                    var height = ele.offsetHeight * 2 || 80;
                    if (!width || !height) return;
                    ele.width = width;
                    ele.height = height;

                    var ctx = ele.getContext('2d');
                    ctx.translate(width / 2, height / 2);
                    ctx.rotate(-Math.PI / 2);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#ddd';
                    ctx.beginPath();
                    ctx.arc(0, 0, width / 2 - 2, 0, toRadian(100), false);
                    ctx.stroke();
                    ctx.strokeStyle = '#5eb4fd';
                    ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.arc(0, 0, width / 2 - 2, 0, toRadian(progressNum), false);
                    ctx.stroke();

                    ctx.rotate(Math.PI / 2);
                    ctx.font = '1.6em sans-serif';
                    ctx.fillStyle = '#5eb4fd';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(progressNum + '%', 0, 0);
                }
            }
        });
        app.directive('chart', ['$parse',
            function($parser) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        function toRadian(number) {
                            return 2 * Math.PI * number / 100;
                        }
                        var progressArr = $parser(attrs.chart)($scope);
                        var curYear = attrs.curyear;
                        if (!progressArr) return;
                        var ele = element[0]
                        var width = ele.offsetWidth * 2;
                        var height = ele.offsetHeight * 2;
                        ele.width = width;
                        ele.height = height;

                        var ctx = ele.getContext('2d');
                        ctx.fillStyle = '#f5f5f5';
                        ctx.fillRect(40, 0, width, height - 70);
                        ctx.translate(0, height - 30);
                        ctx.fillStyle = '#aaa';
                        ctx.font = '1.6em sans-serif';

                        var arr = [];
                        var maxH = (function() {
                            var arr2 = [];
                            for (var i = 0; i < progressArr.length; i++) {
                                (function(obj) {
                                    for (var key in obj) {
                                        arr2.push(obj[key]);
                                    }
                                })(progressArr[i])
                            }
                            arr2.forEach(function(item) {
                                arr.push(item);
                            });
                            arr2.sort(function(n, m) {
                                return m - n;
                            });
                            var result = arr2[0];
                            return result % 10 ? Math.ceil(result / 10) * 10 : result;
                        }());

                        var itemHeight = maxH / 10;

                        maxH += itemHeight * 2;

                        for (var i = itemHeight * 2; i < maxH; i += itemHeight) {
                            ctx.fillText(i - itemHeight, 5, -(height - 30) * i / maxH);
                        }
                        for (var i = 0; i < progressArr.length; i++) {
                            (function(obj) {
                                for (var key in obj) {
                                    if (i == progressArr.length - 1) {
                                        ctx.fillText(key + '月', width * (i + .3) / progressArr.length, -10);
                                    } else {
                                        ctx.fillText(key, width * (i + .7) / progressArr.length, -10);
                                    }
                                    if (key == '1') {
                                        ctx.fillText(curYear, width * (i + .7) / progressArr.length, 20);
                                        if (i != '0') {
                                            ctx.fillText(curYear - 1, width * 0.7 / progressArr.length, 20);
                                        }
                                    }
                                }
                            })(progressArr[i])
                        }


                        ctx.translate(0, -40);


                        ctx.strokeStyle = '#fc563e';
                        ctx.fillStyle = '#fc563e';
                        ctx.lineWidth = 2;
                        for (var i = 0; i < arr.length; i++) {
                            var x = (i + 0.9) / arr.length * width;
                            var y = -arr[i] / maxH * (height - 30) - 7;
                            if (i) {
                                ctx.lineTo(x, y);
                                ctx.closePath();
                                ctx.stroke();
                            }
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.arc(x, y, 4, 0, toRadian(100), false);
                            ctx.closePath();
                            ctx.fill();
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                        }
                    }
                }
            }
        ]);

        app.directive('popUp', ['$parse',
            function($parse) {
                var popUpWrapObj = document.getElementById('popUp-wrap')
                var popUpWrap = angular.element(popUpWrapObj);
                var popUpContent = angular.element(popUpWrapObj.getElementsByClassName('popUp-content')[0]);
                var scrollBox = popUpWrapObj.children[0].children[0];
                var hmPopUpWrap = new Hammer(popUpWrapObj);
                hmPopUpWrap.on('tap', function() {
                    popUpWrap.removeClass('modal-show');
                    popUpWrap.one('tansitionend webkitTransitionEnd', function() {
                        popUpWrap.css({
                            display: 'none'
                        })
                    })
                });
                var iscroll = new IScroll(scrollBox);
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var hm = new Hammer(element[0]);
                        hm.on('tap', function() {
                            popUpContent.html($parse(attrs.popUp)($scope).replace(/^(\s|\\n)*/, '<p>').replace(/(\s|\\n)*$/, '</p>').replace(/\\n/g, '</p><p>'));
                            popUpWrap.css({
                                display: 'block'
                            });
                            setTimeout(function() {
                                popUpWrap.addClass('modal-show');
                                iscroll.refresh();
                            }, 0)
                        });
                    }
                }
            }
        ]);

        app.directive('selectIscroll', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var scrollBox = element[0];
                    var iscroll = new IScroll(scrollBox);
                    var timer = null;
                    element.on('transitionend webkitTransitionEnd', function(ev) {
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            iscroll.refresh();
                        }, 10);
                    })
                }
            }
        })
        app.directive('corpFamily', ['$http', '$stateParams',
            function($http, $stateParams) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attr) {
                        var color = d3.scale.category20();
                        var width = element[0].offsetWidth,
                            height = element[0].offsetHeight;
                        //定义力学结构
                        var force = d3.layout.force()
                            .size([width, height])
                            .charge(-400)
                            .linkDistance(width / 10)
                            .on("tick", tick);

                        var drag = force.drag()
                            .on("dragstart", dragstart);

                        //定义画布
                        var svg = d3.select(element[0]).append("svg")
                            .attr("width", width)
                            .attr("height", height);

                        var link = svg.selectAll(".link"),
                            node = svg.selectAll(".node");
                        var links, nodes;
                        var childNodes, childLinks;

                        //自定义
                        var defs = svg.append("defs");
                        //定义线段圆起点
                        var circleMarker = defs.append("marker")
                            .attr("id", "startPoint")
                            .attr("markerUnits", "strokeWidth")
                            .attr("markerWidth", "12")
                            .attr("markerHeight", "12")
                            .attr("viewBox", "0 0 12 12")
                            .attr("refX", "6")
                            .attr("refY", "6")
                            .attr("orient", "auto");
                        circleMarker.append("circle")
                            .attr("cx", 6)
                            .attr("cy", 6)
                            .attr("r", 2)
                            .attr("fill", "#000");

                        //定义箭头
                        var arrowMarker = defs.append("marker")
                            .attr("id", "arrow")
                            .attr("markerUnits", "strokeWidth")
                            .attr("markerWidth", "12")
                            .attr("markerHeight", "12")
                            .attr("viewBox", "0 0 12 12")
                            .attr("refX", "20")
                            .attr("refY", "3")
                            .attr("orient", "auto");
                        //var arrow_path = "M0,0 L12,6 L0,12 L8,6 L0,0";
                        var arrow_path = "M0,0 L0,6 L9,3 z";
                        arrowMarker.append("path")
                            .attr("d", arrow_path)
                            .attr("fill", "green");

                        //读取json数据并且用D3展现
                        //d3.json("http://wow.techbrood.com/uploads/141102/proposals.json", function populate(data) { //draw something with the data  })
                        $http({
                            url: baseUrl.baseUrl + 'corp/investor',
                            method: 'get',
                            params: $stateParams
                        }).success(function(data) {
                            if (!data.success) {
                                alert(data.msg);
                                return;
                            }

                            var graph = {};
                            graph.nodes = data.data.companyBaseList;
                            graph.links = data.data.companyLinkList;


                            //读取数据并激活
                            force.nodes(graph.nodes).links(graph.links).start();
                            nodes = force.nodes();
                            links = force.links();

                            // 颜色:  "#09F"       "red"  "green"  "yellow" "purple"
                            //定义连线
                            link = link.data(graph.links)
                                .enter().append("line")
                                .attr("class", "link")
                                .attr("stroke", "#09F")
                                .attr("stroke-opacity", "0.4")
                                .style("stroke-width", 1)
                                .attr("marker-end", "url(#arrow)");

                            //定义节点标记
                            node = node.data(graph.nodes)
                                .enter().append("g")
                                .call(force.drag);

                            //节点圆形标记
                            node.append("circle")
                                .attr("class", "node")
                                .attr("r", function(d) {
                                    return 1 + d.type;
                                })
                                .style("fill", function(d) {
                                    return color(d.status);
                                })
                                .on("dblclick", dblclick)
                                .on("click", click)
                                .on("mouseover", function(d, i) {
                                    d3.select(this)
                                        .attr("fill", "yellow");
                                })
                                .on("mouseout", function(d, i) {
                                    d3.select(this)
                                        .transition()
                                        .duration(500)
                                        .attr("fill", "red");
                                })
                                .call(drag);

                            //节点上显示的姓名
                            node.append("text")
                                .attr("dy", "30")
                                .attr("class", "nodetext")
                                .style("text-anchor", "middle")
                                .style("font-size", 14)
                                .text(function(d) {
                                    return d.name;
                                });

                            //标记鼠标悬停的标签  ---可以显示公司详细信息
                            node.append("title")
                                .text(function(d) {
                                    return d.desc;
                                });

                        })

                        function tick() {
                            //限制结点的边界
                            node.attr("cx", function(d) {
                                d.x = d.x < 0 ? 3 : d.x;
                                d.x = d.x > width ? width - 3 : d.x;
                            })
                                .attr("cy", function(d) {
                                    d.y = d.y < 0 ? 3 : d.y;
                                    d.y = d.y > height ? height - 3 : d.y;
                                });

                            //更新连接线的位置
                            link.attr("x1", function(d) {
                                return d.source.x;
                            })
                                .attr("y1", function(d) {
                                    return d.source.y;
                                })
                                .attr("x2", function(d) {
                                    return d.target.x;
                                })
                                .attr("y2", function(d) {
                                    return d.target.y;
                                });

                            //更新结点
                            node.attr("transform", function(d) {
                                return "translate(" + d.x + "," + d.y + ")";
                            });
                        }

                        function dblclick(d) {
                            d3.select(this).classed("fixed", d.fixed = false);
                            d3.select(this).style("fill", color(d.status));
                        }

                        function dragstart(d) {
                            d3.select(this).classed("fixed", d.fixed = true);
                        }

                        function click(dNode) {
                            if (!dNode['_expanded']) {
                                expandNode(dNode.name);
                                dNode['_expanded'] = true;
                            } else {
                                collapseNode(dNode.name);
                                dNode['_expanded'] = false;
                            }
                        }

                        function expandNode(name) {
                            // 根据节点名称查找子节点信息
                            $http({
                                url: baseUrl.baseUrl + 'corp/investment',
                                method: 'get',
                                params: {
                                    corpName: name
                                }
                            }).success(function(data) {
                                if (!data.success) {
                                    alert(data.msg);
                                    return;
                                }
                                childNodes = data.data.companyBaseList;
                                childLinks = data.data.companyLinkList;
                                addNodes(childNodes);
                                addLinks(childLinks);
                                update();
                            })
                        }

                        function collapseNode(name) {
                            removeChildNodes(name, 1);
                            update();
                        }

                        //增加节点
                        function addNode(dNode) {
                            nodes.push(dNode);
                        }
                        //增加多个节点
                        function addNodes(dNodes) {
                            if (Object.prototype.toString.call(dNodes) == '[object Array]') {
                                dNodes.forEach(function(dNode) {
                                    if (findNode(dNode.name) == null) addNode(dNode);
                                });
                            }
                        }

                        //增加连线
                        function addLink(source, target) {
                            links.push({
                                source: findNode(source),
                                target: findNode(target)
                            });
                        }
                        //增加多个连线
                        function addLinks(dLinks) {
                            if (Object.prototype.toString.call(dLinks) == '[object Array]') {
                                dLinks.forEach(function(dLink) {
                                    if (isExistLink(dLink['source'], dLink['target']) == false) addLink(dLink['source'], dLink['target']);
                                });
                            }
                        }

                        //删除节点
                        function removeNode(dNode) {
                            var i = 0,
                                n = findNode(dNode);
                            while (i < links.length) {
                                links[i]['source'] == n || links[i]['target'] == n ? links.splice(i, 1) : ++i;
                            }
                            nodes.splice(findNodeIndex(id), 1);
                        }

                        //删除节点下的子节点，同时清除link信息
                        function removeChildNodes(name, level) {
                            var dNode = findNode(name);

                            var linksToDelete = [],
                                childNodes = [];

                            links.forEach(function(dLink, index) {
                                // 删除源头是dNode的连线
                                if (dLink['source'].name == dNode.name) {
                                    //删除叶子节点
                                    if (isExistSourceLink(dLink['target'].name) == false) {
                                        linksToDelete.push(index);
                                        childNodes.push(dLink['target']);
                                    }
                                    // 删除源头是dLink['target'].name的连线   // 避免新增的节点对已经存在的节点新加的关联关系
                                    //if (level == 1) removeChildNodes(dLink['target'].name, 1);
                                }
                            });

                            linksToDelete.reverse().forEach(function(index) {
                                links.splice(index, 1);
                            });

                            var remove = function(dNode) {
                                var length = links.length;
                                for (var i = length - 1; i >= 0; i--) {
                                    if (links[i]['source'] == dNode) {
                                        var target = links[i]['target'];
                                        links.splice(i, 1);
                                        nodes.splice(self.findNodeIndex(node.id), 1);
                                        remove(target);
                                    }
                                }
                            }

                            childNodes.forEach(function(dNode) {
                                remove(dNode);
                            });

                            //清除没有连线的节点
                            for (var i = nodes.length - 1; i >= 0; i--) {
                                var haveFoundNode = false;
                                for (var j = 0, l = links.length; j < l; j++) {
                                    (links[j]['source'] == nodes[i] || links[j]['target'] == nodes[i]) && (haveFoundNode = true)
                                }!haveFoundNode && nodes.splice(i, 1);
                            }
                        }

                        //查找节点
                        function findNode(name) {
                            for (var i in nodes) {
                                if (nodes[i]['name'] == name) return nodes[i];
                            }
                            return null;
                        }

                        //查找节点所在索引号
                        function findNodeIndex(name) {
                            for (var i in nodes) {
                                if (nodes[i]['name'] == name) return i;
                            }
                            return -1;
                        }

                        //查找连线
                        function isExistLink(source, target) {
                            for (var i in links) {
                                if (links[i]['source'].name == source && links[i]['target'].name == target) return true;
                            }
                            return false;
                        }
                        //查找特定源头的连线
                        function isExistSourceLink(source) {
                            for (var i in links) {
                                if (links[i]['source'].name == source) return true;
                            }
                            return false;
                        }

                        //更新拓扑图状态信息
                        function update() {

                            link = link.data(force.links());
                            link.enter()
                                .append("line")
                                .attr("class", "link")
                                .attr("stroke", "#09F")
                                .attr("stroke-opacity", "0.4")
                                .style("stroke-width", 1)
                                .attr("marker-end", "url(#arrow)");

                            link.exit().remove();

                            node = node.data(force.nodes());
                            var dNode = node.enter().append("g").append("circle")
                                .attr("class", "node")
                                .attr("r", function(d) {
                                    return 1 + d.type;
                                })
                                .style("fill", function(d) {
                                    return color(d.status);
                                })
                                .on("dblclick", dblclick)
                                .on("click", click)
                                .on("mouseover", function(d, i) {
                                    d3.select(this)
                                        .attr("fill", "yellow");
                                })
                                .on("mouseout", function(d, i) {
                                    d3.select(this)
                                        .transition()
                                        .duration(500)
                                        .attr("fill", "red");
                                })
                                .call(drag);
                            dNode.append("text")
                                .attr("dy", "30")
                                .attr("class", "nodetext")
                                .style("text-anchor", "middle")
                                .text(function(d) {
                                    return d.name;
                                });
                            dNode.append("title")
                                .text(function(d) {
                                    return d.desc;
                                });

                            node.exit().remove();

                            force.start();
                        }
                    }
                }
            }
        ])
    }
})
