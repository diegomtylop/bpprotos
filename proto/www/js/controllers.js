angular.module('starter.controllers', [])


//Controlador del itinerario y las actividades
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,Itinerary) {
  // Form data for the login modal
  $scope.loginData = {};
    
    $scope.itinerarios = Itinerary.all();
    
    $scope.actividad = {
        nombre:'Nueva actividad',
        costo:'20000'
    }
    
    $scope.dias = [
        {
            id:'1',
            notas:'Notas de la actividad 1',
            nombre:'Martes 12',
            cover:'img/1.jpg'
        },
        {
            id:'2',
            notas:'Notas de la actividad 2',
            nombre:'Miércoles 13',
            cover:'img/2.jpg'
        },
        {
            id:'3',
            notas:'Notas de la actividad 3',
            nombre:'Jueves 14',
            cover:'img/club.jpg'
        },
        {
            id:'4',
            notas:'Notas de la actividad 4',
            nombre:'Viernes 15',
            cover:'img/eat.jpg'
        }
    ]

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    $scope.guardarActividad = function(){
        console.log( $scope.actividad );
        $state.go('app.activityList');
    };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

//Conrtolador de los mapas
.controller('MapaController', function($scope) {

    $scope.pais = "Colombia";
    
    //Función que obtiene la posición actual mediante el GPS
    $scope.obtenerPosicionActual = function() {
    if (navigator.geolocation) {
        console.log('Tiene la posición');
        navigator.geolocation.getCurrentPosition( function(position){
            console.log('pos');
            console.log(position.coords);
            $scope.posicion = position.coords.latitude +" "+ position.coords.longitude;
        });
    } else {
        $scope.posicion = "Geolocation is not supported by this browser.";
    }
}
  
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    
}).controller('ActivityCtrl', function($scope, $stateParams, $ionicModal) {
    
    $scope.nombre = 'Diego';
    $scope.tiposActividad=[{nombre:'Alojamiento',icon:'ion-home'},
                  {nombre:'Deportes',icon:'ion-trophy'},
                  {nombre:'Estilo de vida',icon:'ion-person'},
                    {nombre:'Religion',icon:'ion-cash'},
                    {nombre:'Comida',icon:'ion-pizza'},
                    {nombre:'Deportes extremos',icon:'ion-speedometer'}];
    
    $scope.actividades = [{nombre:'Templo de los mil recuerdos',imagen:'img/activities/temple.jpg',costo:'', tipos:[
                                {nombre:'Religion',icon:'ion-cash'}]},
                         {nombre:'Parque de las materas felices',imagen:'img/activities/park.jpg',costo:'$5.000',tipos:[
                                {nombre:'Estilo de vida',icon:'ion-person'}]},
                         {nombre:'Teatro colón de Guaduas',imagen:'img/activities/theater.jpg',costo:'$15.000',tipos:[
                                {nombre:'Deportes',icon:'ion-trophy'},
                                {nombre:'Estilo de vida',icon:'ion-person'},
                                {nombre:'Deportes extremos',icon:'ion-speedometer'}]},
                         {nombre:'Mina de coltant rosado',imagen:'img/activities/mine.jpg',costo:'$25.000',tipos:[
                                {nombre:'Estilo de vida',icon:'ion-person'},
                                {nombre:'Deportes extremos',icon:'ion-speedometer'}]},
                         {nombre:'Nevado de la sierra corta',imagen:'img/activities/snowy.jpg',costo:'$60.000',tipos:[
                                {nombre:'Alojamiento',icon:'ion-home'},
                                {nombre:'Deportes',icon:'ion-trophy'},
                                {nombre:'Deportes extremos',icon:'ion-speedometer'}]}
    ];
    
    $scope.selected = [];
    
    $ionicModal.fromTemplateUrl('templates/activityType.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal
    })  
    
    $scope.openModal = function() {
        $scope.modal.show()
    }
    
    $scope.closeModal = function() {
        $scope.modal.hide()
    }
    
    $scope.selectType = function( index ){
        //alert(index);
        //$scope.selected.push( $scope.tiposActividad[index]);
        if($scope.tiposActividad[index].selected){
            $scope.tiposActividad[index].selected = false;
        }else{
            $scope.tiposActividad[index].selected = true;
        }
    }
    
    $scope.isSelected = function(index){
        return $scope.tiposActividad[index].selected;
    }
}).controller('ItineraryCtrl', function($scope,$state,$stateParams, Itinerary ) {
    
    $scope.itineraries = Itinerary.all();
    
    //Si es de edición o creación
    $scope.itinerario = $stateParams.itId ? Itinerary.get($stateParams.itId):{
        nombre:'Nombre itinerario',
        fechaSalida:new Date(30,06,2015),
        descripcion:'descripción ingresada desde el controlador',
        presupuestDisponible:'100000'
    };
    
    console.log('En el controller de itinerario');
    
     // función que guarda la información general del itinerario
      $scope.saveItinerario = function() {
        console.log($scope.itinerario);
        console.log('Guarda el itinerario con el service');
        Itinerary.add( $scope.itinerario );
        $state.go('app.days');
      };

    
//}).controller('ItineraryDetailCtrl', function($scope, $stateParams, $state, Itinerary ) {
    
    //$scope.itinerary = Itinerary.get($stateParams.itId);
    $scope.activeTab = '1';
    console.log('Cargando la información del itinerario');
    console.log($scope.itinerary);
    
    $scope.mostrarTab = function( index ){
        $scope.activeTab = index;
        //alert('mostrando tab '+index);
    };
    
    $scope.editarItinerario = function(aEditar){
        debugger;
        console.log('aEditar: '+aEditar);
        console.log('actual: '+$scope.itinerario)
        $scope.itinerario = aEditar;
        $state.go('app.create');
    };
});


