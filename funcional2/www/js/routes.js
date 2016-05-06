angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
  //Tipos de viajes
  .state('inicio', {
    url: '/index',
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  })
  
  .state('planned', {
    url: '/planned',
    templateUrl: 'templates/viajesPlaneadosDirective.html',
    controller: 'inicioCtrl'
  })
  
  
  
  .state('suggested', {
    url: '/suggested',
    templateUrl: 'templates/viajesSugeridosDirective.html',
    controller: 'inicioCtrl'
  })
  
  .state('done', {
    url: '/done',
    templateUrl: 'templates/viajesVividosDirective.html',
    controller: 'inicioCtrl'
  })
    
  //Pestañas del viaje actual
    .state('tabsActual', {
        url: '/current',
        templateUrl: 'templates/tabsActual.html',
        abstract:true
      })

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.resumen'
      2) Using $state.go programatically:
        $state.go('tabsActual.resumen');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab1/summary
      /current/tab6/summary
      /current/tab4/summary
  */
  .state('tabsActual.resumen', {
    url: '/summary',
    views: {
      'tabSum': {
        templateUrl: 'templates/resumen.html',
        controller: 'resumenCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.itinerario'
      2) Using $state.go programatically:
        $state.go('tabsActual.itinerario');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/itinerary
      /current/tab6/itinerary
      /current/tab5/itinerary
      /current/tab4/itinerary
  */
  .state('tabsActual.itinerario', {
    url: '/itinerary',
    views: {
      'tabIti': {
        templateUrl: 'templates/itinerario.html',
        controller: 'itinerarioCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planInfoGral'
      2) Using $state.go programatically:
        $state.go('tabsActual.planInfoGral');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab6/plan_general_info
      /current/tab4/plan_general_info
  */
  .state('tabsActual.gastos', {
    url: '/expenses',
    views: {
      'tabExp': {
        templateUrl: 'templates/gastos.html',
        controller: 'gastosCtrl'
      }
    }
  })
  
  //Pantallas generales
  .state('gralEditarActividad', {
    url: '/edit_activity',
    templateUrl: 'templates/gralEditarActividad.html',
    controller: 'gralEditarActividadCtrl'
  })

  .state('gralActividadesSugeridas', {
    url: '/sugested_activities',
    templateUrl: 'templates/gralActividadesSugeridas.html',
    controller: 'gralActividadesSugeridasCtrl'
  })

  .state('gralMisActividades', {
    url: '/my_activities',
    templateUrl: 'templates/gralMisActividades.html',
    controller: 'gralMisActividadesCtrl'
  })

  

  .state('planNuevoGasto', {
    url: '/new_expense',
    templateUrl: 'templates/planNuevoGasto.html',
    controller: 'planNuevoGastoCtrl'
  })
  
  

  //Tabs de la planeación
  .state('plan', {
    url: '/plan',
    templateUrl: 'templates/tabsPlan.html',
    abstract:true
  })
  
  .state('plan.planInfoGral', {
    url: '/plan_general_info',
    views: {
      'tabInf': {
        templateUrl: 'templates/planInfoGral.html',
        controller: 'planInfoGralCtrl'
      }
    }
  })
  
  .state('plan.planListaDeDias', {
    url: '/plan_list_day',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDias.html',
        controller: 'planListaDeDiasCtrl'
      }
    }
  })
  
  .state('plan.gralAdicionarActividad', {
    url: '/add_Activity_options',
    views: {
      'tabDay': {
        templateUrl: 'templates/gralAdicionarActividad.html',
        controller: 'gralAdicionarActividadCtrl'
      }
    }
  })
  
  .state('plan.planPlanDeGastos', {
    url: '/plan_expenses',
    views: {
      'tabExp': {
        templateUrl: 'templates/planPlanDeGastos.html',
        controller: 'planPlanDeGastosCtrl'
      }
    }
  })
  
  .state('plan.planListaDeDiasActividades', {
    url: '/plan_day_list_activities',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDiasActividades.html',
        controller: 'planListaDeDiasActividadesCtrl'
      }
    }
  })
  
  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planListaDeDiasLugares'
      2) Using $state.go programatically:
        $state.go('tabsActual.planListaDeDiasLugares');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_day_list_places
      /current/tab6/plan_day_list_places
      /current/tab5/plan_day_list_places
      /current/tab4/plan_day_list_places
  */
  .state('plan.planListaDeDiasLugares', {
    url: '/plan_day_list_places',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDiasLugares.html',
        controller: 'planListaDeDiasLugaresCtrl'
      }
    }
  })
  
  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planActividadesDia'
      2) Using $state.go programatically:
        $state.go('tabsActual.planActividadesDia');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/day_activities
      /current/tab6/day_activities
      /current/tab5/day_activities
      /current/tab4/day_activities
  */
  .state('plan.planActividadesDia', {
    url: '/day_activities',
    views: {
      'tabDay': {
        templateUrl: 'templates/planActividadesDia.html',
        controller: 'planActividadesDiaCtrl'
      }
    }
  })

  
$urlRouterProvider.otherwise('/index')


});