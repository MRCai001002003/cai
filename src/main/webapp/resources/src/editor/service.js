define(function(require) {
    var $ = require('jquery');
    return function(app) {
        app.service('componentTransclude', ['$compile', '$rootScope',
            function($compile, $rootScope) {
                function collTest(obj, target) {
                    var $obj = $(obj);
                    var $target = $(target);
                    var t1 = $obj.offset().top;
                    var l1 = $obj.offset().left;
                    var r1 = l1 + $obj.width();
                    var b1 = t1 + $obj.height();
                    var t2 = $target.offset().top;
                    var l2 = $target.offset().left;
                    var r2 = l2 + $target.width();
                    var b2 = t2 + $target.height();
                    if (t2 > b1 || r2 < l1 || b2 < t1 || l2 > r1) {
                        return false;
                    } else {
                        return true;
                    }
                };
                var elementsArr = [];
                this.set = function(ele) {
                    elementsArr.push(ele);
                };
                $('#left-bar li').each(function(index, ele) {
                    $(ele).on('mousedown', 'img[component]', function() {
                        $(ele).addClass('active');
                    })
                    $(ele).on('mouseup', 'img[component]', function() {
                        $(ele).removeClass('active');
                    })
                })
                $(document).on('mousedown', 'img[component]', function(ev) {
                    var evElement = $(ev.target);
                    var left = ev.clientX;
                    var top = ev.clientY;
                    var distance = evElement.position();
                    var newEle = evElement.clone().insertBefore(evElement);
                    newEle.css({
                        position: 'absolute',
                        width: evElement.width(),
                        height: evElement.height(),
                        left: distance.left,
                        top: distance.top,
                        zIndex: 5
                    })
                    $(document).on('mousemove.dragComponent', function(ev) {
                        newEle.css({
                            left: distance.left + ev.clientX - left,
                            top: distance.top + ev.clientY - top
                        });
                        var name = ev.target.getAttribute('component');
                        for (var i = 0; i < elementsArr.length; i++) {
                            if (elementsArr[i].children().length) continue;
                            if (name && ev.target === ev.toElement) {
                                if (collTest(ev.target, elementsArr[i])) {
                                    elementsArr[i].addClass('hover');
                                } else {
                                    elementsArr[i].removeClass('hover');
                                }
                            }
                        }
                    })
                    $(document).one('mouseup.dragComponent', function(ev) {
                        var currentElement = null;
                        var arr = [];
                        for (var i = 0; i < elementsArr.length; i++) {
                            if (elementsArr[i].parent().length) {
                                arr.push(elementsArr[i]);
                                elementsArr[i].removeClass('hover');
                                if (collTest(ev.target, elementsArr[i])) {
                                    currentElement = elementsArr[i];
                                }
                            }
                        }
                        elementsArr = arr;
                        newEle.remove();
                        $(document).off('mousemove.dragComponent');
                        if (!currentElement) return;
                        if (currentElement.children().length) return;
                        var componentName = ev.target.getAttribute('component');
                        if (componentName) {
                            var ele = $compile('<' + componentName + '></' + componentName + '>')($rootScope.$new());
                            ele.appendTo(currentElement);
                        }
                    })
                    return false;
                })
            }
        ]);
        app.factory('contentAnalysis', function() {
            return {
                run: function(ele) {
                    var result = [];
                    var childNodes = ele.childNodes;
                    for (var i = 0; i < childNodes.length; i++) {
                        if (childNodes[i].nodeType === 1) {
                            result.push({
                                tagName: childNodes[i].tagName,
                                innerText: childNodes[i].innerText,
                                className: childNodes[i].className
                            })

                        } else if (childNodes[i].nodeType === 3) {
                            result.push(childNodes[i].nodeValue);
                        }
                    }
                    return result;
                }
            }
        });
        app.factory('baseUrl', function() {
            return {
                baseUrl: '/CMS/'
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
        ]);
        app.service('rangeTransferStation', function() {
            var selection = document.getSelection();
            var editBox = null;
            this.set = function(ele) {
                editBox = ele;
            };
            $('#editable-btns').on('click', 'button', function() {
                if (!editBox) return;

                var editType = $(this).attr('edit-type').replace(/^\s+|\s+$/g, '');
                var range = selection.getRangeAt(0);
                var currentNode = range.commonAncestorContainer;

                var testScopeEle = currentNode;
                while (testScopeEle) {
                    if (!testScopeEle.parentNode) return;
                    if (testScopeEle.contentEditable == 'true') break;
                    testScopeEle = testScopeEle.parentNode;
                }

                var parentNode = currentNode.parentNode;


                function findParentEle(ele, reg) {
                    if (!ele) return;
                    if (ele.contentEditable == 'true') {
                        return false;
                    }
                    if (reg.test(ele.tagName)) {
                        return true;
                    }
                    ele = ele.parentNode;
                    return findParentEle(ele, reg);
                }

                //遍历dom，使替换后的html符合w3c标签嵌套规范
                //查找所有父级元素是否包含当标签
                var hasSameParent = findParentEle(parentNode, new RegExp('^' + editType + '$', 'i'));
                var hasSameChild = parentNode.getElementsByTagName(editType).length;

                function findFirstParent(ele, tagName, reg) {
                    if (reg.test(ele.tagName)) {
                        return ele.parentNode;
                    } else {
                        ele = ele.parentNode;
                        return findFirstParent(ele, tagName, reg);
                    }
                }

                if (hasSameParent) {
                    //如果父级有同名标签，则拆分父级
                    console.log('拆分父级');
                    var firstParent = findFirstParent(parentNode, editType, new RegExp(editType, 'i'));

                    //找到父级，并拆分成三部分，如：
                    //第一部分为父级到range开如的部分，第二部分为range自身，第三部分为range结束到父级结束
                    //

                    var firstRange = document.createRange();
                    firstRange.setStart(firstParent, 0);
                    firstRange.setEnd(range.startContainer, range.startOffset);

                    var lastRange = document.createRange();
                    lastRange.selectNodeContents(firstParent);
                    lastRange.setStart(range.endContainer, range.endOffset);

                    firstParent.appendChild(firstRange.extractContents());
                    firstParent.appendChild(range.extractContents());
                    firstParent.appendChild(lastRange.extractContents());
                } else {
                    //否则直接插入一个新的元素
                    console.log('创建新元素')
                    var newEle = document.createElement(editType);
                    newEle.appendChild(range.extractContents());
                    newEle.innerHTML = newEle.innerHTML.replace(new RegExp('</?' + editType + '>', 'img'), '');
                    range.insertNode(newEle);
                }


                function deleteEmptyEle(ele) {
                    if (!ele) return;
                    var children = ele.children;
                    for (var i = 0; i < children.length; i++) {
                        if (!children[i].innerText) {
                            ele.removeChild(children[i]);
                            i--;
                        } else {
                            deleteEmptyEle(children[i]);
                        }
                    }
                }
                deleteEmptyEle(editBox);
                editBox.normalize();
                //editBox.focus();
                editBox = null;
                //return false;
            })
        });
    }
})
