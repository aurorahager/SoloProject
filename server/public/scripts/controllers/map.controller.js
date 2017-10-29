myApp.controller('MapController', function (UserService, PlacesService, NgMap, $timeout, $scope, $compile) {
    vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    console.log('user!!!!->', vm.userObject);

    // var to hold location of mpls
    var mpls = {
        lat: 44.978031,
        lng: -93.263501
    };

    // set nav item for navbar to color correctly
    $scope.currentNavItem = 'places';

    // hold map
    vm.map = {};

    // ngMap
    NgMap.getMap("map").then(function (map) {
        // set vm.map to map
        vm.map = map;
        // set infowinow and service
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 200
        });
        var service = new google.maps.places.PlacesService(map);
        // function to search nearby places that are open
        vm.searchPlaces = function () {
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: mpls,
                radius: 2000,
                openNow: true,
                type: [vm.types] //from user select
            }, callback);

            // callback function
            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // loop through response from Google API
                    for (var i = 0; i < results.length; i++) {
                        // call createMarker on each result
                        createMarker(results[i]);
                        console.log('results!!!', results);

                    } //END for loop
                } //END if OK
                console.log('results', results.place_id);
            } //END callback

            // function to place pins on map
            function createMarker(place) {
                // get details from google places API
                service.getDetails({
                    placeId: place.place_id
                }, function (place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        //   new marker for each place result
                        var marker = new google.maps.Marker({
                            map: map,
                            icon: 'imgs/cropcirclesIcon.png', //custom marker icon
                            position: place.geometry.location,
                        }); //END marker
                        // click listener on pins 
                        google.maps.event.addListener(marker, 'click', function () {
                            // create infowindow content | name, address, rating, phone number, website
                            //button on click taking place id paramater 
                            var content = '<div id="iw-container"><div class="iw-title">' + place.name + '</div>' +
                                place.formatted_address + '<br>' + 'Rating: ' + place.rating +
                                '<br> ' + place.formatted_phone_number + '  <br>' + '<md-button class="lefty" href="' +
                                place.website + '">Visit Site</md-button> <md-button class="padDis righty" ng-click="mc.saveFave( \'' +
                                place.place_id + '\')">  <ng-md-icon icon="favorite" style="fill: #ff3467" size="30" class="padDis"></ng-md-icon><md-tooltip md-direction="top">Save</md-tooltip></md-button></div>';
                            //  compile content
                            var compiledContent = $compile(content)($scope);
                            //  set infowindow content to compiled content
                            infowindow.setContent(compiledContent[0]);
                            // open infowindow on click
                            infowindow.open(map, this);
                        }); //END listener/ infowindoe
                    } //END if
                }); //END getDetails
            } //END createMarker
        } //END search places
    }); //END ngMap get map

    // function to send place id of favorite to service
    vm.saveFave = function (placeId) {
        console.log('place ID:', placeId);
        PlacesService.sendFave(placeId);
        swal("Saved!", "Your place has been saved!", "success");
    }
}); //END controller