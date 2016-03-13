angular.module('itinerary.services', [])

.factory('Itinerary', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var itinerarios = [{
    id: 0,
    nombre: 'Colombia de aventura',
    cover: 'img/it/col.jpg',
    actividades:20,
      costo:5000
  }, {
    id: 1,
    nombre: 'San agustin te espera',
    cover: 'img/it/agu.jpg',
      actividades:20,
      costo:5000
  },{
    id: 2,
    nombre: 'Alemania es tuya',
    cover: 'img/it/ger.jpg',
      actividades:20,
      costo:5000
  }, {
    id: 3,
    nombre: 'San francisco the best',
    cover: 'img/it/fra.jpg',
      actividades:20,
      costo:5000
  }, {
    id: 4,
    nombre: 'Jericó y sus frutas',
    cover: 'img/it/jer.jpg',
      actividades:20,
      costo:5000
  }];

  return {
    all: function() {
        console.log('consultando todos los itinerarios');
      return itinerarios;
    },
    remove: function(chat) {
      itinerarios.splice(itinerarios.indexOf(chat), 1);
    },
    add: function( nuevo ) {
      itinerarios.push( nuevo );
    },
    get: function(itiId) {
        //alert('obteniendo el itinerario en la posicion '+itiId);
      for (var i = 0; i < itinerarios.length; i++) {
        if (itinerarios[i].id === parseInt(itiId)) {
            console.log('retornando'+itinerarios[1])
          return itinerarios[i];
        }
      }
      return null;
    }
  };
});
