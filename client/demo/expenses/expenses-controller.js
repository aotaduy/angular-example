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
        vm.types = ["food","transportation","lodging","financial","other"];
		vm.list = [];
		vm.listTotal = []; 

        // Controller methods
        vm.add = add;
        vm.remove = remove;
		vm.edit = edit;

        /* Adds an item to the todo list */
        function add(descTxt,dateTxt,typeDdl,amountTxt) {
           
		    vm.list.push({desc:descTxt,date:dateTxt, typeExpense:typeDdl, amount:amountTxt});
		              
			var index = getIndexFromTotalListByType(typeDdl);
           
            if(index == -1){
                vm.listTotal.push({type:typeDdl, total:amountTxt});
            }
            else{
                vm.listTotal[index].total = parseInt(vm.listTotal[index].total) + parseInt(amountTxt);       
            }
			
			cleanForm();
        }

		/* Remove and item to the expenses list */
        function remove(indexList) {
			
			var amountTxt = vm.list[indexList].amount;
			var typeExpenseTxt = vm.list[indexList].typeExpense;
			
			var indexTotal = getIndexFromTotalListByType(typeExpenseTxt);
						
			vm.list.splice(indexList,1);
			
			vm.listTotal[indexTotal].total = parseInt(vm.listTotal[indexTotal].total) - parseInt(amountTxt);   					      	
        }
		
		/* Edit a item from expenses list */
		function edit(indexList) {
			
			var amountTxt = vm.list[indexList].amount;
			var typeExpenseTxt = vm.list[indexList].typeExpense;
			
			var indexTotal = getIndexFromTotalListByType(typeExpenseTxt);
						
			vm.list.splice(indexList,1);
			
			vm.listTotal[indexTotal].total = parseInt(vm.listTotal[indexTotal].total) - parseInt(amountTxt);   					      	
        }

		/* Clean form test */
		function cleanForm()
		{
		        
			vm.descTxt = '';
			vm.amountTxt = '';
			vm.dateTxt = '';	
		}
		
		/* Get the index from total list */
		function getIndexFromTotalListByType(searchTerm)
		{
		   var index = -1;
            			
			for(var i = 0, len = vm.listTotal.length; i < len; i++) {
                if (vm.listTotal[i].type === searchTerm) {
                    index = i;
                    break;
                }
            }
			
			return index;
		}
		
		
    }	 
})();
