myApp.controller('FavsController', function(UserService, $scope) {
  console.log('FavsController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  $scope.currentNavItem = 'favs';
});//END controller
