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

  .state('tabsActual.gastos', {
    url: '/expenses',
    views: {
      'tab3': {
        templateUrl: 'templates/gastos.html',
        controller: 'gastosCtrl'
      }
    }
  })

  .state('tabsActual', {
    url: '/current',
    templateUrl: 'templates/tabsActual.html',
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
        ui-sref='tabsActual.planInfoGral'
      2) Using $state.go programatically:
        $state.go('tabsActual.planInfoGral');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab6/plan_general_info
      /current/tab4/plan_general_info
  */
  

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planListaDeDAs'
      2) Using $state.go programatically:
        $state.go('tabsActual.planListaDeDAs');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_list_day
      /current/tab6/plan_list_day
      /current/tab5/plan_list_day
      /current/tab4/plan_list_day
  */
  

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planListaDeDAsActividades'
      2) Using $state.go programatically:
        $state.go('tabsActual.planListaDeDAsActividades');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_day_list_activities
      /current/tab6/plan_day_list_activities
      /current/tab5/plan_day_list_activities
      /current/tab4/plan_day_list_activities
  */
  

  

  
  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.gralAAdirActividad'
      2) Using $state.go programatically:
        $state.go('tabsActual.gralAAdirActividad');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/add_Activity_options
      /current/tab6/add_Activity_options
      /current/tab5/add_Activity_options
      /current/tab4/add_Activity_options
  */
  

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
  
   .state('inicioSimple', {
    url: '/inicio',
    templateUrl: 'templates/inicioComun.html',
    abstract:true
  })
  
  .state('inicioSimple.actual', {
    url: '/actual',
    views:{
      'tipo_viaje':{
        templateUrl: 'templates/inicioActual.html',
          controller: 'inicioCtrl'
        }
    }
  })
  .state('inicioSimple.planeados', {
    url: '/planeados',
    views:{
      'tipo_viaje':{
        templateUrl: 'templates/viajesPlaneados.html',
          controller: 'inicioCtrl'
        }
    }
  })
  
  .state('inicioDirective', {
    url: '/indexdirective',
    templateUrl: 'templates/inicioDirective.html',
    controller: 'inicioCtrl'
  })
  
  .state('planneddirective', {
    url: '/planneddirective',
    templateUrl: 'templates/viajesPlaneadosDirective.html',
    controller: 'inicioCtrl'
  })
  
  .state('sugedirective', {
    url: '/sugedirective',
    templateUrl: 'templates/viajesSugeridosDirective.html',
    controller: 'inicioCtrl'
  })
  
  .state('donedirective', {
    url: '/donedirective',
    templateUrl: 'templates/viajesVividosDirective.html',
    controller: 'inicioCtrl'
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
  
  .state('plan.planListaDeDAs', {
    url: '/plan_list_day',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDAs.html',
        controller: 'planListaDeDAsCtrl'
      }
    }
  })
  
  .state('plan.gralAAdirActividad', {
    url: '/add_Activity_options',
    views: {
      'tabDay': {
        templateUrl: 'templates/gralAAdirActividad.html',
        controller: 'gralAAdirActividadCtrl'
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
  
  .state('plan.planListaDeDAsActividades', {
    url: '/plan_day_list_activities',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDAsActividades.html',
        controller: 'planListaDeDAsActividadesCtrl'
      }
    }
  })
  
  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planListaDeDAsLugares'
      2) Using $state.go programatically:
        $state.go('tabsActual.planListaDeDAsLugares');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/plan_day_list_places
      /current/tab6/plan_day_list_places
      /current/tab5/plan_day_list_places
      /current/tab4/plan_day_list_places
  */
  .state('plan.planListaDeDAsLugares', {
    url: '/plan_day_list_places',
    views: {
      'tabDay': {
        templateUrl: 'templates/planListaDeDAsLugares.html',
        controller: 'planListaDeDAsLugaresCtrl'
      }
    }
  })
  
  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsActual.planActividadesDA'
      2) Using $state.go programatically:
        $state.go('tabsActual.planActividadesDA');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /current/tab2/day_activities
      /current/tab6/day_activities
      /current/tab5/day_activities
      /current/tab4/day_activities
  */
  .state('plan.planActividadesDA', {
    url: '/day_activities',
    views: {
      'tabDay': {
        templateUrl: 'templates/planActividadesDA.html',
        controller: 'planActividadesDACtrl'
      }
    }
  })

  
$urlRouterProvider.otherwise('/indexdirective')


});