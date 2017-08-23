angular.module('app.services')
//Servicio
.service('ItineraryService', function(IndexedDBService){
    //Clave en el local storage que simula una secuencia
    const CURR_ID_KEY = "CURR_ID";
    //Prefijo de las keys para almacenar los itinerarios
    const PREFIX_ITI_KEY = "ITI_";

    //Clave del array en el que se almacenan los ids de los itinerarios
    const PLANNED_IDS = "PLANNED_ITI";

    //Key ot the array that stores the done itineraries
    const DONE_IDS = "DONE_ITI";

    //Planned, Current, Done
    const VALID_STATES = {
        planned:"PLA",
        done:"DON",
        current:"CUR"
    };

    //Itinerary selected in the different modules
    this.selected = {};

    //función que inicializa la base de datos
    this.initDB = function( callback ){
        console.log("3-ItinerarioService.initDB");
        IndexedDBService.init( callback );
    }

    this.isDBInitialized = function(){
        return IndexedDBService.isInitialized();
    }

    //Retorna un itinerario vació
    this.getEmptyItinerary = function(){
        //Retorna un nuevo itinerario vacío
        return {
            name:"",
            status:VALID_STATES.planned,//Planned
            //duration:,
            interests:[],
            days:[],
            expenses:[]
        }
    }

    //Function that returns a new empty activity with the values by default
    this.createEmptyActivity = function(){
        return  {name:""}
    }

    this.createEmptyDay = function(){
        return {name:"día",activities:[]};
    }

    //Función que retorna el siguiente id a asignarle a un itinerario
    this.getNextId = function(){
        var currentId = localStorage.getItem(CURR_ID_KEY);

        if( !currentId ){//Inicializa el valor
            currentId = 1;
        }

        //Almacena el siguiente Id
        localStorage.setItem( CURR_ID_KEY, Number(currentId)+1 );

        //Lo convierte a String
        return currentId+"";

    }

    //Almacena un itinerario
    this.saveItinerary = function ( itinerary ){
        //debugger;

        //Save in the indexedDB
        IndexedDBService.save(itinerary);
    };


    //Almacena un itinerario
    this.saveItineraryOLD = function ( itinerary ){
        //debugger;

        //Actualizando
        if( itinerary.id ){

        }else{//Si es un nuevo itinerario le asigna el id
            //Le asogna la siguiente secuencia
            itinerary.id = this.getNextId();

            //Actualiza la lista de itinerarios
            var idsStr = localStorage.getItem(PLANNED_IDS);
            var ids;
            if( idsStr ){
                ids = JSON.parse( idsStr );
            }else{
                ids = [];
            }
            ids.push( itinerary.id );
            var ids = localStorage.setItem(PLANNED_IDS, JSON.stringify(ids) );
        }

        //TODO: REMOVE THE LOCALSTORAGE SECTION
        //Guarda el itinerario
        var itStr = JSON.stringify(itinerary);
        localStorage.setItem(PREFIX_ITI_KEY+itinerary.id,itStr);

        //Save in the indexedDB
        IndexedDBService.save(itinerary);
    };


    //Save a itinerary in the done list
    this.saveAsDone = function ( itinerary ){
        //debugger;

        //le cambia el estado
        itinerary.status = VALID_STATES.done;

        //Saves the itinerary with the initalDate Specified
        this.saveItinerary( itinerary );
        localStorage.setItem("ADV_IN_PROGRESS","false");
    };

    this.saveAsDoneOLD = function ( itinerary ){
        //debugger;

        if( itinerary.id ){
            //Update the done list
            var idsStr = localStorage.getItem( DONE_IDS );
            var ids;
            if( idsStr ){
                ids = JSON.parse( idsStr );
            }else{
                ids = [];
            }

            if( ids.indexOf( itinerary.id) < 0 ){
                ids.push( itinerary.id );
                var ids = localStorage.setItem(DONE_IDS, JSON.stringify(ids) );
            }
        }

        ///Removes the itinerary for the planed list
        var idsStrPla = localStorage.getItem(PLANNED_IDS);
        var idsPla = JSON.parse( idsStrPla );
        var index = idsPla.indexOf( itinerary.id );

        if( index > 0 ){
            idsPla.splice(index, 1 );
            localStorage.setItem(PLANNED_IDS, JSON.stringify(ids) );
        }
    };

    //Obtiene el itinerario actual
    this.getCurrent = function( callback ){
        //debugger;
        console.log("ItineraryService.getCurrent");

        //Retrieve the data from indexedDB
        //debugger;
        IndexedDBService.findByStatus(VALID_STATES.current,function( retCurrent ){
            //debugger;
            console.log("ItineraryService.getcurrent"+retCurrent);
            if( retCurrent ){
                callback(retCurrent[0]);
            }
        });
    }

    this.adventureInProgress = function(){
        return localStorage.getItem("ADV_IN_PROGRESS")==="true";
    }

    //Obtiene el itinerario actual
    this.getCurrentOLD = function(){
        //debugger;
        var idStr = localStorage.getItem("CURRENT");
        if( idStr ){
            var itAct = this.getItinerary( idStr );

            var endDate = this.getEndDate( itAct);
            var curDate = new Date();
            //If the end date has passed
            if( curDate.getTime() > endDate.getTime() ){
                //Moves the itinerary
                this.saveAsDone( itAct );

                //Clean the Current
                localStorage.removeItem("CURRENT");

                return null;
            }else{
                return itAct;
            }
        }else{
            return null;
        }
    }

    //Assign a itinerary as the current
    this.setCurrent = function( itinerary ){
        //debugger;
        if( !itinerary.initialDate ){
            console.log('Initial date not specified for the itinerary');
            return;
        }

        //le cambia el estado
        itinerary.status = VALID_STATES.current;

        //Saves the itinerary with the initalDate Specified
        this.saveItinerary( itinerary );
        localStorage.setItem("ADV_IN_PROGRESS","true");
    }

    //Assign a itinerary as the current
    this.setCurrentOLD = function( itinerary ){
        //debugger;
        if( !itinerary.initialDate ){
            console.log('Initial date not specified for the itinerary');
            return;
        }

        //le cambia el estado
        itinerary.status = VALID_STATES.current;

        //Saves the itinerary with the initalDate Specified
        this.saveItinerary( itinerary );

        //Set the current
        localStorage.setItem("CURRENT", itinerary.id );

        var index;

        //Obtiene la lista de ids del local storate
        var idsStr = localStorage.getItem(PLANNED_IDS);
        var ids;
        if( idsStr ){
            ids = JSON.parse( idsStr );

            index = ids.indexOf( itinerary.id );

            //Removes the id from the array
            if( index >= 0 ){
                ids.splice( index, 1);

                //Save the new list
                localStorage.setItem(PLANNED_IDS, JSON.stringify(ids) );
            }
        }
    }

    //Retorna la información del itinerario consultado
    this.getItinerary = function( idIt, callBack ){
        //debugger;
        IndexedDBService.getItineraryById( idIt , function( iti ){
            callBack( iti );
        });
    }


    //Retorna la información del itinerario consultado
    //@Deprecated
    this.getItineraryOLD = function( idIt ){
        //debugger;
        var keyAct= PREFIX_ITI_KEY+idIt;
        var itStr = localStorage.getItem( keyAct);
        var parsedItinerary;
        if( itStr ){
            parsedItinerary = JSON.parse(itStr);

            if( parsedItinerary.initialDate ){
                var d = Date.parse( parsedItinerary.initialDate );
                var initialDate  = new Date(d);
                parsedItinerary.initialDate = initialDate;
            }
        }
        return parsedItinerary;
    }

    //Retrieve the planned itineraries
    this.getPlannedItineraries = function( callBack ){
        console.log("ItineraryService.getPlannedItineraries");

        //Retrieve the data from indexedDB
        //debugger;
        IndexedDBService.findByStatus(VALID_STATES.planned,function( planned ){
            //debugger;
            callBack(planned);
        });
    };


    //Retrieve the done itineraries
    this.getDoneItineraries = function( callBack ){
        console.log("ItineraryService.getDoneItineraries");

        //Retrieve the data from indexedDB
        //debugger;
        IndexedDBService.findByStatus(VALID_STATES.done,function( doneIt ){
            //debugger;
            callBack( doneIt);
        });
    };

    //Retorna los itinerarios planeados
    //@Deprecated
    this.getPlannedItinerariesLocalStorage = function(){
        console.log("ItineraryService.getPlannedItinerariesLocalStorage");
        var itPlaneados = [];

        //Obtiene la lista de ids del local storate
        var idsStr = localStorage.getItem(PLANNED_IDS);
        var ids;
        if( idsStr ){
            ids = JSON.parse( idsStr );
        }else{
            ids = [];
        }

        for( indexActual = 0; indexActual < ids.length; indexActual++ ){
            var idAct = ids[indexActual];
            var itDetail = this.getItinerary( idAct );

            itPlaneados.push( itDetail );
        }
        return itPlaneados;
    }

    //Removes a itinerary
    this.deleteItinerary = function( idDel ){
        //debugger;
        IndexedDBService.delete( idDel );
    }

    //Removes a itinerary
    this.deleteItineraryOLD = function( idDel ){
        idDel  = idDel+"";
        //debugger;
        //lo borra del localStorage
        localStorage.removeItem(PREFIX_ITI_KEY+idDel);

        var idsStr = localStorage.getItem(PLANNED_IDS);
        var ids = JSON.parse( idsStr );

        //Lo elimina del arreglo
        var index = ids.indexOf(idDel );
        if( index >= 0 ){
            ids.splice(index, 1 );
        }

        localStorage.setItem(PLANNED_IDS, JSON.stringify(ids) );

        /*for( i = 0; i < this.planned.length; i++ ){
            if( this.planned[i].id === idDel ){
                this.planned.splice(i,1);
                break;
            }
        }*/
    };

    ////debugger;
    //this.planned = this.getPlannedItineraries();

    //Calculate the cost based on activitie's cost
    this.calculateCostActivities = function( itinerary ){
       // //debugger;
        console.log('Calculando el costo total de las actividades desde el servivio');
        var totalCost = 0;
        var days = itinerary.days;
        if( days ){
            var curDay;
            for( var di = 0; di < days.length; di++  ){
                curDay = days[di];
                var curAct;
                var acts = curDay.activities;
                for( ai = 0; ai < acts.length; ai++ ){
                    curAct = acts[ai];
                    if( curAct.cost ){
                        totalCost+= Number(curAct.cost);
                    }
                }
            }
        }

        return totalCost;
    }

    //Calculate the total cost of all the expenses
    this.calculateTotalOtherExpenses = function( itinerary ){
        console.log('calculando el total de gastos');
        var total = 0;
        if( itinerary.expenses ){
            for( ei = 0; ei < itinerary.expenses.length; ei++ ){
                total += Number( itinerary.expenses[ei].cost);
            }
        }
        return total;
    }

    this.getLeftDays = function( itinerary ){
        //debugger;
        if( itinerary.days ){
            var totalDays = itinerary.days.length;
            var daysLeft = 0;
            //TODO: What happen if the date is bigger or lesser
            if( itinerary.initialDate ){
                //Calculate how many days
                var currentDate = new Date();

                var d = Date.parse( itinerary.initialDate );
                var initialDate  = new Date(d);

                var msEnd = totalDays * 24 * 60 * 60 * 1000;
                var endDate = new Date(d + msEnd);
                //endDate.setDate( endDate + totalDays);

                var difMS = endDate - currentDate;

                daysLeft = difMS / 24 / 60 / 60 / 1000;

                daysLeft = Math.ceil( daysLeft );
            }
        }

        return daysLeft;
    }

    this.getEndDate = function( itinerary ){
        //debugger;
        if( itinerary.days ){
            var totalDays = itinerary.days.length;

            //TODO: What happen if the date is bigger or lesser
            if( itinerary.initialDate ){
                var d = Date.parse( itinerary.initialDate );
                var initialDate  = new Date(d);

                var msEnd = totalDays * 24 * 60 * 60 * 1000;
                var endDate = new Date(d + msEnd);
                //endDate.setDate( endDate + totalDays);

                return endDate;
            }
        }
    }

    this.getTotalActivities = function(itinerary){
        var days = itinerary.days;
        if( days ){
            var totalAct = 0;
            for( var di = 0; di < days.length; di++  ){
                totalAct += days[di].activities.length;
            }
        }

        return totalAct;
    }

    //Return the total expenses
    this.getTotalExpenses = function( itinerary ){
        //debugger;
        var days = itinerary.days;
        if( days ){
            var expenses = itinerary.expenses;

            var totalExp = 0;
            var curDay;
            var curAct;

            for( var di = 0; di < days.length; di++  ){
                curDay =  days[di];
                for( var ai = 0; ai < curDay.activities.length; ai++){
                    curAct = curDay.activities[ai];

                    if( curAct.cost ){
                        totalExp+= curAct.cost;
                    }
                }
            }
        }

        if( expenses ){
            var curExp;
            for( var di = 0; di < expenses.length; di++  ){
                curExp = expenses[di];

                totalExp+= curExp.cost;
            }
        }

        return totalExp;
    }

    //Creates a empty activity in the day especidfied by the index
    this.addNewActivity = function( itinerary, indexDay, newActivity ){
        //debugger;
        if( itinerary.days ){
            var day = itinerary.days[ indexDay];

            if( day ){
                var activities = day.activities;

                if( !activities ){
                    day.activities = []
                }

                day.activities.push( newActivity );

                //Saves the itinerary
                this.saveItinerary( itinerary );
            }
        }
    }

    //Saves an expense
    this.saveExpense = function( itinerary, newExp, indexToEdit ){
        //debugger;
        console.log('Saving expense from service');
        if( !itinerary.expenses ){
            itinerary.expenses = [];
        }

        //Editing
        if( indexToEdit ||
            indexToEdit == 0){
            itinerary.expenses[indexToEdit] = newExp;
        }else{//Adding
            itinerary.expenses.push( newExp );
        }

        //Saves the itinerary
        this.saveItinerary( itinerary );
    }

    this.removeExpense = function(itinerary, indexExpToRemove){
        //debugger;
        if( itinerary.expenses &&
            itinerary.expenses.length >= indexExpToRemove ){

            itinerary.expenses.splice(indexExpToRemove, 1 );

            //Saves the itinerary
            this.saveItinerary( itinerary );
        }
    };

    //the reference to the selected itinerary
    this.setSelectedItinerary = function( itinerary ){
        this.selected = itinerary;
    }

    this.getSelectedItinerary = function(){
        return this.selected;
    }
});
