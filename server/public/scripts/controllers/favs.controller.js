myApp.controller('FavsController', function(UserService) {
  console.log('FavsController created');
  var vm = this;
  vm.userService = UserService;
});//END controller
