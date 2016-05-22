define(function(require) {
    var $ = require('jquery');
    var angular = require('angular');
    return function(app) {
        app.directive('insertHtml', ['$parse',
            function($parse) {
                return function($scope, element, attrs) {
                    var content = $parse(attrs.insertHtml)($scope)
                    if (angular.isArray(content)) {
                        if (!content.length) {
                            element.html(attrs.insertHtml.replace(/^[^|]+\|\|(?=[^|]+$)/, '').replace(/^['"\s]+|['"\s]+$/g, ''));
                        } else {
                            element.html(content.join(''));
                        }
                    } else if (angular.isString(content)) {
                        element.html(content);
                    }
                }
            }
        ])
        app.directive('dragSetComponents', ['$compile', 'componentTransclude',
            function($compile, componentTransclude) {
                return {
                    scope: {
                        tree: '='
                    },
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        componentTransclude.set(element);
                    }
                }
            }
        ]);
        app.directive('component', ['$compile',
            function($compile) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        var componentName = (attrs.component || '').replace(/([A-Z])/g, '-$1');
                        if (!componentName) return;
                        var ele = $compile('<' + componentName + '></' + componentName + '>')($scope);
                        element.append(ele);
                    }
                }
            }
        ]);
        app.directive('saveContent', ['contentAnalysis',
            function(contentAnalysis) {
                return {
                    scope: true,
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        element.on('keyup keydown paste', function(ev) {
                            if (ev.keyCode === 13) {
                                return false;
                            }
                            //                            var innerText = this.innerText || this.textContent;
                            //                            if (this.innerHTML != innerText) {
                            //                                this.innerHTML = innerText.replace(/[\n\t\r]+/g, ''); //.replace(/^\s|\B\s|\s\B|\s$/g, '');
                            //                                this.focus();
                            //                            }
                            $scope.$apply(attrs.saveContent)
                            ev.stopPropagation();
                        });
                        $scope.save = function(obj, key) {
                            obj[key] = contentAnalysis.run(element[0]);
                        };
                    }
                };
            }
        ]);
        app.directive('cmsEditable', ['rangeTransferStation',
            function(rangeTransferStation) {
                return {
                    restrict: 'A',
                    link: function($scope, element, attrs) {
                        element.on('keyup mouseup', function() {
                            rangeTransferStation.set(element[0]);
                        })
                    }
                }
            }
        ]);
        app.directive('saveTree', function() {
            return function($scope, element, attrs) {
                element.on('click', function() {
                    var editor = $(attrs.saveTree)[0];
                    var treeArr = [];

                    function getTree(ele, arr) {
                        var children = ele.children;
                        for (var i = 0, len = children.length; i < len; i++) {

                            if (children[i].content) {
                                var obj = children[i].content;
                                if (children[i].content.tree) obj.tree = [];
                                arr.push(obj);
                                getTree(children[i], obj.tree || obj.component);
                            } else {
                                getTree(children[i], arr);
                            }
                        }
                    }
                    getTree(editor, treeArr);

                    function isEmpty(obj) {
                        if (angular.isArray(obj)) return !!obj.length;
                        if (angular.isObject(obj)) {
                            delete obj.$$hashKey;
                            for (var name in obj) {
                                return false;
                            }
                            return true;
                        }
                    }

                    function filterTree(tree, componentName) {
                        if (angular.isArray(tree)) {
                            var arr = [];
                            for (var i = 0, len = tree.length; i < len; i++) {
                                var result = filterTree(tree[i], componentName);
                                if (result) arr.push(result);
                            }
                            if (arr.length) {
                                return arr;
                            }
                            return false;
                        } else if (angular.isObject(tree)) {
                            var obj = {};
                            delete tree.$$hashKey;
                            for (var key in tree) {
                                var result = filterTree(tree[key], tree.componentName || componentName);
                                if (result) obj[key] = result;
                            }
                            if (!isEmpty(obj) || componentName == 'tableResponsive') {
                                return obj;
                            }
                            return false;
                        }
                        return tree;
                    }
                    $scope.tree = filterTree(angular.copy(treeArr));
                    $scope.$apply(attrs.save);
                })
            }
        });
        app.directive('selection', function() {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    element.on('selectstrat', function(ev) {
                        alert('aaa')
                    })
                }
            }
        });

        app.directive('ngUpload', function() {
            return {
                scope: {
                    imgSrc: '=imgSrc'
                },
                restrict: 'A',
                link: function($scope, element, attrs) {
                    var id = 'id' + (new Date).getTime();
                    element.prop('id', id);
                    var $ele = $('#' + id);
                    //初始化
                    $scope.imgSrc = $scope.imgSrc || '../../resources/images/components/picture/img-empty.png';
                    $ele.on('change', function() {
                        var mime = $(this).attr('data-fileType');
                        $scope.imgSrc = '../../resources/images/test.jpg';
                        $scope.$apply(); //应用一遍数据变化，实现数据双向绑定
                        return;

                        var reg = new RegExp('\\.(' + mime + ')$', 'gi');
                        if (!mime || reg.test($(this).val())) {
                            $.ajaxFileUpload({
                                url: baseUrl + 'files/filter/doUploadImg?t=' + Math.random(),
                                secureuri: false, //是否需要安全协议，一般设置为false
                                fileElementId: id, //文件上传域的ID
                                dataType: 'text/plain', //返回值类型 一般设置为json
                                timeout: 60000,
                                success: function(data) {
                                    if (data.success) {
                                        $scope.imgSrc = '../../resources/images/test.jpg';
                                        $scope.$apply();
                                    } else {
                                        alert('上传失败')
                                    }
                                },
                                error: function() {
                                    alert('失败')
                                }
                            })
                        } else {
                            alert('只支持' + mime.replace(/\|/g, ',') + '格式的文件');
                        }
                    });
                }
            }
        })
    }
})
