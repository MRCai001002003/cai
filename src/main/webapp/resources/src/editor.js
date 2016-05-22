define(function(require) {
    var angular = require('angular');
    var $ = require('jquery');

    var editor = angular.module('editor', []);


    //加载指令
    require('./editor/directive')(editor);


    //排版指令
    require('./editor/components/gridComponents/rootComponent/rootComponent')(editor);
    require('./editor/components/gridComponents/blockComponent/blockComponent')(editor);
    require('./editor/components/gridComponents/grid444/grid444')(editor);
    require('./editor/components/gridComponents/grid3333/grid3333')(editor);


	//标题指令
//	require('./editor/components/headComponents/headOne/headOne')(editor);


    //文章指令
    require('./editor/components/articleComponents/titleAndBody/titleAndBody')(editor);
    require('./editor/components/articleComponents/paragraph/paragraph')(editor);

    //列表指令
    require('./editor/components/listComponents/listUl/listUl')(editor);
    require('./editor/components/listComponents/listOl/listOl')(editor);
    require('./editor/components/listComponents/listDl/listDl')(editor);

    //图文指令
    require('./editor/components/pictureComponents/pictureLeft/pictureLeft')(editor);
    require('./editor/components/pictureComponents/pictureRight/pictureRight')(editor);

    //表格指令
     require('./editor/components/tableComponents/tableResponsive/tableResponsive')(editor);


    //加载控制器
    require('./editor/controller')(editor);

    //加载服务
    require('./editor/service')(editor);
    //加载过滤器
    //    require('./editor/filter')(editor);


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['editor'])
    });
})
