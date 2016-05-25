define(function(require) {
	var baseUrl=require('../../common/js/baseUrl/baseUrl');
    return function(app) {
        app.controller('homeControl', ['$scope', '$http','$state',
            function($scope, $http,$state) {
				$scope.params={};
				$scope.submit=function(){
					$http({
						url:baseUrl+'customer/saveCustomerLoan',
						method:'get',
						params:params
					}).success(function(data){
						if(data.success){
							$state.go('register');
						}else{
							alert(data.msg);
						}
					})
				}

            }
        ])
    }
})
