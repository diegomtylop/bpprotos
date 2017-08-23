angular.module('app.controllers')
     
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