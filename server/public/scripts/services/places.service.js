myApp.service('PlacesService', function ($http) {

    //Globals
    var self = this;
    self.daFaves = [];
    self.daEvents = [];


    // function to send saved/faves to server -> DB
    self.sendFave = function (placeId) {
        console.log('place id from service:', placeId);
        // set the object to send as  the place_id(from API)
        var objToSend = {
            data: placeId
        };
        // PUT request
        $http({
            method: 'PUT',
            url: '/faves',
            data: objToSend
        }).then(function (resp) {
            console.log('response from put:', resp);
        }) //END  $http.then
    } //END sendFave

    // function to get saved places id from server <- DB | and get details from google API
    self.getFaves = function () {
        // GET request
        $http({
            method: 'GET',
            url: '/faves'
        }).then(function (resp) {
            // set var to places array from response
            var places = resp.data.places
            // set google API variables
            var map = new google.maps.Map(document.createElement('div'));
            var service = new google.maps.places.PlacesService(map);
            // temporary array push places into
            var tempArray = [];
            // loop through places array
            for (i = 0; i < places.length; i++) {
                //  get details from API for each place
                service.getDetails({
                    placeId: places[i]
                }, function (place, status) {
                    // if status from google places API is OK
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log('place in service:', place);
                        // push new place object to local empty array
                        tempArray.push(place);
                    } //END if
                }) //END getDetails
            } //END for loop
            // set global array equal to local tempArray
            self.daFaves = tempArray;
        }) //END $http.then
    } //END getFaves


    // Function to send deleted saved place's id to server -> DB
    self.deletePlace = function (placeId) {
        console.log('place to delete from service:', placeId);
        console.log('place id from service:', placeId);
        var objToSend = {
            data: placeId
        };
        // PUT request
        $http({
            method: 'PUT',
            url: '/faves/delete',
            data: objToSend
        }).then(function (resp) {
            console.log('response from put:', resp);
        }) //END $http.then
    } //END deletePlace

    // function to get events from server <- API
    self.getEvents = function () {
        //GET request
        $http({
            method: 'GET',
            url: '/events',
        }).then(function (resp) {
            // set global array equal to events results from API
            self.daEvents.push(resp.data.search.events.event);
            console.log('events in service:', self.daEvents);
        }) //END $http.then
    } //END getEvents
}); //END service