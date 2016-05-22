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
    <title>内容预览-新疆巨农</title>
    <meta content="telephone=no" name="format-detection">
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap-theme.css">
    <link rel="stylesheet" href="<%=basePath%>resources/dist/common/style/common.css">
    <link rel="stylesheet" href="<%=basePath%>resources/src/common/style/editor.css">
    <script>
        if (document.addEventListener) {
            document.write('<script src="<%=basePath%>resources/library/requirejs/require.min.js"><\/script>');
            document.write('<script src="<%=basePath%>resources/requirejs-config.js"><\/script>');
            document.write('<script>require(["render"])<\/script>')
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

<body style="visibility: hidden">
    <div class="navbar navbar-default navbar-static-top">
        <div class="container" ng-controller="navbarController">
            <div class="navbar-header">
                <a class="logo" href="./index#/home"><img src="<%=basePath%>resources/images/logo.png" alt="新疆巨农"></a>
                <span class="navbar-brand">后台管理系统</span>
            </div>
            <div class="collapse navbar-collapse">
                <div class="navbar-right">
                    <topbar-menu></topbar-menu>
                    <ul class="nav navbar-nav">
                        <li><a href="./logout">退出</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div ng-controller="renderController" class="container">
        <div class="panel panel-default">
            <div class="panel-body">
                <h3 ng-bind="title"></h3>
                <p>来源：<span class="text-muted" ng-bind="source"></span>
                </p>
                <div ng-repeat="item in tree" component="{{item.componentName}}"></div>
            </div>
        </div>
    </div>
</body>

</html>
