define(["require"],function(e){return function(t){t.directive("blockComponent",function(){return{scope:!0,restrict:"E",templateUrl:e.toUrl("./blockComponent.html"),replace:!0,controller:["$scope",function(e){e.content=e.$parent.item}],link:function(e,t){var n=t.parent()[0];n.content=e.content=e.content||{componentName:"blockComponent",tree:[{}]},e.add=function(t){e.content.tree.splice(t+1,0,{})},e.remove=function(t){e.content.tree.splice(t,1)}}}})}});
