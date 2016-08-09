(function () {
  angular.module('compi', [])
  .directive('compiled', function(){
     return {
       restrict: "EA",
       template:"<div>Compiled Directive</div>",
       compile: function(element, attributes){
         console.log('compiled');
         element.addClass('compiled');
         console.log(attributes.index)

           return {
               pre: function(scope, element, attributes, controller, transcludeFn){
                 console.log('preLink', attributes.index);


               },
               post: function(scope, element, attributes, controller, transcludeFn){
                 console.log('postLink', attributes.index);

               }
           }
       },
       controller: function($scope){
         console.log('controller');

       }
     };
  })
})();
