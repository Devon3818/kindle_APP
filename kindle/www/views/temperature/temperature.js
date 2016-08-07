angular.module('App')
	.controller('TemperatureController', function($scope) {
		$scope.Resuly = '00.0';
		$scope.isConnect = 'startScan';

		//初始化蓝牙
		$scope.ble_initialize = function() {
			bluetoothle.initialize(function(status) {
				if(status["status"] == "enabled") {

					//====================
					bluetoothle.requestPermission(function(status) {

						if(status["requestPermission"] == true) {
							//alert("requestPermission ok");

							bluetoothle.requestLocation(function(status) {
								if(status["requestLocation"] == true) {
									//alert("requestLocation ok");
									$scope.ble_startScan();
								}
							}, function() {
								alert("requestLocation no");
							});

						}

					}, function() {
						alert("requestPermission no");
					});
					//=============
				} else {
					alert("未开启蓝牙");
				}
			}, {
				"request": true,
				"statusReceiver": false,
				"restoreKey": "bluetoothleplugin"
			});
		};

		//扫描蓝牙设备
		$scope.ble_startScan = function() {
			bluetoothle.startScan(function(status) {
				//alert(JSON.stringify(status));
				if(status["status"] == "scanResult") {
					if(status["name"] == "Tem BH") {
						bluetoothle.stopScan(function(status) {}, function(status) {});
						var address = status["address"];
						bluetoothle.connect(function(status) {
							//alert("连接成功");
							//alert(JSON.stringify(status));

							$scope.$apply(function() {
								$scope.isConnect = "Is Connect";
							});

							bluetoothle.discover(function(status) {
								//alert(JSON.stringify(status));
								bluetoothle.subscribe(function(status) {
									if(status["status"] == "subscribedResult") {
										//alert(JSON.stringify(status));
										$scope.decoding(status["value"]);
									}
								}, function(status) {}, {
									"address": address,
									"service": "00001809-0000-1000-8000-00805f9b34fb",
									"characteristic": "00002a1c-0000-1000-8000-00805f9b34fb",
								});

							}, function(status) {}, {
								"address": address
							});
						}, function(status) {
							alert("连接失败");
						}, {
							"address": address
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

		$scope.load = function() {

			bluetoothle.isInitialized(function(status) {

				//alert(status);
				if(status["isInitialized"]) {
					$scope.ble_initialize();
				} else {
					$scope.ble_initialize();
				}

			});

		};

		$scope.decoding = function(value) {

			var bases64 = bases.fromBase(value, '64'),
				bases16 = bases.toBase(bases64, 16),

				type = bases16.substr(2, 2) + '',
				num = bases16.substr(0, 2) + '';

			switch(type) {
				case "00":
					var str = bases.fromBase(num, '16'),
						Result = (parseInt(bases.toBase(str, 10))) / 10;

					$scope.$apply(function() {
						$scope.Resuly = Result;
					});
					break;
				case "10":
					var first = num.substr(0, 1),
						result = num.substr(1, 1) + first,
						str = bases.fromBase(result, '16'),
						Result = (parseInt(bases.toBase(str, 10)) + 256) / 10;

					$scope.$apply(function() {
						$scope.Resuly = Result;
					});
					break;
				default:
					var n = type.substr(1, 1);
					if(n > 0) {
						var str = bases.fromBase(num, '16'),
							Result = (parseInt(bases.toBase(str, 10)) + (256 * n)) / 10;

						$scope.$apply(function() {
							$scope.Resuly = Result;
						});
					}
			}

		}

		$scope.load();
	});