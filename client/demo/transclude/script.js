(function (argument) {
    angular.module('transcludeExample', [])
     .directive('pane', function(){
        return {
          restrict: 'E',
          transclude: true,
          scope: { title:'@' },
          template: '<div style="border: 1px solid black;">' +
                      '<div style="background-color: gray">{{title}}</div>' +
                      '<ng-transclude></ng-transclude>' +
                    '</div>'
        };
    })
    .controller('ExampleController', ['$scope', function($scope) {
      $scope.title = 'Lorem Ipsum';
      $scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
    }]);
})();
