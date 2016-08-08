angular.module('App')
	.controller('HomeController', function($scope) {

		$scope.ble_isEnabled = function() {
			
			bluetoothle.isEnabled(function(status){
				
				if( status["isEnabled"] == false ){
					alert("开启蓝牙功能");
					$scope.ble_enable();
				}
				
			});
			
		}
		
		$scope.ble_enable = function(){
			bluetoothle.enable(function(status){
				
				alert("蓝牙已开启");
				alert(JSON.stringify(status));
				
			},function(status){
				
				alert("蓝牙开启失败");
				alert(JSON.stringify(status));
				
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
				if(status["status"] == "enabled") {

					$scope.ble_isEnabled();

				} else {
					alert("未开启蓝牙");
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
					alert("权限不足，蓝牙功能受限");
				}

			}, function() {
				alert("requestPermission no");
			});
		}
		
		//页面进入完成时触发事件
		$scope.$on("$ionicView.afterEnter", function(event, data) {
			$scope.ble_hasPermission();
		});
		
	});