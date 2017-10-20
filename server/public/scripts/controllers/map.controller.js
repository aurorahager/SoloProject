myApp.controller('MapController', function (PlacesService, NgMap, $timeout, $scope) {
    vm = this;
    // var to hold location of mpls
    var mpls = {
        lat: 44.986656,
        lng: -93.258133
    };

    // set nav item for navbar to color correctly
    $scope.currentNavItem = 'places';

    // hold map
    vm.map = {};

    // ngMap
    NgMap.getMap("map").then(function (map) {
        console.log('daMap', map);
        vm.map = map;
        var infowindow = new google.maps.InfoWindow();
var service = new google.maps.places.PlacesService(map);
        // function to search nearby places that are open
        vm.searchPlaces = function () {
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: mpls,
                radius: 2000,
                openNow: true,
                type: [vm.types]//from user select
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // loop through response from Google API
                    for (var i = 0; i < results.length; i++) {
                        // call createMarker on each result
                        createMarker(results[i]);
                    }//END for loop
                }//END if OK
                console.log('results', results.place_id);
            } //END callback

        //     // function to place pins on map
            function createMarker(place) {
                // var placeLoc = place.geometry.location;
                // var marker = new google.maps.Marker({
                //     map: map,//on current map
                //     icon: 'imgs/cropcirclesIcon.png',//custom marker icon
                //     position: place.geometry.location//position of marker to address of place
                // });//END new marker

                // // create infowindow that appears on click of marker
                // infowindow = new google.maps.InfoWindow();
                // google.maps.event.addListener(marker, 'click', function () {
                // // set contents of infowindow to responses from Google Places API
                //     infowindow.setContent('<div>' + '<strong>' + place.name + '</strong><br>' +
                //  place.vicinity + '<br>' + 'Rating ' + place.rating
                //  + '</div>');
                //     infowindow.open(map, this);
                // });//END infowindow
            // } //END createMarker
        // } //END search function 


        

        service.getDetails({
          placeId: place.place_id
        }, function(place, status) {
            console.log('place', place);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              icon: 'imgs/cropcirclesIcon.png',//custom marker icon
              position: place.geometry.location
            });//END marker
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div>' + '<strong>' + place.name + '</strong><br>' +
                 place.formatted_address + '<br>' + 'Rating: ' + place.rating
                 + ' ' + place.formatted_phone_number + '  '+ '<button class="disButton" onClick="saveFav( \'' + place.place_id + '\')">Favorite</button><br><a href="' + place.website + '">'+place.website+'</a></div>');
              infowindow.open(map, this);
            });//END listener/ infowindoe
          }//END if
        });//END getDetails
            }
        }
    }); //END ngMap get map

});//END controller


    // function send favorites to service
    var saveFav = function (placeId) {
        // PlacesService.sendFavs(placeId);
        console.log('place to save:', placeId);
    }