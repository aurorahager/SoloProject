myApp.controller('FavesController', function (UserService, PlacesService, $scope) {
  console.log('FavesController created');
  //globals
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.faves = PlacesService.daFaves;

  PlacesService.getFaves();
  console.log('faves in controller:', vm.faves);
  vm.deleteFave = function (faveId) {
    swal({
        title: "Are you sure?",
        text: "Remove place from saved list?",
        icon: "warning",
        background: '#000',
        buttons: ["Go back", "Yes, remove!"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Place has been removed!", {
            icon: "success",
          });
          console.log('delete:', faveId);
          PlacesService.deletePlace(faveId);
          PlacesService.getFaves();
        } else {
          swal("Your saved place is safe!");
        }
      })
  } //END deleteFave

  $scope.logout = function () {
    UserService.logout();
  } //END logout

  $scope.currentNavItem = 'faves';
}); //END controller