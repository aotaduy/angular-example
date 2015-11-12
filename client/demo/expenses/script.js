(function() {
    'use strict';

    // Create module and controller
    angular
        .module('expensesDemo', [])
        .controller('ExpensesController', ['$scope', '$filter', ExpensesController]);

    ExpensesController.$inject = [
    ];

    function ExpensesController($scope, $filter) {
        // Controller as viewModel
        var vm = this;
        // Initialization
        vm.list = [];
        // Expenses types
        vm.expensesTypes = [
          {name: "food", value: "food"},
          {name: "transportation", value: "transportation"},
          {name: "lodging", value: "lodging"},
          {name: "financial", value: "financial"},
          {name: "sales", value: "sales"},
          {name: "other", value: "other"}
        ];

        // Controller methods
        vm.add = add;
        vm.remove = remove;

        // Total amount
        vm.total = total;

        /* Adds an item to the todo list */
        function add(date, type, description, amount) {
            vm.list.push({date: date, type: type, description: description, amount: amount});
        }

        /* Removes the item in the list with index: $index*/
        function remove(index) {
            vm.list.splice(index,1);
        }

        // Calculate expense total.
        function total(type) {
          var sum = 0;
          var list = vm.list;
          if (type !== '') {
            // filter by expense type
            list = $filter('filter')(vm.list, { type: type });
          }
          angular.forEach(list, function(expense, key) {
            sum += expense.amount;
          });
          return sum;
        }
    }
})();
