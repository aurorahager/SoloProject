myApp.controller('EventsController', function( $scope) {
  console.log('EventsController created');
  var vm = this;

  // // api key mtf59wmLgBnDkmLw
  $scope.currentNavItem = 'events';

 vm.show_alert = function () {
    var oArgs = {
      app_key: "mtf59wmLgBnDkmLw",
      id: "20218701",
      page_size: 25,
    };

    EVDB.API.call("/events/get", oArgs, function (oData) {
      // Note: this relies on the custom toString() methods below
    });
  }



 vm.show_alert2 = function () {
    var oArgs = {
      app_key: "mtf59wmLgBnDkmLw",
      q: "music",
      where: "San Diego",
      "date": "2013061000-2015062000",
      page_size: 5,
      sort_order: "popularity",
    };

    EVDB.API.call("/events/search", oArgs, function (oData) {
      // Note: this relies on the custom toString() methods below
    });
  }
});//END controller
