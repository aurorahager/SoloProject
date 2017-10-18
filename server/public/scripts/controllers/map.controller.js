myApp.controller('MapController', function (NgMap) {
    vm = this;
    mpls = {
        lat: 44.986656,
        lng: -93.258133
    };

    vm.map = {};
    NgMap.getMap("map").then(function (map) {
        console.log('daMap', map);
        vm.map = map;


        vm.searchPlaces = function () {
            console.log(vm.address);

            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: mpls,
                radius: 9000,
                openNow: true,
                type: [vm.types]
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
                console.log('results', results);
            } //END callback

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                });
            } //END createMarker
        } //END search function 
    }); //END ngMap get map
});



//         styles: [
//             { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
//             { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
//             { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
//             {
//                 featureType: 'administrative.locality',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#d59563' }]
//             },
//             {
//                 featureType: 'poi',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#d59563' }]
//             },
//             {
//                 featureType: 'poi.park',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#263c3f' }]
//             },
//             {
//                 featureType: 'poi.park',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#6b9a76' }]
//             },
//             {
//                 featureType: 'road',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#38414e' }]
//             },
//             {
//                 featureType: 'road',
//                 elementType: 'geometry.stroke',
//                 stylers: [{ color: '#212a37' }]
//             },
//             {
//                 featureType: 'road',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#9ca5b3' }]
//             },
//             {
//                 featureType: 'road.highway',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#746855' }]
//             },
//             {
//                 featureType: 'road.highway',
//                 elementType: 'geometry.stroke',
//                 stylers: [{ color: '#1f2835' }]
//             },
//             {
//                 featureType: 'road.highway',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#f3d19c' }]
//             },
//             {
//                 featureType: 'transit',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#2f3948' }]
//             },
//             {
//                 featureType: 'transit.station',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#d59563' }]
//             },
//             {
//                 featureType: 'water',
//                 elementType: 'geometry',
//                 stylers: [{ color: '#17263c' }]
//             },
//             {
//                 featureType: 'water',
//                 elementType: 'labels.text.fill',
//                 stylers: [{ color: '#515c6d' }]
//             },
//             {
//                 featureType: 'water',
//                 elementType: 'labels.text.stroke',
//                 stylers: [{ color: '#17263c' }]
//             }
//         ]
//     });