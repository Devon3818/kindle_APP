angular.module('App').controller('HomeCtrl', function($scope, $cordovaFile, $http, userHistory, $rootScope, $cordovaToast) {

	$scope.uid = window.localStorage.uid;

	$scope.ble_isEnabled = function() {

		bluetoothle.isEnabled(function(status) {

			if(status["isEnabled"] == false) {

				$scope.ble_enable();
			}

		});

	}

	$scope.ble_enable = function() {
		bluetoothle.enable(function(status) {

		}, function(status) {

			$cordovaToast.showShortBottom('蓝牙开启失败').then(function(success) {
				// success
			}, function(error) {
				// error
			});
		});
	}

	$scope.ble_isInitialized = function() {

		bluetoothle.isInitialized(function(status) {

			//alert(status);
			if(status["isInitialized"]) {
				//alert("蓝牙已初始化");
				$scope.ble_isEnabled();
			} else {
				//alert("蓝牙未初始化");
				$scope.ble_initialize();
			}

		});
	}

	//初始化蓝牙
	$scope.ble_initialize = function() {

		bluetoothle.initialize(function(status) {
			//alert(JSON.stringify(status));
			if(status["status"] == "enabled") {

				//系统判断，执行相应的函数
				if($rootScope.systemName == 1) {
					//ios
					//bluetoothle.stopScan(function(status) {}, function(status) {});
				} else {
					//android
					$scope.ble_isEnabled();
				}

			} else {

				$cordovaToast.showShortBottom('未开启蓝牙').then(function(success) {
					// success
				}, function(error) {
					// error
				});
			}
		}, {
			"request": true,
			"statusReceiver": false,
			"restoreKey": "bluetoothleplugin"
		});
	};

	$scope.ble_hasPermission = function() {
		bluetoothle.hasPermission(function(status) {
			if(status["hasPermission"] == false) {
				$scope.ble_requestPermission();
			} else {
				$scope.ble_isInitialized();

			}
		});
	}

	$scope.ble_requestPermission = function() {
		bluetoothle.requestPermission(function(status) {

			if(status["requestPermission"] == true) {
				//alert("requestPermission ok");
				$scope.ble_isInitialized();
			} else {

				$cordovaToast.showShortBottom('权限不足，蓝牙功能受限').then(function(success) {
					// success
				}, function(error) {
					// error
				});
			}

		}, function() {
			//alert("requestPermission no");
		});
	}

	//控制器消除事件
	$scope.$on('$destroy', function() {
		//alert("$destroy");
	});

	//系统判断，执行相应的函数
	if($rootScope.systemName == 1) {
		//ios
		$scope.ble_isInitialized();

	} else {
		//android
		$scope.ble_hasPermission();
	}

	//文件写入
	$scope.writeF = function() {

		if(!$rootScope.isOnline) {
			//无网络状态
			$cordovaToast.showShortBottom('无可用网络').then(function(success) {
				// success
			}, function(error) {
				// error
			});

			// 读取文件
			$cordovaFile.readAsText(cordova.file.dataDirectory, "data_" + $scope.uid + ".txt")
				.then(function(success) {
					// success
					userHistory.data = JSON.parse(success);

				}, function(error) {
					// error
					//alert("资料获取失败");
				});

			return true;
		}

		$http.get("http://xxx/all_his.php?code=kinlee&uid=" + $scope.uid)
			.success(function(response) {
				//$scope.names = response.records;
				var content = JSON.stringify(response);

				//写入文件测试
				$cordovaFile.writeFile(cordova.file.dataDirectory, "data_" + $scope.uid + ".txt", content, true)
					.then(function(success) {
						userHistory.data = JSON.parse(content);

					}, function(error) {
						// error
						alert("error:" + error);
					});

			});

	}

	$scope.writeF();

});