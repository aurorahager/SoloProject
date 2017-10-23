myApp.service('PlacesService', function($http){

var self = this;

self.sendFave = function (placeId) {
    console.log('place id from service:', placeId);
}
});//END service 