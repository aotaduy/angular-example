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
		vm.oldAmount = 0;

        // Controller methods
        vm.add = add;
        vm.remove = remove;
		vm.edit = edit;
		vm.cancel = cancel;

        /* Adds an item to the todo list */
        function add(descTxt,dateTxt,typeDdl,amountTxt) {           
		    vm.list.push({desc:descTxt,date:dateTxt, typeExpense:typeDdl, amount:amountTxt, editing:false});		             
			calculateTotals();
			cleanForm();
        }

		/* Remove and item to the expenses list */
        function remove(indexList) {			
			vm.list.splice(indexList,1);			
			calculateTotals();					      
        }
		
		/* Edit a item from expenses list */
		function edit(indexList) {										
			
			vm.oldAmount = vm.list[indexList].amount;
			
			var isEditing = vm.list[indexList].editing;
			
			if(isEditing){
				vm.list[indexList].editing = false;
				calculateTotals();
				
			}else{
				vm.list[indexList].editing = true;
			}					
        }
		
		function cancel(indexList) {										
			vm.list[indexList].editing = false;	
			vm.list[indexList].amount = vm.oldAmount;			
			calculateTotals();
        }

		/* Clean form test */
		function cleanForm()
		{		        
			vm.descTxt = '';
			vm.amountTxt = '';
			vm.dateTxt = '';	
		}
		
		
		function calculateTotals()
		{
			vm.listTotal.splice(0,vm.listTotal.length);
			
			for(var i = 0, len = vm.list.length; i < len; i++){
			
				var type = vm.list[i].typeExpense;
				
				var indextTotal = getIndexFromTotalListByType(type)
				
				if(indextTotal == -1){
					vm.listTotal.push({type:vm.list[i].typeExpense, total:vm.list[i].amount});
				}
				else{
					vm.listTotal[indextTotal].total = parseInt(vm.listTotal[indextTotal].total) + parseInt(vm.list[i].amount);       
				}
			}			
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
