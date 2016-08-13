angular.module('App', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tour', {
			url: '/tour',
			templateUrl: 'views/tour/tour.html',
			controller: 'TourCtrl'
		})
		.state('home', {
			url: '/Home',
			templateUrl: 'views/home/home.html',
			controller: 'HomeCtrl'
		})
		.state('BabyWeight', {
			url: '/BabyWeight',
			controller: 'BabyWeightCtrl',
			templateUrl: 'views/babyWeight/babyWeight.html'
		})
		.state('BabyWeightHis', {
			url: '/BabyWeightHis',
			controller: 'BabyWeightHisCtrl',
			templateUrl: 'views/babyWeight/babyWeightHis.html'
		})
		.state('AdultWeight', {
			url: '/AdultWeight',
			controller: 'AdultWeightCtrl',
			templateUrl: 'views/adultWeight/adultWeight.html'
		})
		.state('AdultWeightHis', {
			url: '/AdultWeightHis',
			controller: 'AdultWeightHisCtrl',
			templateUrl: 'views/adultWeight/adultWeightHis.html'
		})

		.state('Temperature', {
			url: '/Temperature',
			controller: 'TemperatureCtrl',
			templateUrl: 'views/temperature/temperature.html'
		})
		.state('TemperatureHis', {
			url: '/TemperatureHis',
			controller: 'TemperatureHisCtrl',
			templateUrl: 'views/temperature/temperatureHis.html'
		})

		.state('Blood', {
			url: '/Blood',
			controller: 'BloodCtrl',
			templateUrl: 'views/blood/blood.html'
		})
		.state('BloodHis', {
			url: '/BloodHis',
			controller: 'BloodHisCtrl',
			templateUrl: 'views/blood/bloodHis.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'views/about/about.html'
		})
		.state('reservation', {
			url: '/reservation',
			templateUrl: 'views/reservation/reservation.html',
			controller: 'ReservationCtrl'
		})
		.state('events', {
			url: '/events',
			templateUrl: 'views/events/events.html',
			controller: 'EventsCtrl'
		})
		.state('food', {
			url: '/food',
			templateUrl: 'views/food/food.html',
			controller: 'FoodCtrl'
		})
		.state('weather', {
			url: '/weather',
			templateUrl: 'views/weather/weather.html',
			controller: 'WeatherCtrl'
		})
		.state('local', {
			abstract: true,
			url: '/local',
			templateUrl: 'views/local/local.html'
		})
		.state('local.food', {
			url: '/food',
			views: {
				'local-food': {
					templateUrl: 'views/local/food.html'
				}
			}
		})
		.state('local.beaches', {
			url: '/beaches',
			views: {
				'local-beaches': {
					templateUrl: 'views/local/beaches.html'
				}
			}
		})
		.state('local.sights', {
			url: '/sights',
			views: {
				'local-sights': {
					templateUrl: 'views/local/sights.html'
				}
			}
		});

	$urlRouterProvider.otherwise('/Home');
})

.run(function($ionicPlatform, $location) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});

	var firstVisit = localStorage.getItem('firstVisit');
	if(!firstVisit) {
		$location.url('/tour');
	}
})

.controller('NavbarCtrl', function($scope, $ionicSideMenuDelegate) {

	$scope.openMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
});