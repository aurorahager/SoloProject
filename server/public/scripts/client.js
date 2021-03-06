var myApp = angular.module('myApp', ['ngRoute', 'ngMap', 'ngMaterial', 'ngMessages', 'ngMdIcons'])

/// Routes ///
myApp.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      // controller: 'HomeController as hc',
    }) //END  .when home
    .when('/map', {
      templateUrl: '/views/templates/map.html',
      controller: 'MapController as mc'
    })
    .when('/login', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    }) //END  .when home
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    }) //END .when register
    .when('/events', {
      templateUrl: '/views/templates/events.html',
      controller: 'EventsController as ec'
      // resolve: {
      //   getuser : function(UserService){
      //     return UserService.getuser();
      //   }//END getuser
      // }//END resolve
    }) //END .when user
    .when('/favorites', {
      templateUrl: '/views/templates/faves.html',
      controller: 'FavesController as fc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        } //END getuser
      } //END resolve
    }) //END .when info
    .otherwise({
      redirectTo: 'home'
    }); //ENd otherwise

  $mdThemingProvider.theme('default').primaryPalette('pink').accentPalette('purple').dark();;
}); //END config