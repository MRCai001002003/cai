<!DOCTYPE html>
<!--
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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
<meta content="telephone=no" name="format-detection">
<meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no">
<link rel="stylesheet" href="../resources/library/bootstrap/dist/css/bootstrap.min.css">
<title>${title }</title>
</head>
<body>
<div class="container text-justify">
<h4 class="text-center">${title}</h4>
            <p class="text-muted text-center" style="font-size:0.85em;">
                <span>${publishTime}</span>
                <span>${source}</span>
            </p>


<div style="text-indent:2em;">${str}</div>

</div>
</body>
</html>
