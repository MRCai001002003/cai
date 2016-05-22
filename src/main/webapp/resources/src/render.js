define(function(require) {
    var angular = require('angular');
    var $ = require('jquery');


    var render = angular.module('render', []);


    //加载指令
    require('./render/directive')(render);

    //排版指令
    require('./render/pc/gridComponents/blockComponent/blockComponent')(render);
    require('./render/pc/gridComponents/grid444/grid444')(render);
    require('./render/pc/gridComponents/grid3333/grid3333')(render);

    //文章指令
    require('./render/pc/articleComponents/titleAndBody/titleAndBody')(render);
    require('./render/pc/articleComponents/paragraph/paragraph')(render);

    //列表指令
    require('./render/pc/listComponents/listUl/listUl')(render);
    //require('./render/pc/listComponents/listOl/listOl')(render);

    //图文指令
    //require('./render/pc/pictureComponents/pictureLeft/pictureLeft')(render);
    //require('./render/pc/pictureComponents/pictureRight/pictureRight')(render);


    //加载控制器
    require('./render/controller')(render);

    //加载服务
    require('./render/service')(render);

    //加载过滤器
    require('./render/filter')(render);


    angular.element(document).ready(function() {
        angular.bootstrap(document, ['render'])
    });
})
