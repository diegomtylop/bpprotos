angular.module('app.controllers')
//Controlador de la pantalla de inicio
.controller('IndexCtrl', function($scope,CacheService, ItineraryService, CacheService,$state, $location,$ionicModal) {
    console.log('EJECUTANDO SCRIPTS DE INDEX CONTROLLER');
    debugger;

    $scope.variableGlobalDiego = Math.random()*1000;
    $scope.common = {};

    //init();

    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        console.log('INDEX CONTROLLER: ViewEnter');

        var parRequest = $location.search();

        console.log('Parametro del request '+parRequest);
        //If the user just select the option to begin adventure
        if( parRequest &&  parRequest.viajeEnProgreso ){
            console.log('Viaje en proceso: Debe inicializar');
            initContinueAdv();
        }else  if( parRequest &&  parRequest.begin_adventure ){ //If the user just select the option to begin adventure
            console.log('Iniciar aventura: Debe inicializar');
            initBeginAdv();
        }

    });

    function initBeginAdv(){
      console.log('initiAdventure: Load the itinerary info');
      ItineraryService.getCurrent( function( itSalida ) {
          console.log('Este fue el itinerario retornado por la base de datos '+itSalida+' id'+itSalida.id );
          $scope.itinerary =itSalida;
          loadCurrentItineraryInfo();
      });
    };

    function initContinueAdv(){
        console.log('Hay un itinerario en proceso, DE CACHE');
        $scope.itinerary = CacheService.getSelected();
        loadCurrentItineraryInfo();
    };

    function initContinueAdvSinCache(){
        console.log('INICIO CONTROLLER: init');

        //var advInProgress = ItineraryService.adventureInProgress();


        //If there is an adventure in progress
        //if( advInProgress ){
            console.log('Hay un itinerario en proceso');
            //Load the info for the current itinerary
            ItineraryService.getCurrent( function( itSalida ) {
                console.log('Este fue el itinerario retornado por la base de datos '+itSalida+' id'+itSalida.id );
                $scope.itinerary =itSalida;
                loadCurrentItineraryInfo();
          });
        //}
    };

    /*
    function that loads the current itinerary's info waiting for
    the database initialization if is necessary
    */
    function loadCurrentItineraryInfo(){
        console.log('Index.loadCurrentItineraryInfo');
        //Checks id the DB is already initialized
        debugger;
        //  $scope.itinerary =itSalida;
        if( $scope.itinerary != null ){
              console.log('vamos a actualizar el resumen');

              debugger;

              //Variable shared between children scopes
              $scope.common.summary= CacheService.getSummaryInfo();


              if( $scope.itinerary.budget - $scope.common.summary.totalSpent < $scope.itinerary.budgetLimit ){
                  $scope.budgetExceded=true;
              }else{
                  $scope.budgetExceded=false;
              }

            /*  var initialDate = $scope.common.summary.initialDate;
              var currDate = new Date();
              var currTimeMS = currDate.getTime() - initialDate.getTime();
              var curDayIndex = Math.ceil( currTimeMS / 86400000);*/

              //Variable shared in the current itinerary screens
              //$rootScope = {};
              /*$scope.common.currentDayIndex = curDayIndex - 1;
              $scope.common.currentDate = currDate;*/

              $scope.travelInProgress = true;

              //Actualiza la pantalla con los datos del scope
              $scope.$apply();
        }else {
            console.log('NO HAY ITINERARIO EN EL SCOPE');
        }
    }

    /*
    function that loads the current itinerary's info waiting for
    the database initialization if is necessary
    */
    function loadCurrentItineraryInfoSinCache(){
        console.log('InicioCtr.loadCurrentItineraryInfo');
        //Checks id the DB is already initialized
        debugger;
        //  $scope.itinerary =itSalida;
          if( $scope.itinerary != null ){
              console.log('vamos a actualizar el resumen');
              updateSummary( $scope.itinerary );

              $scope.common.initialDate = $scope.itinerary.initialDate;
              var currDate = new Date();
              var currTimeMS = currDate.getTime() - $scope.itinerary.initialDate.getTime();
              var curDayIndex = Math.ceil( currTimeMS / 86400000);

              //Variable shared in the current itinerary screens
              //$rootScope = {};
              $scope.common.currentDayIndex = curDayIndex - 1;
              $scope.common.currentDate = currDate;

              $scope.travelInProgress = true;

              //Actualiza la pantalla con los datos del scope
              $scope.$apply();
          }else {
            console.log('NO HAY ITINERARIO EN EL SCOPE');
          }

    }

    //Update the info showed in the travel summary
    /*function updateSummary( curItinerary ){
        debugger;

        //Variable shared between children scopes
        $scope.common.summary={};
        $scope.common.summary.totalSpent = ItineraryService.getTotalExpenses( curItinerary );
        $scope.common.summary.endDate = ItineraryService.getEndDate( curItinerary );
        $scope.common.summary.daysLeft = ItineraryService.getLeftDays( curItinerary);
        $scope.common.summary.totalActivities = ItineraryService.getTotalActivities( curItinerary );

        if( curItinerary.budget - $scope.common.summary.totalSpent < curItinerary.budgetLimit ){
            $scope.budgetExceded=true;
        }else{
            $scope.budgetExceded=false;
        }
    }*/
});
