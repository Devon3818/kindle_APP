angular.module('App', ['ionic', 'ngCordova'])

//历史记录服务
.provider("userHistory", function() {
	var userHistory = {
		data: 0
	};

	this.$get = function() {
		return userHistory;
	}

})

//用户数组
.provider("userArray", function() {

	var userArray = {
		users: []
	};

	if(!window.localStorage.userArray) {
		var loU = [];
		window.localStorage.userArray = JSON.stringify(loU);
	} else {
		var loU = JSON.parse(window.localStorage.userArray);
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
		.state('set', {
			url: '/set',
			controller: 'SetCtrl',
			templateUrl: 'views/setting/setting.html'
		})
		.state('userlist', {
			url: '/userlist',
			controller: 'UserListCtrl',
			templateUrl: 'views/userlist/userlist.html'
		})
		.state('user', {
			url: '/user',
			controller: 'User',
			templateUrl: 'views/user/user.html'
		})

	$urlRouterProvider.otherwise('/Home');
})

.run(function($ionicSideMenuDelegate, $ionicPlatform, $location, $cordovaAppVersion, $ionicPopup, $ionicLoading, $timeout, $cordovaFileTransfer, $cordovaFileOpener2, $http, $cordovaNetwork, $rootScope, $cordovaToast, $cordovaDevice) {
	$ionicPlatform.ready(function() {

		//全局网络状态
		$rootScope.isOnline = $cordovaNetwork.isOnline();
		
		//全局手机系统	0->ios;	1->android
		$rootScope.systemName = $cordovaDevice.getPlatform()=="iOS"?1:0;
		
		//全局手机系统版本
		$rootScope.systemVersion = $cordovaDevice.getVersion().split('.')[0];
		
		//遗留属性
		//alert($rootScope.systemName);
		//alert($rootScope.systemVersion);
		
		if($rootScope.isOnline) {

			$cordovaAppVersion.getVersionNumber().then(function(version) {
				var appVersion = version;
				//alert("version:" + appVersion);
				
				if($rootScope.systemName==1){
					return true;
				}
				
				$http.get("http://www.devonhello.com/App")
					.success(function(response) {

						if(appVersion == response) {
							return true;
						}

						var confirmPopup = $ionicPopup.confirm({
							title: '版本升级-' + version,
							template: '请在WiFi环境下更新,修复已知bug', //从服务端获取更新的内容
							cancelText: '取消',
							okText: '升级'
						});

						confirmPopup.then(function(res) {
							if(res) {

								var urls = "http://www.devonhello.com/upload/kindle.apk";
								var targetPath = cordova.file.externalApplicationStorageDirectory + "kindle.apk";
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
								//alert('You are not sure');
							}
						});

					});

			});

		} else {

			$cordovaToast.showShortBottom('无可用网络').then(function(success) {
				// success
			}, function(error) {
				// error
			});

		}

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}

		// 监听手机网络在线事件
		$rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
			//alert(networkState);
			$rootScope.isOnline = true;

		})

		// 监听手机网络离线事件
		$rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
			//alert(networkState);
			$rootScope.isOnline = false;

		})

	});

	$ionicSideMenuDelegate.canDragContent(false);
	$location.url('/tour');
	
})

.controller('NavbarCtrl', function($scope, $ionicSideMenuDelegate) {
	
	$ionicSideMenuDelegate.canDragContent(false);
	
	$scope.openMenu = function() {
		
		//$ionicSideMenuDelegate.toggleLeft();

	};
});