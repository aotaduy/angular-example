angular
    .module('expensesApp')
    .controller('ExpenseController', ExpenseController);


ExpenseController.$inject = ['$filter'];

function ExpenseController($filter){
    vm = this;

    vm.expenses = [];
    vm.expense = {};
    vm.types = ['food', 'transportation', 'lodging', 'financial', 'sales', 'other.'];
    vm.isEditing = false;

    vm.total = 0;

    vm.newExpense = function(){
        vm.expense.id = vm.expenses.length + 1;
        vm.expenses.push(vm.expense);
        //console.debug(vm.expense);
        vm.expense = {};
    };

    vm.delete = function(exp){
        vm.expenses.splice(vm.expenses.indexOf(exp),1);
    };

    vm.edit = function(exp){
        vm.expense = angular.copy(exp);
        vm.isEditing = true;
    };

    vm.update = function(index, exp){
        var selectedExpense = $filter('filter')(vm.expenses, {id: exp.id})[0];
        selectedExpense.date = exp.date;
        selectedExpense.type = exp.type;
        selectedExpense.description = exp.description;
        selectedExpense.amount = exp.amount;

        vm.isEditing = false;
        vm.expense = {};
    };

    vm.cancel = function(){
        vm.expense = {};
        vm.isEditing = false;
    };

    vm.getTotal = getTotal;
    vm.getTotalByType = getTotalByType;
    vm.setColor = setColor;

    function getTotal(){
        var totals = 0;
        angular.forEach(vm.expenses, function(key, value){
            totals += key.amount;
        });
        return totals;
    }

    function getTotalByType(type){
        var totals = 0;
        angular.forEach(vm.expenses, function(key, value){
            if (key.type == type){
                totals += key.amount;
            }
        });
        return totals;
    }

    function setColor(type){
        console.log(type);
        switch (type){
            case 'food':
                return { 'background-color': "lightblue" };
            case 'transportation':
                return { 'background-color': "lightcoral" };
            case 'lodging':
                return { 'background-color': "lightgray" };
            case 'financial':
                return { 'background-color': "lightgreen" };
            case 'sales':
                return { 'background-color': "lightskyblue" };
            case 'other.':
                return { 'background-color': "lightsalmon" };
        }
    }
}












