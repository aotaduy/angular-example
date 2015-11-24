describe('Controller: expensesController', function () {
    'use strict';
    var controller,
        scope;
    // Refresh the $filter every time.
    beforeEach(module('expensesApp'));
    beforeEach(inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            controller = $controller('ExpenseController',
                {$scope: scope});
        })
    );

    it('should start empty', function () {
        expect(controller.expenses.length).to.equal(0);
    });

    it('should add/remove items', function () {
        //Create
            //First expense
            controller.expense.date = '09/06/1988';
            controller.expense.type = 'transportation';
            controller.expense.description = 'Testing Expense';
            controller.expense.amount = 1000;
            controller.newExpense();

            expect(controller.expenses.length).to.equal(1);

            //Second expense
            controller.expense.date = '01/01/2015';
            controller.expense.type = 'food';
            controller.expense.description = 'Testing Expense 2';
            controller.expense.amount = 10000;

            controller.newExpense();

            expect(controller.expenses.length).to.equal(2);

        //Delete:
            controller.delete(controller.expense);
            expect(controller.expenses.length).to.equal(1);

        //Edit:
        //controller.expense = {};
        //controller.expense.date = '09/06/1988';
        controller.expense.type = 'transportation';
        //controller.expense.description = 'Testing Expense';
        //controller.expense.amount = 1000;
        controller.update(controller.expense);
        expect(controller.expenses[0].type).to.equal('financial');
    });

});

//newExpense  OK
//delete      OK
//update

//gettotal
//gettotalbytype
//setcolor


//vm.update = function(index, exp){
//    var selectedExpense = $filter('filter')(vm.expenses, {id: exp.id})[0];
//    selectedExpense.date = exp.date;
//    selectedExpense.type = exp.type;
//    selectedExpense.description = exp.description;
//    selectedExpense.amount = exp.amount;
//
//    vm.isEditing = false;
//    vm.expense = {};
//};
//
