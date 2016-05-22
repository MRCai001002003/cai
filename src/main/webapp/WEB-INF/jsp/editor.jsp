<!DOCTYPE html>
<!--
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
-->
<html>

<head>
    <meta charset="UTF-8">
    <title>CMS内容管理</title>
    <meta content="telephone=no" name="format-detection">
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap-theme.css">
    <link rel="stylesheet" href="<%=basePath%>resources/src/common/style/common.css">
    <link rel="stylesheet" href="<%=basePath%>resources/src/common/style/editor.css">
    <script>
        if (document.addEventListener) {
            document.write('<script src="<%=basePath%>resources/library/requirejs/require.min.js"><\/script>');
            document.write('<script src="<%=basePath%>resources/requirejs-config.js"><\/script>');
            document.write('<script>require(["editor"])<\/script>')
            document.addEventListener('DOMContentLoaded', function() {
                document.body.style.visibility = '';
            })
        } else {
            window.onload = function() {
                document.body.style.visibility = '';
                document.body.innerHTML = '<p style="color:red; font-size: 30px;">你的浏览器已经很过时了, 点这里去下载高级浏览器：</P><a target="_blank" href="https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=chrome%E6%B5%8F%E8%A7%88%E5%99%A8&oq=chrome&rsv_pq=fd07c70a00005e7b&rsv_t=32e2f5KNhr8CSaJbEqQeGhYL%2BsxWFapa9pkwXFTW9WT8qLrAJ4G864ipQ9rjmv7qJsy%2B&rsv_enter=1&rsv_sug3=5&rsv_sug1=3&rsv_sug2=1&prefixsug=chrome&rsp=0&rsv_sug4=2442">下载谷歌(chrome)浏览器</a> <a  target="_blank" href="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=2&tn=baiduhome_pg&wd=firefox%E6%B5%8F%E8%A7%88%E5%99%A8&oq=chrome%E6%B5%8F%E8%A7%88%E5%99%A8&rsv_pq=9a06045900008da9&rsv_t=0dc6rg9tHGC9U8JTEB3T8yvI05AFQVxi7yQFyHgK5eGWw0XiQikiLYx7jUS4oLEIABOt&rsv_enter=1&rsv_sug3=8&rsv_sug1=6&bs=chrome%E6%B5%8F%E8%A7%88%E5%99%A8">下载火狐(firefox)浏览器</a>';
            }
        }
    </script>


</head>

<body ng-controller="editorControl" style="visibility: hidden">
    <div class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <span class="navbar-brand">CMS</span>
            </div>
            <div class="navbar-form navbar-right">
                <div class="form-group">
                    <input ng-model="title" type="text" class="form-control" placeholder="文章标题">
                </div>
                <div class="form-group">
                    <select ng-model="type" ng-init="type='1'" class="form-control">
                        <option value="1">金融动态</option>
                        <option value="2">专家咨询</option>
                        <option value="3">市场行情</option>
                        <option value="4">政策前沿</option>
                    </select>
                </div>
                <div class="form-group">
                    <input ng-model="source" type="text" class="form-control" placeholder="发布类型">
                </div>
                <button class="btn btn-success" save="save()" save-tree="#editor">保存</button>
<!--                <a href="./render#/?id=localSource" target="_blank" class="btn btn-primary" save="show()" save-tree="#editor">预览</a>-->
                <a href="javascript:;" target="_blank" class="btn btn-primary" save="show()" save-tree="#editor">预览</a>
            </div>
        </div>
    </div>
    <div class="container editor-box">
        <div class="left-bar">
            <div class="logout"><a href="./logout">退出</a>
            </div>
            <ul id="left-bar" class="nav nav-tabs">
                <li><a href="javascript:;">排版组件</a>
                    <div class="components-bar">
                        <p>
                            <img component="block-component" class="img-responsive" src="<%=basePath%>resources/images/components/grid/12.png">
                        </p>
                        <p>
                            <img component="grid444" class="img-responsive" src="<%=basePath%>resources/images/components/grid/444.png">
                        </p>
                        <p>
                            <img component="grid3333" class="img-responsive" src="<%=basePath%>resources/images/components/grid/3333.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">标题组件</a>
                    <div class="components-bar">
                        <p>
                            <img class="img-responsive" component="headOne" src="<%=basePath%>resources/images/components/head/h1.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="headTwo" src="<%=basePath%>resources/images/components/head/h2.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="headThree" src="<%=basePath%>resources/images/components/head/h3.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="headFour" src="<%=basePath%>resources/images/components/head/h4.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="headFive" src="<%=basePath%>resources/images/components/head/h5.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">文章组件</a>
                    <div class="components-bar">
                        <p>
                            <img class="img-responsive" component="title-and-body" src="<%=basePath%>resources/images/components/article/1.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="paragraph" src="<%=basePath%>resources/images/components/article/2.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">列表组件</a>
                    <div class="components-bar">
                        <p>
                            <img class="img-responsive" component="list-ul" src="<%=basePath%>resources/images/components/list/ul.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="list-ol" src="<%=basePath%>resources/images/components/list/ol.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="list-dl" src="<%=basePath%>resources/images/components/list/dl.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">图文组件</a>
                    <div class="components-bar">
                        <p>
                            <img class="img-responsive" component="picture-left" src="<%=basePath%>resources/images/components/picture/1.png">
                        </p>
                        <p>
                            <img class="img-responsive" component="picture-right" src="<%=basePath%>resources/images/components/picture/2.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">表格组件</a>
                    <div class="components-bar">
                        <p>
                            <img class="img-responsive" component="table-responsive" src="<%=basePath%>resources/images/components/table/tableResponsive.png">
                        </p>
                    </div>
                </li>
                <li><a href="javascript:;">装饰组件</a>
                    <div class="components-bar"></div>
                </li>
            </ul>
        </div>
        <div class="editor-panel" id="editor">
            <div class="editor-toolbar">
                <div class="row">
                    <div class="col-md-6" id="editable-btns">
                        <button edit-type="strong" class="btn btn-xs btn-default" type="button" title="加粗"><strong>B</strong>
                        </button>
                        <button edit-type="i" class="btn btn-xs btn-default" type="button" title="斜体"><i>I</i>
                        </button>
                        <button edit-type="u" class="btn btn-xs btn-default" type="button" title="下划线"><u>U</u>
                        </button>
                        <button edit-type="s" class="btn btn-xs btn-default" type="button" title="删除线"><s>S</s>
                        </button>
                        <button edit-type="a" class="btn btn-xs btn-default" type="button" title="超链接"><span class="glyphicon glyphicon-globe"></span>
                        </button>
                    </div>
                    <div class="col-md-6">
                        <ul class="style-selector pull-right clearfix">
                            <li class="active" style="background-color:#ccc"></li>
                            <li style="background-color:#ff0"></li>
                            <li style="background-color:#ff6034"></li>
                            <li style="background-color:#04fd33"></li>
                            <li style="background-color:#62cd71"></li>
                        </ul>
                    </div>
                </div>

            </div>
            <root-component></root-component>
        </div>
        <br>
    </div>
</body>

</html>
