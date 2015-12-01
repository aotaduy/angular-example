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
        vm.editingData = [];    
    
       
        vm.currentDate = getCurrentDate();   
        vm.expenseDate = vm.currentDate;

        // Controller methods
        vm.add = add;
        vm.remove = remove;
        vm.edit = edit;
        vm.cancel = cancel;
        vm.save = save;

        /* Adds an item to the todo list */
        function add(date,type,description,text) {
           increaseExpenses(text,type)          

           vm.expenseList.push({date:date,expensetype: type, description: description, amount: Number(text)});
           vm.editingData.push(false);

           vm.expenseDate = getCurrentDate();
           vm.expenseDescription = "";
           vm.expenseType = "";
           vm.expenseAmount="";

        }

         function remove(index) {
            reduceExpenses(index);
            vm.expenseList.splice(index,1);
        }

        function increaseExpenses(text,type){
            vm.total = vm.total + Number(text);
            vm.etype = type;

            for(var i = 0; i < vm.list.length; i++){
                if(vm.list[i].expense == type){
                    vm.list[i].amount = vm.list[i].amount + Number(text);
                    break;
                }
           }
        }

        function reduceExpenses(index){
            vm.total = vm.total - vm.expenseList[index].amount;
            for(var i = 0; i < vm.list.length; i++){
                if(vm.list[i].expense == vm.expenseList[index].expensetype){
                vm.list[i].amount = vm.list[i].amount - vm.expenseList[index].amount;
                break;
            }}
        }

        function edit(index) {
            vm.expenseList[index].newValue=vm.expenseList[index].amount;
            vm.editingData[index]=true;
            
        }   

        function cancel(index) {
            vm.editingData[index]=false;
            
        }    
        function save(index,text,type) {
            reduceExpenses(index);
            increaseExpenses(text,type)
            vm.expenseList[index].amount=Number(text);
            vm.editingData[index]=false;
            
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
