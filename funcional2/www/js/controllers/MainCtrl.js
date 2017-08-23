angular.module('app.controllers')

//Main controller
.controller('MainController', function($scope,$location, $state, SettingsService,ItineraryService,CacheService,$ionicPopup) {
    console.log('1-ESTAMOS INSTANCIANDO EL CONTROLADOR PRINCIPAL');
    //debugger;

    $scope.introSkiped= SettingsService.isIntroSkipped();

    //$scope.itinerary = {};

    $scope.global = 'VARIABLE GLOBAL';

    //Variable that indicates whether there is a travel in progress in the current date
    $scope.travelInProgress = false;

    //init();
    initDB();

    function initDB(){
        console.log("2-Se va a inicializar la BD");
        //debugger;
        ItineraryService.initDB( function(){
            //debugger;
            console.log('MainCtrl: Ya inició la base de datos ahora si a inicializar todo');
            initController();
        });
    }

    function initController(){
        console.log('MainCtrl.initController');
        console.log(  $scope.itinerary );

        //If the user tells to skip the intro page, to app goes directly to index
        if( !$scope.introSkiped ){
            $state.go('intro');
            return;
        }else{
            console.log('Busca si hay itineraios actuales');
            var travelInProgress =  ItineraryService.adventureInProgress();

            if( travelInProgress ){

              //Get the current from the DB
              ItineraryService.getCurrent( function( itinerarioSalida ){
                  //debugger;


                  /*PORCIÓN DE CÓDIGO PARA CAMBIAR EL ESTADO POR DEMANDA*/
                /*  itinerarioSalida.status = 'PLA';
                  ItineraryService.saveItinerary( itinerarioSalida );
                  localStorage.setItem("ADV_IN_PROGRESS","false");
                  return;*/

                  console.log('Itinerario consultado de la BD '+itinerarioSalida);
                  //If there is a current itinerary in progress
                  if( itinerarioSalida.id ){
                      $scope.itinerary = itinerarioSalida;

                      console.log('there is a travel in progress');

                      var endDate =  ItineraryService.getEndDate( $scope.itinerary );

                      console.log('The travel ends in '+endDate );

                      //checks if the itinerary is in progress
                      if( endDate < new Date()){
                          console.log('The itinerary finished '+endDate );
                          ItineraryService.saveAsDone($scope.itinerary);
                          //Marks the itinerary as done
                          $scope.travelInProgress = false;

                          $location.path('/done');
                      }else{
                        console.log('The itinerary is in progress')
                        $scope.travelInProgress = true;

                        //$state.go('inicio',"viajeEnProgreso":"true");
                        $location.path('/index').search({viajeEnProgreso: 'true'});
                      }

                      CacheService.storeSelected( $scope.itinerary );
                      return;
                  }
              });
            }else{
              console.log('there is not a travel in progress');
              $state.go('planned');
              return;
            }
        }
    };

    $scope.confirmAction = function( header, message, confirmFunc, cancelFunc ){
        //debugger;
        var confirmPopup = $ionicPopup.confirm({
            title: header,
            template: message
        });

        confirmPopup.then(function(res ) {
            if(res) {
                console.log('CONFIRMASTE LA ACCI ');
                confirmFunc()
            } else {
                console.log('CANCELASTE LA ELIMINACI');
                //If a cancel function was provided
                if( cancelFunc ){
                    cancelFunc();
                }
            }
       });
    }
})
