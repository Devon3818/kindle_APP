angular.module('App')
	.controller('TemperatureController', function($scope) {
		$scope.reservation = {
			checkin: new Date(),
			checkout: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
			room: 156,
			rate: 121,
			wifi: 'resortwifi'
		};

		//初始化蓝牙
		$scope.ble_initialize = function() {
			bluetoothle.initialize(function(status) {
				if(status["status"] == "enabled") {

					//====================
					bluetoothle.requestPermission(function(status) {

						if(status["requestPermission"] == true) {
							alert("requestPermission ok");

							bluetoothle.requestLocation(function(status) {
								if(status["requestLocation"] == true) {
									alert("requestLocation ok");
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
							alert("连接成功");
							alert(JSON.stringify(status));
							bluetoothle.discover(function(status) {
								alert(JSON.stringify(status));
								bluetoothle.subscribe(function(status) {
									if(status["status"] == "subscribedResult") {
										alert(JSON.stringify(status));
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
					alert("TURES");
					$scope.ble_initialize();
				} else {
					alert("FALSES");
					$scope.ble_initialize();
				}

			});

		}
		$scope.load();
	});