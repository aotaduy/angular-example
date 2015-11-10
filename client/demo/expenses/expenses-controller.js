(function() {
    'use strict';

    // Create module and controller
    angular
        .module('expensesApp',['ui.date'])
        .controller('expensesController', expensesController);


    expensesController.$inject = [
    ];

    function expensesController() {
        
		// Controller as viewModel        
		var vm = this;
		
        // Initialization
        vm.list = [];
		vm.listTotal = [];
        
		vm.itemText = '';

        // Controller methods
        vm.add = add;
        vm.remove = remove;

        /* Adds an item to the todo list */
        function add(descTxt,dateTxt,typeDdl,amountTxt) {
           
		   vm.list.push({desc:descTxt,date:dateTxt, typeExpense:typeDdl, amount:amountTxt});
		   
		    var searchTerm = typeDdl;
           
            var index = -1;
            
			for(var i = 0, len = vm.listTotal.length; i < len; i++) {
                if (vm.listTotal[i].type === searchTerm) {
                    index = i;
                    break;
                }
            }
           
            if(index == -1){
                vm.listTotal.push({type:typeDdl, total:amountTxt});
            }
            else{
                vm.listTotal[index].total = parseInt(vm.listTotal[index].total) + parseInt(amountTxt);       
            }
        }

		
        function remove(indexList) {
			
			var amountTxt = vm.list[indexList].amount;
			var typeExpenseTxt = vm.list[indexList].typeExpense;
			
			var indexTotal = -1;
			
			for(var i = 0, len = vm.listTotal.length; i < len; i++) {
                if (vm.listTotal[i].type === typeExpenseTxt) {
                    indexTotal = i;    
					break;
                }
            }		
			
			vm.list.splice(indexList,1);
			
			vm.listTotal[indexTotal].total = parseInt(vm.listTotal[indexTotal].total) - parseInt(amountTxt);   
			
			/*			
			var countAmountBytype = 0;
			
			for(var i = 0, len = vm.listTotal.length; i < len; i++) {
                if (vm.listTotal[i].type === typeExpenseTxt) {
                    countAmountBytype++;    
                }
            }		
           
            if(countAmountBytype = 1){
				vm.listTotal.splice(vm.list.indexOf(typeExpenseTxt), 1)		
            }
            else{
                vm.listTotal[index].total = parseInt(vm.listTotal[index].total) - parseInt(amountTxt);     
            }*/        		
        }			
    }	 
})();
