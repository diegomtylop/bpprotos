angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.resumen'
      2) Using $state.go programatically:
        $state.go('tabsController.resumen');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab1/summary
      /current/tab6/summary
      /current/tab4/summary
  */
  .state('tabsController.resumen', {
    url: '/summary',
    views: {
      'tab1': {
        templateUrl: 'templates/resumen.html',
        controller: 'resumenCtrl'
      },
      'tab6': {
        templateUrl: 'templates/resumen.html',
        controller: 'resumenCtrl'
      },
      'tab4': {
        templateUrl: 'templates/resumen.html',
        controller: 'resumenCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.itinerario'
      2) Using $state.go programatically:
        $state.go('tabsController.itinerario');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/itinerary
      /current/tab6/itinerary
      /current/tab5/itinerary
      /current/tab4/itinerary
  */
  .state('tabsController.itinerario', {
    url: '/itinerary',
    views: {
      'tab2': {
        templateUrl: 'templates/itinerario.html',
        controller: 'itinerarioCtrl'
      },
      'tab6': {
        templateUrl: 'templates/itinerario.html',
        controller: 'itinerarioCtrl'
      },
      'tab5': {
        templateUrl: 'templates/itinerario.html',
        controller: 'itinerarioCtrl'
      },
      'tab4': {
        templateUrl: 'templates/itinerario.html',
        controller: 'itinerarioCtrl'
      }
    }
  })

  .state('tabsController.gastos', {
    url: '/expenses',
    views: {
      'tab3': {
        templateUrl: 'templates/gastos.html',
        controller: 'gastosCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/current',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('inicio', {
    url: '/index',
    templateUrl: 'templates/inicio.html',
    controller: 'inicioCtrl'
  })

  .state('viajesPlaneados', {
    url: '/planned',
    templateUrl: 'templates/viajesPlaneados.html',
    controller: 'viajesPlaneadosCtrl'
  })

  .state('viajesSugeridos', {
    url: '/suggested',
    templateUrl: 'templates/viajesSugeridos.html',
    controller: 'viajesSugeridosCtrl'
  })

  .state('viajesVividos', {
    url: '/done',
    templateUrl: 'templates/viajesVividos.html',
    controller: 'viajesVividosCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.planInfoGral'
      2) Using $state.go programatically:
        $state.go('tabsController.planInfoGral');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab6/plan_general_info
      /current/tab4/plan_general_info
  */
  .state('tabsController.planInfoGral', {
    url: '/plan_general_info',
    views: {
      'tab6': {
        templateUrl: 'templates/planInfoGral.html',
        controller: 'planInfoGralCtrl'
      },
      'tab4': {
        templateUrl: 'templates/planInfoGral.html',
        controller: 'planInfoGralCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.planListaDeDAs'
      2) Using $state.go programatically:
        $state.go('tabsController.planListaDeDAs');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_list_day
      /current/tab6/plan_list_day
      /current/tab5/plan_list_day
      /current/tab4/plan_list_day
  */
  .state('tabsController.planListaDeDAs', {
    url: '/plan_list_day',
    views: {
      'tab2': {
        templateUrl: 'templates/planListaDeDAs.html',
        controller: 'planListaDeDAsCtrl'
      },
      'tab6': {
        templateUrl: 'templates/planListaDeDAs.html',
        controller: 'planListaDeDAsCtrl'
      },
      'tab5': {
        templateUrl: 'templates/planListaDeDAs.html',
        controller: 'planListaDeDAsCtrl'
      },
      'tab4': {
        templateUrl: 'templates/planListaDeDAs.html',
        controller: 'planListaDeDAsCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.planListaDeDAsActividades'
      2) Using $state.go programatically:
        $state.go('tabsController.planListaDeDAsActividades');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_day_list_activities
      /current/tab6/plan_day_list_activities
      /current/tab5/plan_day_list_activities
      /current/tab4/plan_day_list_activities
  */
  .state('tabsController.planListaDeDAsActividades', {
    url: '/plan_day_list_activities',
    views: {
      'tab2': {
        templateUrl: 'templates/planListaDeDAsActividades.html',
        controller: 'planListaDeDAsActividadesCtrl'
      },
      'tab6': {
        templateUrl: 'templates/planListaDeDAsActividades.html',
        controller: 'planListaDeDAsActividadesCtrl'
      },
      'tab5': {
        templateUrl: 'templates/planListaDeDAsActividades.html',
        controller: 'planListaDeDAsActividadesCtrl'
      },
      'tab4': {
        templateUrl: 'templates/planListaDeDAsActividades.html',
        controller: 'planListaDeDAsActividadesCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.planListaDeDAsLugares'
      2) Using $state.go programatically:
        $state.go('tabsController.planListaDeDAsLugares');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_day_list_places
      /current/tab6/plan_day_list_places
      /current/tab5/plan_day_list_places
      /current/tab4/plan_day_list_places
  */
  .state('tabsController.planListaDeDAsLugares', {
    url: '/plan_day_list_places',
    views: {
      'tab2': {
        templateUrl: 'templates/planListaDeDAsLugares.html',
        controller: 'planListaDeDAsLugaresCtrl'
      },
      'tab6': {
        templateUrl: 'templates/planListaDeDAsLugares.html',
        controller: 'planListaDeDAsLugaresCtrl'
      },
      'tab5': {
        templateUrl: 'templates/planListaDeDAsLugares.html',
        controller: 'planListaDeDAsLugaresCtrl'
      },
      'tab4': {
        templateUrl: 'templates/planListaDeDAsLugares.html',
        controller: 'planListaDeDAsLugaresCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.planActividadesDA'
      2) Using $state.go programatically:
        $state.go('tabsController.planActividadesDA');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/day_activities
      /current/tab6/day_activities
      /current/tab5/day_activities
      /current/tab4/day_activities
  */
  .state('tabsController.planActividadesDA', {
    url: '/day_activities',
    views: {
      'tab2': {
        templateUrl: 'templates/planActividadesDA.html',
        controller: 'planActividadesDACtrl'
      },
      'tab6': {
        templateUrl: 'templates/planActividadesDA.html',
        controller: 'planActividadesDACtrl'
      },
      'tab5': {
        templateUrl: 'templates/planActividadesDA.html',
        controller: 'planActividadesDACtrl'
      },
      'tab4': {
        templateUrl: 'templates/planActividadesDA.html',
        controller: 'planActividadesDACtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.gralAAdirActividad'
      2) Using $state.go programatically:
        $state.go('tabsController.gralAAdirActividad');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/add_Activity_options
      /current/tab6/add_Activity_options
      /current/tab5/add_Activity_options
      /current/tab4/add_Activity_options
  */
  .state('tabsController.gralAAdirActividad', {
    url: '/add_Activity_options',
    views: {
      'tab2': {
        templateUrl: 'templates/gralAAdirActividad.html',
        controller: 'gralAAdirActividadCtrl'
      },
      'tab6': {
        templateUrl: 'templates/gralAAdirActividad.html',
        controller: 'gralAAdirActividadCtrl'
      },
      'tab5': {
        templateUrl: 'templates/gralAAdirActividad.html',
        controller: 'gralAAdirActividadCtrl'
      },
      'tab4': {
        templateUrl: 'templates/gralAAdirActividad.html',
        controller: 'gralAAdirActividadCtrl'
      }
    }
  })

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

  .state('tabsController.planPlanDeGastos', {
    url: '/plan_expenses',
    views: {
      'tab4': {
        templateUrl: 'templates/planPlanDeGastos.html',
        controller: 'planPlanDeGastosCtrl'
      }
    }
  })

  .state('planNuevoGasto', {
    url: '/new_expense',
    templateUrl: 'templates/planNuevoGasto.html',
    controller: 'planNuevoGastoCtrl'
  })

$urlRouterProvider.otherwise('/index')

  

});