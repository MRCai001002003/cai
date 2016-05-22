define(function(require) {
    return function(app) {
        app.directive('tableResponsive', function() {
            return {
                scope: true,
                restrict: 'E',
                templateUrl: require.toUrl('./tableResponsive.html'),
                replace: true,
                controller: ['$scope',
                    function($scope) {
                        $scope.content = $scope.$parent.item;
                    }
                ],
                link: function($scope, element, attrs) {
                    //                        树结构 = {
                    //                        componentName: 'tableResponsive',
                    //                        component: [{
                    //                            thead: [],
                    //                            tbody: [
                    //                                [{
                    //                                        text: []
                    //                                    }, {
                    //                                        text: []
                    //                                    }
                    //
                    //                                ],
                    //                            ],
                    //                            tfoot: []
                    //                        }]
                    //}；



                    var parent = element.parent()[0];
                    parent.content = $scope.content = $scope.content || {
                        componentName: 'tableResponsive',
                        component: [createTable(2, 3)]
                    };

                    function createTable(rowNum, colNum) {
                        var table = {
                            thead: [],
                            tbody: [],
                            tfoot: []
                        }
                        for (var i = 0; i < colNum; i++) {
                            table.thead.push({});
                            table.tfoot.push({});
                        }
                        for (var i = 0; i < rowNum; i++) {
                            var row = [];
                            for (var j = 0; j < colNum; j++) {
                                row.push({});
                            }
                            table.tbody.push(row);
                        }
                        return table;
                    };

                    $scope.addRow = function(table, index) {
                        table.tbody.splice(index + 1, 0, (function() {
                            var arr = [];
                            for (var i = 0; i < table.thead.length; i++) {
                                arr.push({});
                            }
                            return arr;
                        })())
                    };
                    $scope.addCol = function(table, index) {
                        table.thead.splice(index + 1, 0, {});
                        for (var i = 0; i < table.tbody.length; i++) {
                            table.tbody[i].splice(index + 1, 0, {});
                        }
                        table.tfoot.splice(index + 1, 0, {});
                    };

					$scope.removeRow = function(table,index){
						table.tbody.splice(index,1);
					};

					$scope.removeCol = function(table,index){
						table.thead.splice(index,1);
						for(var i=0;i<table.tbody.length;i++){
							table.tbody[i].splice(index,1);
						}
						table.tfoot.splice(index,1);
					};

					$scope.add = function(index){
						$scope.content.component.splice(index+1,0,createTable(2, 3));
					};
					$scope.remove = function(index){
						$scope.content.component.splice(index,1);
					}
                }
            };
        });
    }
})
