myApp.controller('EventsController', function(UserService, $scope) {
  console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  $scope.currentNavItem = 'events';
});//END controller
