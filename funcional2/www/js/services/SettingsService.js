angular.module('app.services')
//Servicio para el almacenamiento de las preferencias del usuarios
.service('SettingsService', function(){
    
    //Tells if the user wantsto skip the intro screen
    this.isIntroSkipped = function(){
        //debugger;
        var setStr = localStorage.getItem("SETTINGS");
        if( setStr ){
            var settings = JSON.parse(setStr);
            return settings.skipIntro;
        }else{
            return false;
        }
    }
    
    this.skipIntroNextTime = function( skip ){
        var settings = this.getSettings();
        settings.skipIntro = skip;
        this.saveSettings( settings );
    }
    
    //Almacena
    this.saveSettings = function ( settings ){
        var setStr = JSON.stringify(settings);
        localStorage.setItem("SETTINGS",setStr);
    };
    
    //Obtiene el itinerario actual
    this.getSettings = function(){
        var setStr = localStorage.getItem("SETTINGS");
        if( setStr ){
            return JSON.parse(setStr);
        }else{
            return {};
        }
    }
});
