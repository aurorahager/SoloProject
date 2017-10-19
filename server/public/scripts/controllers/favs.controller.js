myApp.controller('FavsController', function(UserService, $scope) {
  console.log('FavsController created');
  var vm = this;
  vm.userService = UserService;

  $scope.currentNavItem = 'favs';
});//END controller
