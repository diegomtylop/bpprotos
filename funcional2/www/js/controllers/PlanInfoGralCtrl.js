angular.module('app.controllers')
//Controlador de la pantalla información general en la planeación
.controller('planInfoGralCtrl', function($scope, ItineraryService, $state,$location, $ionicModal, $ionicPopup ) {
    $scope.transportation = [
        { name: 'Auto',    selected: false },
        { name: 'Moto',    selected: false },
        { name: 'Avión',    selected: false },
        { name: 'Transporte público',    selected: false },
        { name: 'Bicicleta',    selected: false }
    ];
        
    $scope.interests = [
        { name: 'Religión',    selected: false },
        { name: 'Aventura',    selected: false },
        { name: 'Historia',    selected: false },
        { name: 'Deportes',    selected: false },
        { name: 'Festival',    selected: false }
    ];
    
    console.log('Inicializando el controlador PlanInfoGralCtrl');
    $scope.itinerary = ItineraryService.getEmptyItinerary();
    
    //Booleano usado para saber en que momento se debe cargar el objeto de session
    //it_cargado = false;
    
    //Form modes
    const CREATING = 1;
    const EDITING = 2;
    var currentMode;
    
    //Referencia al día seleccionado
    $scope.currentDay;
    //Referencia a la actividad actual
    $scope.activity = {};
    //$scope.itinerary = {};
    
    //Modal con la lista de opciones para adicionar una actividad
    $ionicModal.fromTemplateUrl('templates/gralAdicionarActividad.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modal = modal;
    });
    
    //Modal con la pantalla para adicionar una nueva actividad
    $ionicModal.fromTemplateUrl('templates/gralEditarActividad.html',{
        scope:$scope,
        animation:'slide-in-up'
    }).then( function(modal){
        $scope.modalAct = modal;
    });
    
    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        console.log('entrando planInfoGralConrtoller');
        debugger;
        //debugger;
        // Code you want executed every time view is opened
        var parRequest = $location.search();
        //Si se paso como parametro indicando que se desea crear un itinerario
        if( parRequest && parRequest.new_it ){
            $scope.itinerary = ItineraryService.getEmptyItinerary();
            
            //Resets the lists
            $scope.interests.forEach( function( e ){e.selected= false});
            $scope.transportation.forEach( function( e ){e.selected= false});
            console.log("Se quiere crear un nuevo itinerario");
            ItineraryService.setSelectedItinerary( $scope.itinerary );
            
        }else if( parRequest && parRequest.idIt ){
            
            //Si se está editando, consulta el que está actualmente seleccionado
            debugger;
            
            console.log('Se quiere editar el itinerario con código: '+parRequest.idIt );
            console.log('El itinerraySelected.id es: '+$scope.itinerary.id );
            
            var idIt = parRequest.idIt;
            
            //TODO: VER SI ACÁ SIEMPRE DEBERÍA IR A LA BD O PODRÍA USAR EL getSelectedItinerary
            
            ItineraryService.getItinerary( idIt, function( itiConsult ){
                console.log('Itinerario consultado '+itiConsult);
                $scope.itinerary = itiConsult;
                
                //Actualiza la vista
                console.log('Aplica APPLY');
                $scope.$apply();
                //Asigna el itinerario seleccionado en la sesion para cargarlo
                //sessionStorage.id_planned = idIt;
                //it_cargado = true;
            } );
            //$scope.itinerary = ItineraryService.getItinerary( idIt );
            
        }
    });
    
    //Método llamado cuando se desea crear un nuevo itinerario
    $scope.nuevoItinerario = function( ){        
        //Inicializa la inforamción del itinerario
        $scope.itinerary = ItineraryService.getEmptyItinerary();
        //Navega a la pantalla de información general
        $state.go('plan.planInfoGral');
    };
    
    //Función llamada al cambiar la duración del viaje para cambiar el valor de lo días
    $scope.updateDays = function(){
        debugger;
        //Crea el arreglo de días según la cantidad especificada
        var dias = $scope.itinerary.duration;
        
        //If the itinerary has already days
        if( $scope.itinerary.days ){
            
            var difDays = dias - $scope.itinerary.days.length ;
            
            //If is adding more days
            if( difDays > 0 ){
                console.log('Adicionando mas días');
                for( i = 0; i < difDays; i++ ){
                    var newDay = ItineraryService.createEmptyDay();
                    $scope.itinerary.days.push( newDay );
                };         
            }else{
                alert('Si quieres especificar menos días debes eliminarlos manualmente');
            }
            
        }else{
            //If there is not days specified
            $scope.itinerary.days = [];
            for( i = 0; i < dias; i++ ){
                $scope.itinerary.days[i] = {name:"dia"+i,
                                        activities:[]};
            }; 
        }
    }
    
    //Funcióue le adiciona un díal itinerario actual
    $scope.addDay = function(){
        //Incrementa el número de dí
        $scope.itinerary.days.push( ItineraryService.createEmptyDay() );
        
        $scope.itinerary.duration = $scope.itinerary.days.length;
    }
    
    //Funciólamada al seleccionar uno de los dí
    $scope.selectDay = function (indexDay){
        //debugger;
        if( indexDay >= 0 && indexDay < $scope.itinerary.days.length){
            var selectedDay = $scope.itinerary.days[indexDay];
            $scope.currentDay = selectedDay;
            $scope.indexDay = indexDay;
        }
    }
    
    $scope.selectDayActivity = function ( selectedDay ){
        debugger;
        if( selectedDay ){
            $scope.currentDay = selectedDay;
        }
    }
    
    $scope.showConfirmRemoveDay = function( indexDay ){
        //alert('Segurisimo que desea eliminar este');
        debugger;
        $scope.confirmAction('Eliminar día', 'Está seguro de eliminar este día. También se eliminarálas actividades asociadas',function(){
            debugger;
            $scope.itinerary.days.splice( indexDay, 1 );
            $scope.itinerary.duration = $scope.itinerary.days.length;
        }, function(){
            console.log('Cancel del caller');
        });
    }
    
    $scope.showConfirmRemoveActivity = function( indexAct ){
        //alert('Segurisimo que desea eliminar este');
        debugger;
        $scope.confirmAction('Eliminar actividad','Está seguro de eliminar esta actividad?', function(){
            debugger;
            $scope.currentDay.activities.splice( indexAct, 1 );
            
            //Guarda el itinerario en la persistencia
            $scope.guardarItinerario();
        });
    }
    
    $scope.guardarItinerario = function(){
        console.log($scope.itinerary);
        console.log($scope.interests);
        
        //Indica si es valido
        var valido;
        
        //Filtra solo los seleccionados
        var selectedInt = $scope.interests.filter( function( e ){
            if( e.selected){
                return e;
            }
        });
        
        $scope.itinerary.interests = selectedInt;
        
        valido = $scope.itinerary.name != '';
        if( valido ){
            console.log("Es válido, lo guardamos");
            ItineraryService.saveItinerary( $scope.itinerary);
            return true;
        }else{
            //TODO: NO DEBE SER CON ALERT
            alert('Debes ingresar el nombre');
            return false;
        }
    };
    
    /*
    Save the itinerary and go to the specified state
    */
    $scope.saveAndGo = function( idState ){
        var saved = $scope.guardarItinerario();
        
        if( saved ){
            var state = idState ? idState : 'planned';
            $state.go( idState );
        }
    }
    
    /*
    Función que muestra un pop up con las opciones de adición de actividad
    */    
    $scope.openModalActOpction = function(){
        console.log('popup');
        $scope.modal.show();
    }
    
    //Función invocada para ocultar el popup
    $scope.hidePopup = function(){
        $scope.modal.hide();
    }
    
    //Función invocada cuando se selecciona la opción para crear una actividad nueva. Lo que hace es inicializar la variable activity a una actividad vacía
    $scope.addActivityClean = function(){
        
        $scope.activity = ItineraryService.createEmptyActivity();
        
        //Changes the mode
        currentMode= CREATING;
        
        //Muestra el modal con la pantalla para ingresar la informacie la actividad
        $scope.modalAct.show();
    }
    
    //Funcilamada cuando se cancela la adicie una nueva actividad
    $scope.cancelarAddActivity = function(){
        $scope.modalAct.hide();
    }
    
    //Funcilamada cuando se desea guardar una actividad en el plan
    $scope.guardarActividad = function(){
        debugger;
        
        console.log( $scope.activity  );
        if( !$scope.currentDay.activities ){
            //Crea ereglo
            $scope.currentDay.activities = [];
        }
        
        debugger;
        if( currentMode === CREATING){
            $scope.currentDay.activities.push($scope.activity);
        }
        
        //Guarda el itinerario en la persistencia
        $scope.guardarItinerario();
        
        //$state.go('plan.planActividadesDia');
        $scope.modalAct.hide();
    }
    
    //Funcie permite editar una actividad previamente creada
    $scope.editActivity = function(actToEdit){
        $scope.activity = actToEdit;
        
        //Changes the mode
        currentMode= EDITING;
        $scope.modalAct.show();
    }
    
    
    //$scope.totalCostActivities = function(){return 888888};
    //Function that calculates the total costo based in the activities cost
    //TODO: REVISAR COMO PUEDO HACER ESTO
    /*$scope.totalCostActivitiesREVISAR = function(){
        //debugger;
        console.log('Calculando el costo total de las actividades');
        var totalCost = 0;
        var days = $scope.itinerary.days;
        var curDay;
        for( var di = 0; di < days.length; di++  ){
            curDay = days[di];
            var curAct;
            var acts = curDay.activities;
            for( ai = 0; ai < acts.length; ai++ ){
                curAct = acts[ai];
                if( curAct.cost ){
                    totalCost+= Number(curAct.cost);
                }
            }
        }
        
        return totalCost;
    }*/
    
    $scope.confirmAction = function( header, message, confirmFunc, cancelFunc ){
        debugger;
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