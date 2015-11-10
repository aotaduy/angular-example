(function() {
    'use strict';

    // Create module and controller
    angular
        .module('ExpensesDemo', [])
        .controller('ExpensesController', ExpensesController);


    ExpensesController.$inject = [];

    function ExpensesController() {
        // Controller as viewModel
        var vm = this;
        // Initialization
        vm.total = 0;
        vm.etype = ""
        vm.list = [{expense:"Food", amount:0},{expense:"Transportation", amount:0},
                    {expense:"Lodging", amount:0},{expense:"Financial", amount:0},{expense:"Sales", amount:0},{expense:"Other", amount:0}];
        vm.expenseList=[];  
       
        vm.currentDate = getCurrentDate();        

        // Controller methods
        vm.add = add;
        vm.remove = remove;

        /* Adds an item to the todo list */
        function add(date,type,description,text) {
           // vm.list.push({done: false, text: text});
           vm.total = vm.total + Number(text);
           vm.etype = type;

           for(var i = 0; i < vm.list.length; i++){
            if(vm.list[i].expense == type){
                vm.list[i].amount = vm.list[i].amount + Number(text);
                break;
            }
           }

           vm.expenseList.push({date:date,expensetype: type, description: description, amount: Number(text)});

           vm.expenseDate = getCurrentDate();
           vm.expenseDescription = "";
           vm.expenseType = "";
           vm.expenseAmount="";

        }

         function remove(index) {

            vm.total = vm.total - vm.expenseList[index].amount;
            for(var i = 0; i < vm.list.length; i++){
                if(vm.list[i].expense == vm.expenseList[index].expensetype){
                vm.list[i].amount = vm.list[i].amount - vm.expenseList[index].amount;
                break;
            }}

            
            vm.expenseList.splice(index,1);
        }

        function getCurrentDate(){

            var date = new Date();
            var day = date.getDate();
            var monthIndex = date.getMonth()+1;
            var year = date.getFullYear();

            var currentDate;

            if(day<10 && monthIndex<10){
                currentDate = year + "-0" + monthIndex + "-0" + day;    
            }
            else if(day<10){
                currentDate = year + "-" + monthIndex + "-0" + day;       
            }
            else if(monthIndex<10){
                currentDate = year + "-0" + monthIndex + "-" + day;       
            }
            else{
                currentDate = year + "-" + monthIndex + "-" + day; 
            }

            return currentDate;             
        }

        
    }
})();
