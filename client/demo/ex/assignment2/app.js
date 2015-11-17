angular
	.module('expensesApp', []);

angular
	.module('expensesApp')
	.controller('ExpenseController', ExpenseController);


ExpenseController.$inject = ['$scope'];

function ExpenseController($scope){
	vm = this;

	vm.expenses = []; 
	vm.expense = {};
	vm.types = ['food', 'transportation', 'lodging', 'financial', 'sales', 'other.'];
	vm.isEditing = false;
    
    vm.total = 0;

    vm.newExpense = function(){
    	console.debug(vm.expense);
    	vm.expenses.push(vm.expense);
    	vm.expense = {};
    };

    vm.delete = function(exp){
    	console.debug(exp);
    	vm.expenses.splice(vm.expenses.indexOf(exp),1);
    };

    vm.edit = function(exp){
    	vm.expense = angular.copy(exp);
    	vm.isEditing = true;
    };

    vm.update = function(exp){
    	vm.expenses.splice(vm.expenses.indexOf(exp), 1);
    	exp = vm.expense;
    	vm.isEditing = false;


    	vm.expenses.push(vm.expense);

		vm.expense = {};
    };

    vm.cancel = function(){
    	vm.expense = {};
    };

}