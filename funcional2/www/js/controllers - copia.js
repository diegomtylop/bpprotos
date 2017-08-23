angular.module('app.controllers', [])
     
//Controlador de la pantalla de inicio
.controller('introCtrl', function($scope, $state, SettingsService,$ionicHistory) {
    
    $scope.introSkiped = 'hace algo';
    $scope.skipIntro = function( skip ){
        //$scope.introSkiped = skip;
        console.log('skip intro de intro controller');
        if( skip ){
            SettingsService.skipIntroNextTime( skip );
        }
      
        debugger;
      
        //Disable the back button
        $ionicHistory.nextViewOptions({
            disableBack:true
        });
        //$scope.goToIndex();
        $state.go('inicio');
    }
})
//Controlador de la pantalla de inicio
.controller('inicioCtrl', function($scope, ItineraryService,$state) {
    //debugger;
    init();
    
    //Evento disparado cada vez que se navega a la pantalla
    /*$scope.$on('$ionicView.enter', function() {
        console.log('Entering to inicioCtrl');*/
    //});
    function init(){
        console.log('INICIO CONTROLLER: Consultando el actual');
        $scope.itinerary = ItineraryService.getCurrent();
        if( $scope.itinerary != null ){
            updateSummary();
        }
    }
    
    //Update the info showed in the travel summary
    function updateSummary(){
        debugger;
        
        $scope.endDate = ItineraryService.getEndDate( $scope.itinerary );
        $scope.daysLeft = ItineraryService.getLeftDays( $scope.itinerary );
        $scope.activitiesDone = 10;
        $scope.totalActivities = ItineraryService.getTotalActivities( $scope.itinerary );
        $scope.totalSpent = 50000;
    }
})
//Controlador de la pantalla de viajes planeados
.controller('inicioPlanCtrl', function($scope, $state, $ionicPopup, $ionicModal, ItineraryService,$ionicHistory) {
    
    console.log('INICIO PLAN CONTROLLER: CONSULTANDO ACTUAL Y PLANEADOS');
    
    //TODO: MEJORAR ESTO PORQUE SE ESTÁ DISPARANDO CADA QUE SE NAVEGA A UNA PANTALLA DE INICIO
    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        console.log("Entrando a la lista de planeados");
        $scope.planned = ItineraryService.getPlannedItineraries();
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
                $scope.planned = ItineraryService.getPlannedItineraries();
            } else {
                console.log('CANCELASTE LA ELIMINACIÓN');
            }
       });
     };
    
    //Shows the form to specify the begin date
    $scope.setInitialDate = function( toBegin ){
        $scope.modal.show();
        $scope.itinerary= toBegin;
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
            
            $state.go('inicio');
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
})
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
    
    $scope.itinerary = ItineraryService.getEmptyItinerary();
    
    //Booleano usado para saber en que momento se debe cargar el objeto de session
    it_cargado = false;
    
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
        }
        
        //Si se pasó como parametro el id de un itinerario
        if( parRequest && parRequest.id_it ){
            idIt = parRequest.id_it;
            console.log("Se quiere seguir editando el itinerario "+idIt );
            $scope.itinerary = ItineraryService.getItinerary( idIt );
            
            //Asigna el itinerario seleccionado en la sesion para cargarlo
            sessionStorage.id_planned = idIt;
            it_cargado = true;
        }
        
        //Si actualmente se está editando un
        if( sessionStorage.id_planned && !it_cargado ){
            console.log('Va a cargar el que está en session '+sessionStorage.id_planned );
            $scope.itinerary = ItineraryService.getItinerary( sessionStorage.id_planned );
            it_cargado = true;
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
                console.log('Adicionando más días');
                for( i = 0; i < difDays; i++ ){
                    $scope.itinerary.days.push( {name:"dia-nuevo",activities:[]} );
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
    
    //Función que le adiciona un día al itinerario actual
    $scope.addDay = function(){
        //Incrementa el número de días
        $scope.itinerary.days.push({name:"adicionad",activities:[]});
        
        $scope.itinerary.duration = $scope.itinerary.days.length;
    }
    
    //Función llamada al seleccionar uno de los días
    $scope.selectDay = function (indexDay){
       // debugger;
        if( indexDay >= 0 && indexDay < $scope.itinerary.days.length){
            var selectedDay = $scope.itinerary.days[indexDay];
            $scope.currentDay = selectedDay;
            $scope.indexDay = indexDay;
        }
    }
    
    $scope.showConfirmRemoveDay = function( indexDay ){
        //alert('Segurisimo que desea eliminar este');
        debugger;
        $scope.confirmAction('Eliminar día','Está seguro de eliminar este día? También se eliminarán las actividades asociadas',function(){
            debugger;
            $scope.itinerary.days.splice( indexDay, 1 );
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
            
            $state.go("plan.planListaDeDias");
        }else{
            //TODO: NO DEBE SER CON ALERT
            alert('Debes ingresar el nombre');
        }
    };
    
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
        //TODO: esto debe ser desde el service
        $scope.activity = {name:"Nueva act"};
        //Muestra el modal con la pantalla para ingresar la información de la actividad
        $scope.modalAct.show();
    }
    
    //Función llamada cuando se cancela la adición de una nueva actividad
    $scope.cancelarAddActivity = function(){
        $scope.modalAct.hide();
    }
    
    //Función llamada cuando se desea guardar una actividad en el plan
    $scope.guardarActividadPlan = function(){
        debugger;
        
        console.log( $scope.activity  );
        if( !$scope.currentDay.activities ){
            //Crea eñ arreglo
            $scope.currentDay.activities = [];
        }
        $scope.currentDay.activities.push($scope.activity);
        //$state.go('plan.planActividadesDia');
        $scope.modalAct.hide();
        
        //Guarda el itinerario en la persistencia
        $scope.guardarItinerario();
    }
    
    //Función que permite editar una actividad previamente creada
    $scope.editActivity = function(actToEdit){
        $scope.activity = actToEdit;
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
                console.log('CONFIRMASTE LA ACCIÓN ');
                confirmFunc()
            } else {
                console.log('CANCELASTE LA ELIMINACIÓN');
                //If a cancel function was provided
                if( cancelFunc ){
                    cancelFunc();
                }
            }
       });
    }
})
//Controlador de la pantalla de configuraciones
.controller('settingsCtrl', function($scope,SettingsService) {
    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        // Code you want executed every time view is opened
        //Consulta la configuración
        $scope.settings = SettingsService.getSettings();
    })
    
    $scope.saveSettings = function( settings ){
        SettingsService.saveSettings( $scope.settings );    
    };

})
//Controlador de la pantalla de plan de gastos
.controller('planPlanDeGastosCtrl', function($scope,$ionicModal,$ionicPopup, ItineraryService) {
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
})

/*
.controller('resumenCtrl', function($scope) {
    $scope.resumenLoc = 'VARIABLE DECLARADA EN resumenCtrol';
})
*/
.controller('itinerarioCtrl', function($scope) {
    console.log('Desde el itineraruiCtrl');
    init();
    
    //Represents the index f the selected day
    $scope.currentDayIndex = 0;
    $scope.initialDate = $scope.itinerary.initialDate;
    
    function init(){
        $scope.currentDate = new Date();
    }
    
    $scope.previousDay = function(){
        if( $scope.currentDayIndex > 0 ){
            $scope.currentDayIndex--;
            
            $scope.currentDate = addDay( $scope.initialDate, $scope.currentDayIndex);
        }
    }
    
    $scope.nextDay = function(){
        if( $scope.currentDayIndex < $scope.itinerary.days.length -1 ){
            $scope.currentDayIndex++;
            $scope.currentDate = addDay( $scope.initialDate, $scope.currentDayIndex);
        }
    }
    
    //Function that add the specified number of days to anothera date
    function addDay( initialDate, numOfDays ){
        var otro = numOfDays  * 86400000;// 24 * 60 * 60 * 1000
        var init = initialDate.getTime();
        var newDate = init + otro;
        return new Date(newDate );
    }
})
   
.controller('gastosCtrl', function($scope) {

})
      
   
.controller('viajesPlaneadosCtrl', function($scope) {

})
   
.controller('viajesSugeridosCtrl', function($scope) {

})
   
.controller('viajesVividosCtrl', function($scope) {

})
   
.controller('planListaDeDiasCtrl', function($scope) {

})
   
.controller('planListaDeDiasActividadesCtrl', function($scope) {

})
   
.controller('planListaDeDiasLugaresCtrl', function($scope) {

})
   
.controller('planActividadesDiaCtrl', function($scope) {

})
   
.controller('gralAdicionarActividadCtrl', function($scope) {

})
   
.controller('gralEditarActividadCtrl', function($scope) {

})
   
.controller('gralActividadesSugeridasCtrl', function($scope) {

})
   
.controller('gralMisActividadesCtrl', function($scope) {

})
   
.controller('planNuevoGastoCtrl', function($scope) {
    
})
 