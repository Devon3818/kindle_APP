angular.module('App')
	.controller('BloodCtrl', function($scope, $ionicPopup, $http, $ionicLoading) {

		$scope.Resuly_DY = '000';
		$scope.Resuly_GY = '000';
		$scope.Resuly_MB = '000';
		$scope.isConnect = 'StartScan';
		$scope.address = false;
		
		var uid = window.localStorage.uid;
		
		//保存
		$scope.save = function() {

			$ionicLoading.show({
				template: 'Loading...'
			});
			
			$http.get("http://api.3eat.net/kinleeb/data_xueya_post.php?code=kinlee&uid=" + uid + "&gaoya=" + $scope.Resuly_GY + "&maibo=" + $scope.Resuly_MB + "&diya=" + $scope.Resuly_DY)
				.success(function(response) {
					

					if(response[0]["_postok"] == 1) {

					}
					$ionicLoading.hide();
				}).error(function(data) {
					$ionicLoading.hide();
					alert("err");
				});

		}

		//清除
		$scope.again = function() {
			
			$scope.Resuly_DY = '000';
			$scope.Resuly_GY = '000';
			$scope.Resuly_MB = '000';
		}
		
		$scope.show = function() {

			$scope.data = {};

			// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="tel" ng-model="data.his1"><br/><input type="tel" ng-model="data.his2"><br/><input type="tel" ng-model="data.his3">',
				title: 'The values of input record',
				subTitle: 'Please use normal things',
				scope: $scope,
				buttons: [{
					text: 'Cancel',

				}, {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(e) {

						if(!$scope.data.his1 && !$scope.data.his2 && !$scope.data.his3 ) {
							//don't allow the user to close unless he enters wifi password
							e.preventDefault();
						} else {
							
							$scope.Resuly_GY = $scope.data.his1;
							$scope.Resuly_DY = $scope.data.his2;
							$scope.Resuly_MB = $scope.data.his3;
						}
					}
				}, ]
			});
			myPopup.then(function(res) {
				//console.log('Tapped!', res);
			});

		}
		
		//初始化蓝牙
		$scope.ble_initialize = function() {
			bluetoothle.initialize(function(status) {
				if(status["status"] == "enabled") {

					$scope.ble_startScan();

				} else {
					alert("未开启蓝牙");
				}
			}, {
				"request": true,
				"statusReceiver": false,
				"restoreKey": "bluetoothleplugin"
			});
		};

		//
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
					alert("权限不足，蓝牙功能受限");
				}

			}, function() {
				alert("requestPermission no");
			});
		}

		//扫描蓝牙设备
		$scope.ble_startScan = function() {

			bluetoothle.startScan(function(status) {
				//alert(JSON.stringify(status));
				if(status["status"] == "scanResult") {

					if(status["name"] == "Health-center-BP" || status["name"] == "S-Power" ) {
						var address = status["address"];
						bluetoothle.stopScan(function(status) {
							//alert(JSON.stringify(status));

							$scope.ble_connect(address);

						}, function(status) {
							alert("停止扫描报错");
						});

					}
				}

			}, function(status) {
				alert("扫描失败");
			}, {
				"services": [],
				"allowDuplicates": true,
				"scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
				"matchMode": bluetoothle.MATCH_MODE_AGGRESSIVE,
				"matchNum": bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
				"callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES
			});
		};

		//
		$scope.ble_connect = function(address) {
			bluetoothle.connect(function(status) {
				//alert("连接成功");

				if(status["status"] == "connected") {

					$scope.$apply(function() {
						$scope.isConnect = "Connected";
						$scope.ble_discover(address);
						$scope.address = address;
					});
				} else if(status["status"] == "disconnected") {

					bluetoothle.close(function(status) {
						//alert(JSON.stringify(status));
						if(status["status"] == "closed") {
							$scope.$apply(function() {
								$scope.isConnect = "StartScan";
								$scope.ble_startScan();
							});
						}
					}, function(status) {
						alert("close：" + JSON.stringify(status));
					}, {
						"address": address
					});

				}

			}, function(status) {
				alert("连接失败" + JSON.stringify(status));
			}, {
				"address": address
			});
		}

		//
		$scope.ble_discover = function(address) {
			bluetoothle.discover(function(status) {
				//alert("ble_discover" + JSON.stringify(status));
				setTimeout(function() {
					$scope.ble_subscribe(address);
				}, 250);

			}, function(status) {
				alert("ble_discover" + JSON.stringify(status));
			}, {
				"address": address
			});
		}

		//
		$scope.ble_subscribe = function(address) {
			bluetoothle.subscribe(function(status) {
				if(status["status"] == "subscribedResult") {
					//alert(JSON.stringify(status));
					$scope.decoding(status["value"]);
				}
			}, function(status) {
				//alert("subscribe：" + JSON.stringify(status));
			}, {
				"address": address,
				"service": "0000fff0-0000-1000-8000-00805f9b34fb",
				"characteristic": "0000fff4-0000-1000-8000-00805f9b34fb",
			});
		}

		//
		$scope.ble_isInitialized = function() {
			bluetoothle.isInitialized(function(status) {

				//alert(status);
				if(status["isInitialized"]) {
					//alert("蓝牙已初始化");
					$scope.ble_startScan();
				} else {
					//alert("蓝牙未初始化");
					$scope.ble_initialize();
				}

			});
		}

		$scope.load = function() {

			$scope.ble_hasPermission();

		};

		$scope.decoding = function(value) {


			var bases64 = bases.fromBase(value, '64'),
				bases16 = bases.toBase(bases64, 16);

			if (bases16.length < 6) {
				//正在检查血压
				
				var basesA = bases16.substr(2, 2),
					basesB = bases.fromBase(basesA, '16'),
					basesC = bases.toBase(basesB, 10);
				
				//设置低压
				$scope.$apply(function() {
					$scope.Resuly_DY = basesC;
				});
				
			}else{
				//最终结果
				
				var basesA = bases16,
					basesB = basesA.substr(2, 4),
					basesC = bases.fromBase(basesB, '16'),
					basesD = bases.toBase(basesC, 10);
				
				//设置高压
				$scope.$apply(function() {
					$scope.Resuly_GY = basesD;
				});
				
				
				var basesA = bases16,
					basesB = basesA.substr(6, 4),
					basesC = bases.fromBase(basesB, '16'),
					basesD = bases.toBase(basesC, 10);
				
				//设置低压
				$scope.$apply(function() {
					$scope.Resuly_DY = basesD;
				});
				
				var basesA = bases16.substr(-4, 2),
					basesB = bases.fromBase(basesA, '16'),
					basesC = bases.toBase(basesB, 10);
				
				//设置脉搏
				$scope.$apply(function() {
					$scope.Resuly_MB = basesC;
				});
				
				
			}












				str = bases16.substr(4, 4) + '',
				Result = (parseInt(bases.toBase(str, 10))) / 10;
			//Result_BMI = Result / (height * height) * 10000;

			$scope.$apply(function() {
				$scope.Resuly = Result;
			});

		}

		//控制器消除事件
		$scope.$on('$destroy', function() {
			//alert("$destroy");
			bluetoothle.stopScan(function(status) {}, function(status) {});
			if($scope.address) {
				bluetoothle.close(function(status) {}, function(status) {}, {
					"address": $scope.address
				});
			}
		});

		//页面进入完成时触发事件
		//$scope.address = false;
		$scope.load();

	});