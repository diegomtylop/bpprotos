angular.module('app.directives', [])

.directive('blankDirective', [function(){

}])
.directive('botonInicio',function(){
    return{
        restrict:'E',
        //template:'boton de la directiva'
        templateUrl:'directives/boton-inicio.html',
        scope:{
            seleccionado:'=actual'
        }
    };
});;


