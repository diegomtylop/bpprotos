angular.module('app.controllers', [])
     
.controller('resumenCtrl', function($scope) {

})
   
.controller('itinerarioCtrl', function($scope) {

})
   
.controller('gastosCtrl', function($scope) {

})
      
.controller('inicioCtrl', function($scope) {

})
   
.controller('viajesPlaneadosCtrl', function($scope) {

})
   
.controller('viajesSugeridosCtrl', function($scope) {

})
   
.controller('viajesVividosCtrl', function($scope) {

})
   
.controller('planInfoGralCtrl', function($scope) {
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
    
    $scope.itinerary = {name:'Nombre',duration:'8'};
    $scope.guardar = function(){
        console.log($scope.itinerary);
        console.log($scope.interests);
        
    };
})
   
.controller('planListaDeDAsCtrl', function($scope) {

})
   
.controller('planListaDeDAsActividadesCtrl', function($scope) {

})
   
.controller('planListaDeDAsLugaresCtrl', function($scope) {

})
   
.controller('planActividadesDACtrl', function($scope) {

})
   
.controller('gralAAdirActividadCtrl', function($scope) {

})
   
.controller('gralEditarActividadCtrl', function($scope) {

})
   
.controller('gralActividadesSugeridasCtrl', function($scope) {

})
   
.controller('gralMisActividadesCtrl', function($scope) {

})
   
.controller('planPlanDeGastosCtrl', function($scope) {

})
   
.controller('planNuevoGastoCtrl', function($scope) {

})
 