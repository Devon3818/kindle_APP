angular.module('App', ['ionic','ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: '/home',
			controller: 'HomeController',
			templateUrl: 'views/home/home.html'
		})
		.state('BabyWeight', {
			url: '/BabyWeight',
			controller: 'BabyWeightController',
			templateUrl: 'views/babyWeight/babyWeight.html'
		})
		.state('AdultWeight', {
			url: '/AdultWeight',
			controller: 'AdultWeightController',
			templateUrl: 'views/adultWeight/adultWeight.html'
		})
		.state('Temperature', {
			url: '/Temperature',
			controller: 'TemperatureController',
			templateUrl: 'views/temperature/temperature.html'
		})
		.state('Blood', {
			url: '/Blood',
			controller: 'BloodController',
			templateUrl: 'views/blood/blood.html'
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
		
//		$cordovaPlugin.someFunction().then(function(){
//			alert("success");
//		}, function(){
//			alert("error");
//		});
		
	});
})