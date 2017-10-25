myApp.service('PlacesService', function($http){

var self = this;
self.daFaves = [];
self.daEvents = [];


self.sendFave = function (placeId) {
    console.log('place id from service:', placeId);
    var objToSend = {data: placeId};
    $http({
        method: 'PUT',
        url: '/faves',
        data: objToSend
    }).then( function (resp){
            console.log('response from put:', resp);
        })//END  $http PUT
}//END sendFave

// function to get favorite places id from server and get details from google API
self.getFaves = function () {
    $http ({
        method: 'GET',
        url:'/faves'
    }).then( function (resp){
        // set var to places array from response
        var places = resp.data.places
        // get up google API
        var map = new google.maps.Map(document.createElement('div'));
        var service = new google.maps.places.PlacesService(map);
        // loop through places array
         for ( i = 0 ; i < places.length; i++) {
            //  get details from API for each place
        service.getDetails({
            placeId: places[i]
        }, function (place, status) {
            // if status from google places API is OK
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                console.log('place in service:', place);
                // push new place object to global empty array
                self.daFaves.push(place);
                console.log('daFaves:', self.daFaves);
            }//END if
            })//END getDetails
        }//END for loop
    })//END $http GET
}//END getFaves

self.deletePlace = function (placeId) {
    console.log('place to delete from service:', placeId);
    console.log('place id from service:', placeId);
    var objToSend = { data: placeId };
    $http({
        method: 'PUT',
        url: '/faves/delete',
        data: objToSend
    }).then(function (resp) {
        console.log('response from put:', resp);
    })//END  $http PUT
}//END deletePlace

self.getEvents = function () {
    $http({
        method: 'GET',
        url: '/events',
    }).then( function (resp){
        self.daEvents.push(resp.data.search.events.event);
    })//END $http GET
}//END getEvents
});//END service 