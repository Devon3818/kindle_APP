angular.module('App', ['ionic'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html'
    })
    .state('BabyWeight', {
      url: '/BabyWeight',
      controller: 'BabyWeightController',
      templateUrl: 'views/BabyWeight/BabyWeight.html'
    })
    .state('weather', {
      url: '/weather',
      controller: 'WeatherController',
      templateUrl: 'views/weather/weather.html'
    })
    .state('restaurants', {
      url: '/restaurants',
      controller: 'RestaurantsController',
      templateUrl: 'views/restaurants/restaurants.html'
    })
    .state('tour', {
      url: '/tour',
      templateUrl: 'views/tour/tour.html'
    });

  $urlRouterProvider.otherwise('/tour');

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
