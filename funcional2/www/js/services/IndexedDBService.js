angular.module('app.services')
//Service used to store the information in the device indexedDB
.service('IndexedDBService', function(){
    //Name of the DB
    const DB_NAME = "ITIN_DB";
    const ITI_STORE_NAME = "itineraries";
    const DB_VERSION = 1;
    var DB_INITIALIZED = false;
    //Variable fot the local indexed DB
    var db;

    //Función pública para inicializar la Base de datos por demanda
    this.init = function( callback ){
        console.log("4-IndexedDBService.init");
        initDB( callback );
    }

    //Private Function that Initializes the DB
    function initDB(callback){
        //Based in https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#JavaScript_Content
        console.log('5-IndexedDBService.initDB, ESTO SOLO SE DEBERÍA VER UNA VEZ');
        //debugger;

        if ( !indexedDB  ) {
           window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }else if( !DB_INITIALIZED ){
            var request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = function(evt){
                //debugger;
                console.error("Error inicializando la Base de datos:"+ evt);
            }

            request.onsuccess = function( evt ){
                //debugger;
                db = this.result;
                console.log("6-IndexedDBService.initiDB onsuccess: DB init DONE!");
                //debugger;
                DB_INITIALIZED = true;
                //Ejecuta el callback
                callback();
            }

            //Function called when the BD version changed
            request.onupgradeneeded = function( evt ){
                //debugger;
                console.log("openDb.onupgradeneeded");

                var dbEvt = evt.currentTarget.result;

                //Deletes the object store
                try{
                    dbEvt.deleteObjectStore( ITI_STORE_NAME );
                }catch( e ){
                    console.log("No se eliminó el objectStore: "+ITI_STORE_NAME);
                }

                //Create the objectStore to hold the information about itineraries
                var osItineraries = dbEvt.createObjectStore(ITI_STORE_NAME,{keyPath:"id", autoIncrement : true});

                //Creates an index for the search
                osItineraries.createIndex("name","name",{unique:false});

                //Creates an index to search by status
                osItineraries.createIndex("findByStatus","status",{unique:false});

                osItineraries.transaction.oncomplete = function(event){
                    console.log('Object storage created');
                    DB_INITIALIZED = true;
                    //Ejecuta el callback
                    callback();
                }
            }
        }
    }

    /*
    function to check if the DB is initialized already*/
    this.isInitialized = function(){
        return DB_INITIALIZED;
    }

    /**
    * @param {string} store_name
    * @param {string} mode either "readonly" or "readwrite"
    */
    function getObjectStore(store_name, mode) {
        var tx = db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    //Funciton that stores an object inside the indexedDB
    this.save = function( toSave){

        //debugger;
        console.log("Storing itinerary with name "+toSave.name);

        //Gets the object storage
        var store = getObjectStore(ITI_STORE_NAME, "readwrite");

        var req;

        try{
            //debugger;
            if( toSave.id ){//Updating
                req = store.put( toSave );

                req.onsuccess = function(event) {
                    console.log("Itinerary updated");
                };

                req.onerror = function(event) {
                    alert("Unable to update");
                };
            }else{//Inserting
                console.log('INSERTING');

                req = store.add( toSave );

                req.onsuccess = function(event) {
                    //Le asigna el id al itinerario recien almacenado
                    toSave.id = req.result;

                    console.log("Itinerario guardado en indexedDB");
                    console.log(toSave.id);
                };

                req.onerror = function(event) {
                    alert("Unable to add data\r\nPrasad is already exist in your database! ");
                };
            }
        }catch( e ){
            alert("Error guardando el itinerario ");
            console.log(e);
        };
    };

    //Funciton that stores an object inside the indexedDB
    this.delete = function( idItiDelete){

        //debugger;
        console.log("Deleting itinerary with id "+idItiDelete);

        //Gets the object storage
        var store = getObjectStore(ITI_STORE_NAME, "readwrite");

        var req;

        try{
            //debugger;
            req = store.delete( idItiDelete );

            req.onsuccess = function(event) {
                console.log("Itinerario eliminado de indexedDB");

                //debugger;
            };

            req.onerror = function(event) {
                alert("Unable to delete Itinerary! ");
            };
        }catch( e ){
            alert("Error eliminando el itinerario ");
        };
    };

    //Retrieves the itinerary with the specified Id
    this.getItineraryById = function( idIti, callBack ){
        //debugger;
        console.log("Retrieving itinerary with id "+idIti);

        //Gets the object storage
        var store = getObjectStore(ITI_STORE_NAME, "readonly");

        var req = store.get( idIti );

        req.onsuccess = function(event) {
            // Do something with the request.result!
            console.log("Itinerary retreieved from indexedDB ")
            callBack( req.result );
        };

        req.onerror = function(evt) {
            console.error("Error retrieving Itinerary", this.error);
        };
    };

    //Retreieve all the itineraries with a status
    this.findByStatus = function( statusQuery, fn ){
        //debugger;
        console.log("Query the itineraries with status "+statusQuery );


        var store = getObjectStore(ITI_STORE_NAME, "readonly");
        var index = store.index("findByStatus");

        var planned = [];

        index.openCursor( statusQuery ).onsuccess = function( evt ){
            //debugger;

            var cursor  = evt.target.result;

            if ( cursor ) {
                console.log("Resultados obtenidos: "+cursor.value);
                planned.push(cursor.value);
                cursor.continue();
            }else{
                //debugger;
                console.log("No results for the status "+statusQuery);
                fn(planned);
            }
        }

        return planned;
    }

    //Calls the init function, se debe llamar por demanda
    //initDB();
});
