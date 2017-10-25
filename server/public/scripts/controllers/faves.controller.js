myApp.controller('FavesController', function(UserService, PlacesService, $scope) {
  console.log('FavesController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.faves = PlacesService.daFaves; 
  PlacesService.getFaves();

  console.log('faves in controller:', vm.faves);
  
vm.deleteFave = function (faveId){
  console.log('delete:', faveId);
  PlacesService.deletePlace(faveId);
  PlacesService.getFaves();
}//END deleteFave

  $scope.currentNavItem = 'faves';
});//END controller
