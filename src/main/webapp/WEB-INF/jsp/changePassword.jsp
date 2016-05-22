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
    <title>修改密码-新疆巨农</title>
    <meta content="telephone=no" name="format-detection">
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<%=basePath%>resources/library/bootstrap/dist/css/bootstrap-theme.css">
    <link rel="stylesheet" href="<%=basePath%>resources/dist/common/style/common.css">
    <script>
        if (document.addEventListener) {
            document.write('<script src="<%=basePath%>resources/library/requirejs/require.min.js"><\/script>');
            document.write('<script src="<%=basePath%>resources/requirejs-config.js"><\/script>');
            document.write('<script>require(["changePassword"])<\/script>')
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
        <div class="container">
            <div class="navbar-header">
                <a class="logo" href="./login"><img src="<%=basePath%>resources/images/logo.png" alt="新疆巨农"></a>
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
    <div class="login-box">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4>修改密码</h4>
            </div>
            <div ng-controller="changePasswordControl" class="panel-body">
                <div ng-show="msg" class="ng-hide alert" ng-class="{true:'alert-success',false:'alert-danger'}[data.success]">
                    <button ng-click="closeMsg()" type="button" class="close"><span>&times;</span>
                    </button>
                    <span ng-bind="data.msg"></span>
                </div>
                <form ng-show="!data.success" ng-init="data.success=false" validate-form="submit()" method="post" class="form-horizontal" name="changePwdForm" novalidate>
                    <div class="form-group" ng-class="{'has-error':changePwdForm.oldPwd.$invalid && !changePwdForm.oldPwd.$pristine}">
                        <label class="col-sm-3 control-label">原密码</label>
                        <div class="col-sm-9">
                            <input name="oldPwd" ng-model="submitData.oldPwd" class="form-control" type="password" placeholder="请输入旧密码" required>
                            <span ng-show="changePwdForm.oldPwd.$error.required && !changePwdForm.oldPwd.$pristine" class="help-block" ng-bind="'必填项不能为空'"></span>
                        </div>
                    </div>
                    <div class="form-group" ng-class="{'has-error':changePwdForm.pwd.$invalid && !changePwdForm.pwd.$pristine}">
                        <label class="col-sm-3 control-label">新密码</label>
                        <div class="col-sm-9">
                            <input ng-model="submitData.pwd" name="pwd" class="form-control" type="password" placeholder="请输入新密码" required ng-minlength="6" ng-maxlength="18">
                            <span ng-show="changePwdForm.pwd.$error.required && !changePwdForm.pwd.$pristine" class="help-block" ng-bind="'必填项不能为空'"></span>
                            <span ng-show="changePwdForm.pwd.$error.minlength &&!changePwdForm.pwd.$pristine" class="help-block" ng-bind="'请至少输入6位密码'"></span>
                            <span ng-show="changePwdForm.pwd.$error.maxlength &&!changePwdForm.pwd.$pristine" class="help-block" ng-bind="'密码最大长度18位'"></span>
                        </div>
                    </div>
                    <div class="form-group" ng-class="{'has-error':changePwdForm.repeatPwd.$invalid && !changePwdForm.repeatPwd.$pristine}">
                        <label class="col-sm-3 control-label">确认密码</label>
                        <div class="col-sm-9">
                            <input ng-model="submitData.repeatPwd" name="repeatPwd" repeat-key="pwd" class="form-control" type="password" placeholder="请确认新密码" required>
                            <span ng-show="changePwdForm.repeatPwd.$error.required && !changePwdForm.repeatPwd.$pristine" class="help-block" ng-bind="'必填项不能为空'"></span>
                            <span ng-show="changePwdForm.repeatPwd.$error.repeatKey && !changePwdForm.repeatPwd.$pristine && !changePwdForm.repeatPwd.$error.required" class="help-block" ng-bind="'两次密码输入不一致'"></span>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-9 col-sm-offset-3">
                            <button class="btn btn-primary" type="submit">提 交</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>

</html>
