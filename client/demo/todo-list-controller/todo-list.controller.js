(function() {
    'use strict';

    // Create module and controller
    angular
        .module('todoListControllerDemo', [])
        .controller('TodoListController', TodoListController);


    TodoListController.$inject = [
    ];

    function TodoListController() {
        // Controller as viewModel
        var vm = this;
        // Initialization
        vm.list = [];
        vm.itemText = '';

        // Controller methods
        vm.add = add;
        vm.remove = remove;

        /* Adds an item to the todo list */
        function add(text) {
            vm.list.push({done: false, text: text});
        }

        /* Removes the item in the list with index: $index*/
        function remove(index) {
            vm.list.splice(index,1);
        }
    }
})();
