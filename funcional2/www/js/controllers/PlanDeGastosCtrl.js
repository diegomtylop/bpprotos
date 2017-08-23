angular.module('app.controllers')
//Controlador de la pantalla de plan de gastos
.controller('planDeGastosCtrl', function($scope,$ionicModal,$ionicPopup, ItineraryService) {
    $scope.currentExpense = {name:'gasto',cost:0};
    
    /*
    Calculate the Other expenses cost
    */
    function calculateTotalOtherExpenses(){
        console.log('calculando el total de gastos desde el controller');
        var total = ItineraryService.calculateTotalOtherExpenses( $scope.itinerary );
        return total;
    }
    
    /*
    Calculate the cost based on activitie's cost
    */
    function calculateCostActivities(){
        //debugger;
        console.log('Llamamos el service');
        var costSerivice = ItineraryService.calculateCostActivities( $scope.itinerary );
        return costSerivice;
    }
    /*
    Evento disparado cada vez que se navega a la pantalla de gastos
    en este momento se calculan los gastos totales
    */
    $scope.$on('$ionicView.enter', function() {
        console.log("Entrando a la pantalla de presupuesto");
        $scope.totalcostOther = calculateTotalOtherExpenses();
        $scope.totalCostActivities = calculateCostActivities();
        //Con una referencia al service
        //$scope.planned = ItineraryService.planned;    
    })
    
    //Modal con la lista de opciones para adicionar una actividad
    $ionicModal.fromTemplateUrl('templates/gralNuevoGasto.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modalAddExpense = modal;
    });
    
    $scope.newExpense = function(){
        $scope.currentExpense = {name:'',cost:1};
        $scope.modalAddExpense.show();
    }
    
    //TODO: ESTO DEBERÍA IR PARA EL SERVICE
    $scope.saveExpense = function(){
        debugger;
        console.log('Saving expense');
        if( !$scope.itinerary.expenses ){
            $scope.itinerary.expenses = [];
        }
        $scope.itinerary.expenses.push( $scope.currentExpense );
        
        $scope.currentExpense = {};
        
        //Calculeta the total cost
        $scope.totalcostOther = calculateTotalOtherExpenses();
        $scope.modalAddExpense.hide();
    }
    
    $scope.hideModalExpense = function(){
        $scope.modalAddExpense.hide();
    }
    
    $scope.editExpense = function( toEdit ){
        console.log('Editing');
        $scope.currentExpense = toEdit;
        $scope.modalAddExpense.show();
    }
    //Confirmation of removing a expense
    $scope.showConfirmRemoveExpense = function( toRemove ) {
        $scope.currentExpense = toRemove;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Eliminar gasto',
            template: '¿Está seguro de eliminar este gasto? <p><b>'+toRemove.name+'</b><p>'
        });
         
        confirmPopup.then(function(res ) {
            if(res) {
                console.log('CONFIRMASTE LA ELIMINACIÓN ');
                var indexToRemove = $scope.itinerary.expenses.indexOf( $scope.currentExpense );
        
                if( indexToRemove > -1 ){
                    $scope.itinerary.expenses.splice( indexToRemove,1  );
                }
            } else {
            console.log('CANCELASTE LA ELIMINACIÓN');
            }
       });
     };
    //Function called when the budget limit is changed
    $scope.budgetLimitChanged = function(){
        ItineraryService.saveItinerary( $scope.itinerary);
    }
    
    //sets the budget limit to 0 when the toggle is set to OFF
    $scope.budgetToggleChanged = function(){
        if( !$scope.itinerary.alertBudgetLimit ){
            $scope.itinerary.budgetLimit = null;
        }
    }
})