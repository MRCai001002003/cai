define(function(require){
	var angular=require('angular');
	require('ui.router');
	var app=angular.module('app',['ui-router']);

	app.config(['$httpProvider','$routerPorvider','$stateProvider',function($httpProvider,$routerProvider,$stateProvider){

	}])


	//加载指令
	require('./pages/directive');
	//加载控制器
	require('./pages/home/home');
	//加载过滤器
	require('./pages/filter');
})
