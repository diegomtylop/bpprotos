angular.module('app.controllers')
//Controlador del itienrario
.controller('itinerarioCtrl', function($scope, $ionicModal,ItineraryService) {
    console.log('itinerarioCtrl');

    /*
    inherits the scope from inicioCtrl
    */
    $scope.activity = {};
    /*init();

    function init(){
        console.log('ItinerarioCtrl: itinerary'+$scope.itinerary );
        //Get the current from the DB
        ItineraryService.getCurrent( function( itinerarioSalida ){
            debugger;
            console.log('ItinerarioCtrl: va a asignar el itinerario'+$scope.itinerary );
            $scope.itinerary = itinerarioSalida;
            var currDate = new Date();
            var currTimeMS = currDate.getTime() - $scope.itinerary.initialDate.getTime();
            var curDayIndex = Math.ceil( currTimeMS / 86400000);

            $scope.currentDate = currDate;
            $scope.currentDayIndex = curDayIndex - 1;
            $scope.$apply();
        });
    }*/

    /*function initOLD(){
        console.log('ItinerarioCtrl: itinerary'+$scope.itinerary );
        var currDate = new Date();
        var currTimeMS = currDate.getTime() - $scope.itinerary.initialDate.getTime();
        var curDayIndex = Math.ceil( currTimeMS / 86400000);

        $scope.currentDate = currDate;
        $scope.currentDayIndex = curDayIndex - 1;
    }*/

    //Show the modal with the activity detail
    $scope.showActivityDetail = function( activity ){
        $scope.activity = activity;
        $scope.modalDetail.show();
    }

    //Function that adds an empty activity in the selected day
    $scope.createActivity = function(){
        //console.log('Creando nueva actividad vacía');
        currentDayIndex = $scope.currentDayIndex;

        //Creates the new activity
        var newActivity = ItineraryService.createEmptyActivity();

        //Adds the new activity to the day
        ItineraryService.addNewActivity( $scope.itinerary, currentDayIndex, newActivity );

        $scope.activity = newActivity;

        $scope.modalEdit.show();
    }

    $scope.editSelectedActivity = function(){
        $scope.modalDetail.hide();
        $scope.modalEdit.show();
    }

    /*
    Removes the selected activity
    */
    $scope.removeSelectedActivity = function(){

        $scope.confirmAction('Eliminar actividad', 'Está seguro de eliminar esta actividad',function(){
            debugger;

            var curDay = $scope.itinerary.days[ $scope.currentDayIndex]

            var indexAct = curDay.activities.indexOf( $scope.activity);

            if( indexAct >= 0){
                curDay.activities.splice( indexAct, 1 );
                ItineraryService.saveItinerary( $scope.itinerary);
            }

            $scope.modalDetail.hide();

        }, function(){
            console.log('Cancel del caller');
        });
    }

    $scope.guardarActividad = function(){
        ItineraryService.saveItinerary( $scope.itinerary);

        $scope.updateBudget( $scope.itinerary );

        $scope.modalEdit.hide();
    }

    //Hides the edit activity modal
    $scope.cancelarAddActivity = function(){
        $scope.modalEdit.hide();
    }


    //Activity detail modal
    $ionicModal.fromTemplateUrl('templates/gralActivityDetail.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modalDetail = modal;
    });

    //Activity detail modal
    $ionicModal.fromTemplateUrl('templates/gralEditarActividad.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modalEdit = modal;
    });
});
