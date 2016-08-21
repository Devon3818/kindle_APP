angular.module('App').controller('SetCtrl', function($scope, $ionicNavBarDelegate, $http, $ionicLoading, $cordovaAppVersion, $ionicPopup, $timeout, $cordovaFileTransfer, $cordovaFileOpener2) {

	$scope.pushNotification = true;
	$scope.version = "0.0.0";


	$scope.update = function() {

		$cordovaAppVersion.getVersionNumber().then(function(version) {
			var appVersion = version;
			//alert("version:" + appVersion);

			$http.get("http://www.devonhello.com/App")
				.success(function(response) {

					if(appVersion == response) {
						alert("已是最新版本");
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

	}

	$cordovaAppVersion.getVersionNumber().then(function(version) {

		$scope.$apply(function() {
			$scope.version = version;
		});
	});

	$scope.pushNotificationChange = function() {

		$scope.pushNotification = !$scope.pushNotification;

		alert($scope.pushNotification);

	};

})