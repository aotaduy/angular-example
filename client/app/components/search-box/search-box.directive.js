(function() {
    'use strict';

    angular
        .module('moviesApp')
        .directive('searchBox', searchBoxDirective);
    function searchBoxDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/search-box/search-box.html',
            scope: {
                query: '=?',
                autocomplete: '=',
                searchCallback: '='
            },
            bindToController: true,
            controller: SearchBoxController,
            controllerAs: 'searchVm'
        };
    }
    SearchBoxController.$inject = [
        '$filter',
        '$timeout'
    ];

    function SearchBoxController($filter, $timeout) {
        var vm = this,
            timeout;

        vm.searchCallback = vm.searchCallback || angular.noop;
        vm.results = [];
        vm.updatedQuery = updatedQuery;
        vm.itemSelected = itemSelected;
        vm.searchClicked = searchClicked;
        vm.showSearch = false;


        function searchClicked() {
            vm.searchCallback(vm.query || '');
        }
        function itemSelected(aResult) {
            vm.query = aResult;
            vm.showSearch = false;
            $timeout.cancel(timeout);
        }

        function updatedQuery(){
            if(vm.query === ''){
                vm.results = [];
                return;
            }

            vm.showSearch = true;
            // Hide search results after x seconds
            if (timeout) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(function () {
                vm.showSearch = false;
            }, 3000);
            vm.results = $filter('filter')(vm.autocomplete, vm.query);
        }
    }
})();
