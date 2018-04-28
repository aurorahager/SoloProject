myApp.controller('EventsController', function (PlacesService, UserService, $scope, $location, $anchorScroll) {
  console.log('EventsController created');
  var vm = this;
  vm.events = [];
  // for navbar
  $scope.currentNavItem = 'events';

  // function to hide spinner and show title when content loads
  vm.activated = function () {
    if (vm.events.length > 0) {
      return true;
    } //END if 
  } //END activated

  // function to call scrollFunction on scroll
  window.onscroll = function () {
    scrollFunction()
  };//END onscroll

  // function to only show scroll to top button after page as been scrolled down
  function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById("scrollBtn").style.display = "block";
    } else {
      document.getElementById("scrollBtn").style.display = "none";
    }//END else
  }//END scrollFunction

  // function for button to scroll to top
  $scope.gotoTop = function () {
    // set the location.hash to the id of
    // the element you wish to scroll to.
    $location.hash('backTT');
    // call $anchorScroll()
    $anchorScroll();
  }; //END gotoTop


  //function to getEvents from places service
  function getEvents () {
    PlacesService.getEvents();
    vm.events = PlacesService.daEvents;    
  }//END get events

  //CALL getEvents
  getEvents();

  $scope.logout = function () {
    UserService.logout();
  }//END logout

  console.log('Events in controller:', vm.events);

}); //END controller