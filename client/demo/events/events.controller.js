(function() {
    angular.module('eventExample', [])
    .controller('EventController', EventsController);

    EventsController.$inject = ['$scope'];

    function EventsController($scope) {
        $scope.count = 0;
          $scope.$on('MyEvent', function() {
            $scope.count++;
          });
    };
})();
