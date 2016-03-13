angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  
      
    .state('mochiApp', {
      url: '/nav_menu',
      abstract:true,
      templateUrl: 'templates/mochiApp.html'
    })
      
    
      
        
    .state('tabsPlaneacion.planInformaciNGeneral', {
      url: '/info_gral',
      views: {
        'tab7': {
          templateUrl: 'templates/planInformaciNGeneral.html'
        }
      }
    })
        
      
    
      
    .state('tabsPlaneacion', {
      url: '/option_tabs_1',
      abstract:true,
      templateUrl: 'templates/tabsPlaneacion.html'
    })
      
    
      
        
    .state('tabsPlaneacion.planListaDeDAs', {
      url: '/days_trip',
      views: {
        'tab2': {
          templateUrl: 'templates/planListaDeDAs.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsPlaneacion.planListaDeDAsVistaActividades', {
      url: '/page23',
      views: {
        'tab2': {
          templateUrl: 'templates/planListaDeDAsVistaActividades.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsPlaneacion.planListaDeDAsVistaLugares', {
      url: '/page24',
      views: {
        'tab2': {
          templateUrl: 'templates/planListaDeDAsVistaLugares.html'
        }
      }
    })
        
      
    
      
        
    .state('planAAdirDA', {
      url: '/add_day',
      templateUrl: 'templates/planAAdirDA.html'
    })
        
      
    
      
        
    .state('tabsPlaneacion.planActividadesDA', {
      url: '/activities_day',
      views: {
        'tab2': {
          templateUrl: 'templates/planActividadesDA.html'
        }
      }
    })
        
      
    
      
        
    .state('mochiApp.inicio', {
      url: '/index',
      views: {
        'side-menu21': {
          templateUrl: 'templates/inicio.html'
        }
      }
    })
        
      
    
        
    .state('planeados', {
        abstract:true,
        templateUrl:'templates/mochiApp.html'
    })
  
  .state('planeados.viajes', {
      url: '/planned',
      views: {
        'side-menu21': {
        templateUrl: 'templates/misViajesPlaneados.html'
        }
      }
    })
        
      
  .state('sugeridos', {
        abstract:true,
        templateUrl:'templates/mochiApp.html'
    })
    
      
        
    .state('sugeridos.viajes', {
      url: '/sugeridos',
      views: {
        'side-menu21': {
          templateUrl: 'templates/misViajesSugeridos.html'
        }
      }
    })
        
      
    
    .state('realizados', {
        abstract:true,
        templateUrl:'templates/mochiApp.html'
    })
        
    .state('realizados.viajes', {
      url: '/realizados',
      views:{
          'side-menu21':{
              templateUrl: 'templates/misViajesRealizados.html'
          }
      }
        
    })
        
      
    
      
        
    .state('actualNuevoGasto', {
      url: '/gasto',
      templateUrl: 'templates/actualNuevoGasto.html'
    })
        
      
    
      
        
    .state('tabsViajeActual.actualActividadesParaHoy', {
      url: '/tab_actividades_hoy',
      views: {
        'tab2': {
          templateUrl: 'templates/actualActividadesParaHoy.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsViajeActual.actualActividadesParaMaAna', {
      url: '/tomorrow_tab',
      views: {
        'tab2': {
          templateUrl: 'templates/actualActividadesParaMaAna.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsViajeActual.actualResumenGastos', {
      url: '/tab_gastos',
      views: {
        'tab3': {
          templateUrl: 'templates/actualResumenGastos.html'
        }
      }
    })
        
      
    
      
    .state('tabsViajeActual', {
      url: '/itinerario_tabs_2',
      abstract:true,
      templateUrl: 'templates/tabsViajeActual.html'
    })
      
    
      
        
    .state('planEditarActividad', {
      url: '/edit_activity',
      templateUrl: 'templates/planEditarActividad.html'
    })
        
      
    
      
        
    .state('actualEditarActividad', {
      url: '/page28',
      templateUrl: 'templates/actualEditarActividad.html'
    })
        
      
    
      
        
    .state('tabsViajeActual.actualDetallesDelViaje', {
      url: '/trip_detail',
      views: {
        'tab1': {
          templateUrl: 'templates/actualDetallesDelViaje.html'
        }
      }
    })
        
      
    
      
        
    .state('tabsPlaneacion.planPresupuestoPlaneado', {
      url: '/edit_presup_plan',
      views: {
        'tab3': {
          templateUrl: 'templates/planPresupuestoPlaneado.html'
        }
      }
    })
        
      
    
      
        
    .state('mochiApp.gralMisActividades', {
      url: '/my_activities',
      views: {
        'side-menu21': {
          templateUrl: 'templates/gralMisActividades.html'
        }
      }
    })
        
      
    
      
        
    .state('mochiApp.publicActivities', {
      url: '/my_public_activities',
      views:{
          'side-menu21':{
            templateUrl: 'templates/gralMisActividadesPBlicas.html'
          }
      }
    })
        
      
    
      
        
    .state('gralActividadesSugeridas', {
      url: '/suggested_activities',
      templateUrl: 'templates/gralActividadesSugeridas.html'
    })
        
      
    
      
        
    .state('gralAAdirActividad', {
      url: '/add_activity_options',
      templateUrl: 'templates/gralAAdirActividad.html'
    })
        
      
    
      
        
    .state('recordarViaje', {
      url: '/remember_travel',
      templateUrl: 'templates/recordarViaje.html'
    })
        
      
    
      
        
    .state('mochiApp.miPerfL', {
      url: '/profile',
      views: {
        'side-menu21': {
          templateUrl: 'templates/miPerfL.html'
        }
      }
    })
        
      
    
      
        
    .state('intro', {
      url: '/page29',
      templateUrl: 'templates/intro.html'
    })
      
  .state('navTab', {
      url: '/nav_tab',
      abstract:true,
      templateUrl: 'templates/pruebaNavTab/navTabs.html'
    })
  
  .state('navTab.sencillo',{
      url:'/sencillo',
      views:{
          'contenido':{
              templateUrl:'templates/pruebaNavTab/navTabSencillo.html'
          }
      }
      
  })
  .state('navTab.tabs',{
      url:'/tabs',
      abstract:true,
      views:{
          'contenido':{
              templateUrl:'templates/pruebaNavTab/navTabTabs.html'
          }
      }
      
  })
  
  .state('trucoNav',{
      url:'/tabs_truco',
      templateUrl: 'templates/pruebaNavTab/navTabs.html',
     // abstract:true,
      views:{
          'contenido':{
              templateUrl:'templates/pruebaNavTab/navTabSencillo.html'
          }
      }
      
      
  })
  
  /*.state('trucoNav.nav',{
      url:'/nav',
      views:{
          'contenido':{
              templateUrl:'templates/pruebaNavTab/navTabTabsTruco.html'
          }
      }
      
  })*/
  
  .state('navTab.tabs.tab1',{
      url:'/tab1',
      views:{
          'tab1':{
              templateUrl:'templates/pruebaNavTab/navTabTabsTab1.html'
          }
      }
  })
  
  .state('navTab.tabs.tab2',{
      url:'/tab2',
      views:{
          'tab2':{
              templateUrl:'templates/pruebaNavTab/navTabTabsTab2.html'
          }
      }
  })
  
  .state('tabs',{
      url:'/tab',
      abstract:true,
      templateUrl:'templates/pruebaNavTab/navTabsConTabs.html'
  })
  
  .state('tabs.home', {
      url: "/home",
      views: {
        'tab1': {
          templateUrl: "templates/pruebaNavTab/navTabSencillo.html"
        }
      }
    })
  
  .state('tabs.facts', {
      url: "/facts",
      views: {
        'tab2': {
          templateUrl: "templates/inicio.html"
        }
      }
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  
  $urlRouterProvider.otherwise('/page29');
  

  

});