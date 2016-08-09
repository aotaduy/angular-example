(function() {
    'use strict';

    var counter = 0;
    // Create module and controller
    function log(string) {
      console.log(counter + ' - ' + string);
      counter++;
    }

    angular
        .module('scopeDigestDemo', [])
        .directive('testDirective', function () {


          return {
              priority: 0,
              template: function functionName() {
                log('template');
              },
              transclude: false,
              restrict: 'E',
              templateNamespace: 'html',
              scope: false,
              controller: function($scope, $element, $attrs, $transclude) {
                log('controller');
              },
              controllerAs: 'stringIdentifier',
              compile: function compile(tElement, tAttrs, transclude) {
                return {
                  pre: function preLink(scope, iElement, iAttrs, controller) {
                    log('prelink');

                  },
                  post: function postLink(scope, iElement, iAttrs, controller) {
                  log('postlink') ;
                  scope.$watch('testVar', function (newV, oldV) {
                    log('watch ' + oldV + ' - ' + newV);
                  });
                }
                }
              }
            }
        });



})();
