myApp.controller('EventsController', function(UserService) {
  console.log('EventsController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
});//END controller
