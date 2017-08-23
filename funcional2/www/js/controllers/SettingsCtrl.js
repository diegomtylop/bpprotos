angular.module('app.controllers')
//Controlador de la pantalla de configuraciones
.controller('settingsCtrl', function($scope,SettingsService) {
    //Evento disparado cada vez que se navega a la pantalla
    $scope.$on('$ionicView.enter', function() {
        // Code you want executed every time view is opened
        //Consulta la configuraciOn
        $scope.settings = SettingsService.getSettings();
    })
    
    $scope.saveSettings = function( settings ){
        SettingsService.saveSettings( $scope.settings );    
    };

});