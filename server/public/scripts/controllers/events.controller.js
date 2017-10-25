myApp.controller('EventsController', function( PlacesService, $scope) {
  console.log('EventsController created');
  var vm = this;
  vm.events = PlacesService.daEvents;

  // // api key mtf59wmLgBnDkmLw

    PlacesService.getEvents();
    console.log('Events in controller:', vm.events);
    
});//END controller
