angular.module('app.controllers')
//Controlador de la pantalla de inicio
.controller('inicioCtrl', function($scope,IndexedDBService, ItineraryService,CacheService,$state, $location,$ionicModal) {
    console.log('EJECUTANDO SCRIPTS DE INICIO CONTROLLER');
    debugger;

    $scope.variableGlobalDiego = Math.random()*1000;
    $scope.common = {};
    $scope.itinerary = {};

    //init();

    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        console.log('INICIO CONTROLLER: ViewEnter');

        var parRequest = $location.search();

        console.log('Parametro del request '+parRequest.continue_adventure);
        //If the user just select the option to begin adventure
        if( parRequest &&  parRequest.continue_adventure ){
            console.log('continuar el viaje');
            initItActual();
        }
    });

    function initItActual(){
      console.log('initItActual: Load the itinerary info from cache');
      $scope.itinerary = CacheService.getSelected();
      loadCurrentItineraryInfo();
    };

    function initItActualSINCACHE(){
      console.log('initItActual: Load the itinerary info');
      ItineraryService.getCurrent( function( itSalida ) {
          console.log('Este fue el itinerario retornado por la base de datos '+itSalida+' id'+itSalida.id );
          $scope.itinerary =itSalida;
          loadCurrentItineraryInfo();
      });
    };

    /*
    function that loads the current itinerary's info waiting for
    the database initialization if is necessary
    TODO: USAR LA CACHE
    */
    function loadCurrentItineraryInfo(){
        console.log('InicioCtr.loadCurrentItineraryInfo');
        //Checks id the DB is already initialized
        debugger;
        //  $scope.itinerary =itSalida;
          if( $scope.itinerary != null ){
              console.log('vamos a actualizar el resumen');
              updateSummary();

              //Actualiza la pantalla con los datos del scope
              $scope.$apply();
          }else {
            console.log('NO HAY ITINERARIO EN EL SCOPE');
          }

    }


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

    /*
    function that loads the current itinerary's info waiting for
    the database initialization if is necessary
    */
    function loadCurrentItineraryInfoOLD(){
        console.log('InicioCtr.loadCurrentItineraryInfo');
        //Checks id the DB is already initialized
        var dbInitialized = ItineraryService.isDBInitialized();

        console.log('dbInitialized??:'+dbInitialized);
        if( dbInitialized ){
            debugger;
            console.log('SI ESTÁ INICIALIZADA, CONSULTA LA INFORMACIÓN');
            ItineraryService.getCurrent( function( itSalida ){
                $scope.itinerary =itSalida;
                if( $scope.itinerary != null ){
                    updateSummary( $scope.itinerary );

                    $scope.initialDate = $scope.itinerary.initialDate;
                    var currDate = new Date();
                    var currTimeMS = currDate.getTime() - $scope.itinerary.initialDate.getTime();
                    var curDayIndex = Math.ceil( currTimeMS / 86400000);

                    //Variable shared in the current itinerary screens
                    //$rootScope = {};
                    $scope.common.currentDayIndex = curDayIndex - 1;
                    $scope.common.currentDate = currDate;


                    //Actualiza la pantalla con los datos del scope
                    $scope.$apply();
                }
            });

        }else{
            //If the DB is not already initialized wait a moment and try again
            console.log('NO ESTÁ INICIALIZADA, ESPERA UN MOMENTO');
            setTimeout( loadCurrentItineraryInfo,300);
        }
    }

    //Update the info showed in the travel summary
    function updateSummary( ){
        debugger;
        var curItinerary = $scope.itinerary;
        //Variable shared between children scopes
        $scope.common.summary={};
        $scope.common.summary= CacheService.getSummaryInfo();

        if( curItinerary.budget - $scope.common.summary.totalSpent < curItinerary.budgetLimit ){
            $scope.budgetExceded=true;
        }else{
            $scope.budgetExceded=false;
        }

        var initialDateIti = $scope.itinerary.initialDate;
        var currDate = new Date();
        var currTimeMS = currDate.getTime() - initialDateIti.getTime();
        var curDayIndex = Math.ceil( currTimeMS / 86400000);

        //Variable shared in the current itinerary screens
        //$rootScope = {};
        $scope.currentDayIndex = curDayIndex - 1;
        $scope.currentDate = currDate;

        $scope.travelInProgress = true;
    }

    $scope.nextDay = function(){
        console.log('nextDay desde InicioCtrl');
        $scope.diegoNada = Math.random();
        if( $scope.currentDayIndex < $scope.itinerary.days.length -1 ){
            $scope.currentDayIndex++;
            $scope.currentDate = addDay( $scope.itinerary.initialDate, $scope.currentDayIndex);
        }
        console.log('currentDayIndex: '+$scope.currentDayIndex+', currentDate: '+$scope.currentDate);
    }

     $scope.previousDay = function(){
         console.log('previusDay desde InicioCtrl');
         $scope.diegoNada = Math.random();
        if( $scope.currentDayIndex > 0 ){
            $scope.currentDayIndex--;
            $scope.currentDate = addDay( $scope.itinerary.initialDate, $scope.currentDayIndex);
        }
        console.log('currentDayIndex: '+$scope.currentDayIndex+', currentDate: '+$scope.currentDate);
    }

    //Function that add the specified number of days to anothera date
    function addDay( initialDate, numOfDays ){
        var otro = numOfDays  * 86400000;// 24 * 60 * 60 * 1000
        var init = initialDate.getTime();
        var newDate = init + otro;
        return new Date(newDate );
    }

    $scope.updateBudget = function( curItinerary ){
        //alert('update Budget desde InicioCtrl');
        debugger;
        console.log( 'updateBudget');
        console.log( curItinerary.expenses );

        CacheService.storeSelected( curItinerary );

        updateSummary();

        if( curItinerary.budgetLimit && curItinerary.budget ){
            var leftBudget = curItinerary.budget - $scope.common.summary.totalSpent;

            if( leftBudget <  curItinerary.budgetLimit ){
                console.log('Budget limit exceded');
                //Expense detail modal
                $ionicModal.fromTemplateUrl('templates/gralAlertaPresupup.html',{
                    scope:$scope,
                    animation:'slide-in-up'
                }).then( function(modal){
                    $scope.modalBudgetLimit = modal;
                    $scope.modalBudgetLimit.show();
                });
            }

        }

        //CacheService.setSummaryInfo($scope.common);
    }

    $scope.updateBudgetSinCache = function( curItinerary ){
        //alert('update Budget desde InicioCtrl');
        debugger;
        console.log( 'updateBudget');
        console.log( curItinerary.expenses );
        $scope.common.summary.totalSpent = ItineraryService.getTotalExpenses( curItinerary );

        updateSummary( curItinerary );

        if( curItinerary.budgetLimit && curItinerary.budget ){
            var leftBudget = curItinerary.budget - $scope.common.summary.totalSpent;

            if( leftBudget <  curItinerary.budgetLimit ){
                console.log('Budget limit exceded');
                //Expense detail modal
                $ionicModal.fromTemplateUrl('templates/gralAlertaPresupup.html',{
                    scope:$scope,
                    animation:'slide-in-up'
                }).then( function(modal){
                    $scope.modalBudgetLimit = modal;
                    $scope.modalBudgetLimit.show();
                });
            }

        }

        //CacheService.setSummaryInfo($scope.common);
    }

    $scope.saveNewBudgetLimit = function(){
        ItineraryService.saveItinerary( $scope.itinerary );
        $scope.modalBudgetLimit.hide();

        updateSummary( $scope.itinerary );
    }

    $scope.hideAlertBudget = function(){
        $scope.modalBudgetLimit.hide();
    }
});
