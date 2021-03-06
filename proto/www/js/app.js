// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','itinerary.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
//Configura las rutas de navegación
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  //Pantalla de creación de un nuevo itinerario
  .state('app.create', {
    url: "/create",
    views: {
      'menuContent': {
        templateUrl: "templates/create.html",
          controller: 'ItineraryCtrl'
      }
    }
  })
  
  // setup an abstract state for the tabs directive
  .state('explore', {
    url: "/explore",
    abstract: true,
    templateUrl: "templates/browse.html"
  })
  // Each tab has its own nav history stack:
  //Pestaña con la lista de itinerarios
  .state('explore.list', {
    url: '/list',
    views: {
      'explore-left': {
        templateUrl: "templates/tabs/itineraryList.html",
          controller:'ItineraryCtrl'
      }
    }
  })
  
  .state('explore.itinerarydetail', {
    url: '/itinerarydetail/:itId',
    views: {
      'explore-left': {
        templateUrl: "templates/tabs/itineraryDetail.html",
        controller: 'ItineraryCtrl'
      }
    }
  })
  
  
  
  // Pestaña de sugerencias
  .state('explore.sug', {
    url: '/sug',
    views: {
      'explore-right': {
        templateUrl: "templates/tabs/suggestions.html",
        controller: 'AppCtrl'
      }
    }
  })
  
  .state('app.begin', {
    url: "/begin",
    views: {
      'menuContent': {
        templateUrl: "templates/selectmode.html"
      }
    }
  })
  
  //Pantalla donde se listan los días
  .state('app.days', {
    url: "/days",
    views: {
      'menuContent': {
        templateUrl: "templates/daysList.html",
          controller: 'AppCtrl'
      }
    }
  })
  
  //Pantalla donde se listan los días
  .state('app.dayDeail', {
    url: "/daysdetail",
    views: {
      'menuContent': {
        templateUrl: "templates/dayDetail.html",
          controller: 'AppCtrl'
      }
    }
  })
  
  //Pantalla para listar las actividades
  .state('app.activityList', {
    url: "/activity",
    views: {
      'menuContent': {
        templateUrl: "templates/activityList.html",
          controller: 'AppCtrl'
      }
    }
  })
  
  //Pantalla para crear una actividad
  .state('app.activityedit', {
    url: "/activityedit",
    views: {
      'menuContent': {
        templateUrl: "templates/activityEdit.html",
          controller: 'AppCtrl'
      }
    }
  })
  //Pantalla para crear una actividad
  .state('app.activitysearch', {
    url: "/activitysearch",
    views: {
      'menuContent': {
        templateUrl: "templates/activitySearch.html",
          controller: 'ActivityCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })
  
  //Pantalla par visualizar el mapa
  .state('app.mapa', {
    url: "/mapa",
    views: {
      'menuContent': {
        templateUrl: "templates/mapa.html",
        controller:"MapaController"
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
    $urlRouterProvider.otherwise('/app/begin');
});
