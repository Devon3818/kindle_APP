angular.module('App', ['ionic', 'ngCordova'])

//历史记录服务
.provider("userHistory", function() {
	var userHistory = {
		data		:	null
	};

	this.$get = function() {
		return userHistory;
	}

})

//用户数组
.provider("userArray", function() {
	
	var userArray = {
		users		:	[]
	};
	
	if( !window.localStorage.userArray ){
		var loU = [];
		window.localStorage.userArray = JSON.stringify( loU );
	}else{
		var loU = JSON.parse( window.localStorage.userArray );
		userArray.users = loU;
	}
	

	this.$get = function() {
		return userArray;
	}

})


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
		.state('register', {
			url: '/register',
			controller: 'RegCtrl',
			templateUrl: 'views/register/register.html'
		})
		.state('login', {
			url: '/login',
			controller: 'LogCtrl',
			templateUrl: 'views/login/login.html'
		})

	$urlRouterProvider.otherwise('/Home');
})

.run(function($ionicPlatform, $location, $cordovaAppVersion, $ionicPopup, $ionicLoading, $timeout, $cordovaFileTransfer, $cordovaFileOpener2, $http) {
	$ionicPlatform.ready(function() {

		$cordovaAppVersion.getVersionNumber().then(function(version) {
			var appVersion = version;
			//alert("version:" + appVersion);

			$http.get("http://www.devonhello.com/App")
				.success(function(response) {

					if(appVersion == response) {
						return true;
					}

					var confirmPopup = $ionicPopup.confirm({
						title: '版本升级-' + version,
						template: '1.文件大小23.5M;</br>2.优化了少量BUG;</br>3.优化了运行速度;</br>4.请在WiFi环境下更新', //从服务端获取更新的内容
						cancelText: '取消',
						okText: '升级'
					});

					confirmPopup.then(function(res) {
						if(res) {

							var urls = "http://www.devonhello.com/upload/android-debug.apk";
							var targetPath = cordova.file.externalApplicationStorageDirectory + "android-debug.apk";
							var trustHosts = true;
							var options = {};

							$ionicLoading.show({
								template: "已经下载：" + 0 + "%"
							});

							$cordovaFileTransfer.download(urls, targetPath, options, trustHosts)
								.then(function(result) {
									// Success!
									alert("Success!");
									$cordovaFileOpener2.open(
										targetPath,
										'application/vnd.android.package-archive'
									).then(function() {
										// Success!
									}, function(err) {
										// An error occurred. Show a message to the user
									});
								}, function(err) {
									// Error
									alert(JSON.stringify(err));
								}, function(progress) {
									$timeout(function() {

										var downloadProgress = (progress.loaded / progress.total) * 100;
										$ionicLoading.show({
											template: "已经下载：" + Math.floor(downloadProgress) + "%"
										});
										if(downloadProgress > 99) {
											$ionicLoading.hide();
										}

									});
								});

						} else {
							alert('You are not sure');
						}
					});

				});

		});

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