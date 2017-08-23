angular.module('app.services')
//Servicio
.service('CacheService', function( ItineraryService){
   //alert('INICIALIZO CACHE SERVICE');
    //Itinerary selected in the different modules
    this.selected = {};
    this.summary = {};

    //the reference to the selected itinerary
    this.setSummaryInfo = function( summary ){
        this.summary = summary;
    }

    this.getSummaryInfo = function(){
      if ( !this.summary.lastUpdated && this.selected ){
        refreshSummaryInfo(this);
        this.summary.lastUpdated = new Date();
      }
      return this.summary;
    }

    //Functtion thath refresh the summarInfo
    function refreshSummaryInfo( self ){
      var curItinerary = self.selected;
      self.summary.totalSpent = ItineraryService.getTotalExpenses( curItinerary );
      self.summary.endDate = ItineraryService.getEndDate( curItinerary );
      self.summary.initialDate = curItinerary.initialDate;
      self.summary.daysLeft = ItineraryService.getLeftDays( curItinerary);
      self.summary.totalActivities = ItineraryService.getTotalActivities( curItinerary );


      /*var currDate = new Date();
      var currTimeMS = currDate.getTime() - curItinerary.initialDate.getTime();
      var curDayIndex = Math.ceil( currTimeMS / 86400000);*/
    }

    this.storeSelected = function( itinerary ){
      var self = this;
      self.selected = itinerary;
      refreshSummaryInfo( self );
    }

    this.getSelected = function(){
      return this.selected;
    }
});
