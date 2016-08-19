angular.module('App')
	.controller('BloodCtrl', function($scope) {

		$scope.Resuly_DY = '000';
		$scope.isConnect = 'StartScan';
		$scope.address = false;

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

			$scope.$apply(function() {
				$scope.Resuly_DY = value;
			});

			return true;

			var bases64 = bases.fromBase(value, '64'),
				bases16 = bases.toBase(bases64, 16),

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