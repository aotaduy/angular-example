(function () {
  angular.module('compi', [])
  .directive('dragable', function(){
     return {
       restrict: "A",

       compile: function(element, attributes){
         console.log('compiled dragable');
         element.attr('draggable', true);

           return function(scope, element, attributes, controller, transcludeFn){
                 console.log('postLink');
                 element.on('ondragstart', function(event) {
                   event.dataTransfer.setData('text/plain', attributes.payload);
               });
           }
       }
     };
  });
})();
