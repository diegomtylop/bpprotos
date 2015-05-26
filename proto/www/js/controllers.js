angular.module('starter.controllers', [])


//Controlador del itinerario y las actividades
.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state) {
  // Form data for the login modal
  $scope.loginData = {};
    
    $scope.itinerario = {
        nombre:'Nombre itinerario',
        fechaSalida:new Date(30,06,2015),
        descripcion:'descripción ingresada desde el controlador',
        presupuestDisponible:'100000'
    };
    
    $scope.actividad = {
        nombre:'Nueva actividad',
        costo:'20000'
    }
    
    $scope.dias = [
        {
            id:'1',
            notas:'Notas de la actividad 1',
            nombre:'Martes 12'
        },
        {
            id:'2',
            notas:'Notas de la actividad 2',
            nombre:'Miércoles 13'
        },
        {
            id:'3',
            notas:'Notas de la actividad 3',
            nombre:'Jueves 14'
        },
        {
            id:'4',
            notas:'Notas de la actividad 4',
            nombre:'Viernes 15'
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
    
    // función que guarda la información general del itinerario
  $scope.saveItinerario = function() {
    console.log($scope.itinerario);
      console.log('debe irse para otra parte');
      //Redirige a la lista de actividades
    $state.go('app.activityList');
  };
    
    $scope.guardarActividad = function(){
        console.log( $scope.actividad );
        $state.go('app.activityList');
    }
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
});

