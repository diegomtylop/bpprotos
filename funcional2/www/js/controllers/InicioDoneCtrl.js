angular.module('app.controllers')

//Controlador de la pantalla de viajes planeados
.controller('inicioDoneCtrl', function($scope, $state, $ionicPopup, $ionicModal, ItineraryService,$ionicHistory,$location) {

    console.log('Controlador de los viajes vividos');

    //TODO: MEJORAR ESTO PORQUE SE ESTÁ DISPARANDO CADA QUE SE NAVEGA A UNA PANTALLA DE INICIO
    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        console.log("Entrando a la lista de vividos");
        ItineraryService.getDoneItineraries( function( retDone ){
            debugger;
            $scope.done =  retDone;
        });
        //Con una referencia al service
        //$scope.planned = ItineraryService.planned;
    })

    //Confirmation of removing a itinerary
    $scope.showConfirmRemovePlanned = function( idElim ) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Eliminar itinerario',
            template: '¿Está seguro de eliminar este itinerario?',
            idElim:idElim
        });

        confirmPopup.then(function(res ) {
            if(res) {
                console.log('CONFIRMASTE LA ELIMINACIÓN DEL ITINERARIO '+idElim);
                ItineraryService.deleteItinerary( idElim );

                //console.log('NAVEGA A LA MISMA PANTALLA PARA ACTUALIZAR ');
                //$state.go('planned');

                //$scope.planned = ItineraryService.getPlannedItineraries();
                ItineraryService.getPlannedItineraries( function( retPlanned ){
                    //debugger;
                    console.log('Total de itinerarios planeados: '+retPlanned.length);
                    $scope.planned =  retPlanned;

                    //Actualiza la vista
                    $scope.$apply();
                });
            } else {
                console.log('CANCELASTE LA ELIMINACIÓN');
            }
       });
     };

    $scope.continuePlan = function( selected ){
        debugger;
        console.log('continuePlan '+selected.id);
        ItineraryService.setSelectedItinerary(selected);
        $location.path('/plan/plan_general_info').search({idIt:selected.id});
        //$state.go('plan.planInfoGral', {itiToEdit:selected.id});
    };

    //Shows the form to specify the begin date
    $scope.setInitialDate = function( toBegin ){
        var advInProgress = ItineraryService.adventureInProgress();
        if( advInProgress ){
            alert('Solo puedes estar en una aventura al mismo tiempo');
        }else{
            $scope.modal.show();
            $scope.itinerary= toBegin;
        }
    }

    //Function called when the user want to start a planned travel
    $scope.beginAdventure = function( ){
        debugger;
        if( $scope.itinerary.initialDate ){
            ItineraryService.setCurrent( $scope.itinerary );
            $scope.modal.hide();

            //Disable the back button
            $ionicHistory.nextViewOptions({
                disableBack:true
            });

            //$state.go('inicio');
            $location.path('/index').search({begin_adventure:'true'});
        }else{
            alert('Debes indicar la fecha de inicio');
        }
    }

    //Modal con la lista de opciones para adicionar una actividad
    $ionicModal.fromTemplateUrl('templates/planComenzarAventura.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modal = modal;
    });
});
