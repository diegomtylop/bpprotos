angular.module('app.controllers')
//Controlador del itienrario
.controller('expensesCtrl', function($scope,$ionicModal,ItineraryService) {
    console.log('Desde el expensesCtrl');

    /*
    inherits the scope from inicioCtrl
    */
    $scope.currentExpense = {};
    $scope.actTabActive = true;
    $scope.othTabActive = false;

    //Flag that indicates if the expensed is been created or updated
    $scope.creatingExpense = true;
    $scope.indexExpense = 0;

    $scope.setActiveTab = function( tabToActive ){

      if( tabToActive == 'ACT'){
        $scope.actTabActive = true;
        $scope.othTabActive = false;
      }

      if( tabToActive == 'OTH'){
        $scope.actTabActive = false;
        $scope.othTabActive = true;
      }
    }
    //Function that register a empty new activity in the selected day
    $scope.registerExpense = function(){
        $scope.currentExpense = {cost:0};
        $scope.indexExpense = undefined;
        $scope.creatingExpense = true;
        $scope.modalEdit.show();
    }

    //hide the expense dialog
    $scope.hideModalExpense = function(){
        $scope.modalEdit.hide();
    }

    $scope.editExpense = function( indexToEdit, toEdit ){
        $scope.currentExpense= toEdit;
        $scope.creatingExpense = false;
        $scope.modalEdit.show();
        $scope.indexExpense = indexToEdit;
    }

    /*
    Removes the selected activity
    */
    $scope.removeExpense = function( indexExpToRemove ){

        $scope.confirmAction('Eliminar gasto', 'Está seguro de eliminar este gasto',function(){
            ItineraryService.removeExpense( $scope.itinerary, indexExpToRemove);
            $scope.updateBudget( $scope.itinerary );
            $scope.modalEdit.hide();
        }, function(){
            console.log('Cancel del caller');
        });
    }

    $scope.saveExpense = function( ){
        debugger;
        var itin = $scope.itinerary;
        var newExp = $scope.currentExpense;
        var index = $scope.indexExpense;

        //var indexDay = $scope.currentDayIndex;
        ItineraryService.saveExpense( itin, newExp, index );

        $scope.updateBudget( $scope.itinerary );
        $scope.modalEdit.hide();
    }

    $scope.deleteExpense = function( ){
        alert('Borrará');
    }

    //ides the edit activity modal
    $scope.cancelAddExpese = function(){
        $scope.modalEdit.hide();
    }

    //Function that allows to modify the planned budget
    $scope.editBudget = function(){
        console.log('Budget limit exceded');
        //Expense detail modal
        $ionicModal.fromTemplateUrl('templates/gralAlertaPresupup.html',{
            scope:$scope,
            animation:'slide-in-up'
        }).then( function(modal){
            $scope.editBudgetLimit = true;
            $scope.modalEditBudget = modal;
            $scope.modalEditBudget.show();
        });
    }

    //Overrides the function in InicioCtrl
    $scope.saveNewBudgetLimit = function(){
        ItineraryService.saveItinerary( $scope.itinerary );
        $scope.modalEditBudget.hide();

        $scope.updateBudget( $scope.itinerary );
    }

    $scope.hideAlertBudget = function(){
        $scope.modalEditBudget.hide();
    }

    //Expense detail modal
    $ionicModal.fromTemplateUrl('templates/gralNuevoGasto.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modalEdit = modal;
    });
});
