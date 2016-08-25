angular.module('App')
	.controller('BloodHisCtrl', function($scope, userHistory, $ionicPopup, $http, $ionicLoading, $rootScope, $cordovaToast) {

		var uid = window.localStorage.uid;

		$scope.show = function() {

			$scope.data = {};

			// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="tel" placeholder="高压" ng-model="data.his1"><br/><input type="tel" placeholder="低压" ng-model="data.his2"><br/><input type="tel" placeholder="脉搏" ng-model="data.his3">',
				title: '请输入你要记录的数值',
				subTitle: '保存将上传到云端',
				scope: $scope,
				buttons: [{
					text: '取消',

				}, {
					text: '<b>保存</b>',
					type: 'button-positive',
					onTap: function(e) {

						if(!$scope.data.his1 && !$scope.data.his2 && !$scope.data.his3) {
							//don't allow the user to close unless he enters wifi password
							$cordovaToast.showShortBottom('请输入要纪录数值').then(function(success) {
									// success
								}, function(error) {
									// error
								});
							e.preventDefault();
						} else {

							if(!$rootScope.isOnline) {
								//无网络状态
								$cordovaToast.showShortBottom('无可用网络').then(function(success) {
									// success
								}, function(error) {
									// error
								});
								return true;
							}

							$ionicLoading.show({
								template: 'Loading...'
							});

							$http.get("http://api.3eat.net/kinleeb/data_xueya_post.php?code=kinlee&uid=" + uid + "&gaoya=" + $scope.data.his1 + "&maibo=" + $scope.data.his3 + "&diya=" + $scope.data.his2)
								.success(function(response) {

									if(response[0]["_postok"] == 1) {

									}
									$ionicLoading.hide();
								}).error(function(data) {
									$ionicLoading.hide();
									alert("err");
								});

						}
					}
				}, ]
			});
			myPopup.then(function(res) {
				//console.log('Tapped!', res);
			});

		}

		$(function() {

			if(userHistory.data == 0) {
				//无资料
				$cordovaToast.showShortBottom('暂无数据可读取').then(function(success) {
					// success
				}, function(error) {
					// error
				});
				return true;
			}

			setTimeout(function() {

				$('#container4').highcharts({
					chart: {
						type: 'area'
					},
					legend: {
						align: 'right',
						verticalAlign: 'top',
						y: -2
					},
					credits: {
						enabled: false //取消右下角版权信息
					},
					navigation: {
						buttonOptions: {
							enabled: false //隐藏右上角功能按钮
						}
					},
					title: {
						text: '高压'
					},
					//				subtitle: {
					//					text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
					//						'thebulletin.metapress.com</a>'
					//				},
					xAxis: {
						allowDecimals: false,
						labels: {
							formatter: function() {
								return this.value; // clean, unformatted number for year
							}
						},
						//categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						categories: userHistory.data[3][1][0]["_Adate"]
					},
					yAxis: {
						title: {
							text: null
						},
						labels: {
							formatter: function() {
								return this.value + 'mmHg';
							}
						}
					},
					tooltip: {
						pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
					},

					series: [{
						name: '高压',
						//data: [45, 42, 10, 80, 52, 46, 21, 32, 70, 25, 79, 64]
						data: userHistory.data[3][1][0]["_Acontent"]
					}]
				});

				//================================

				$('#container5').highcharts({
					chart: {
						type: 'area'
					},
					legend: {
						align: 'right',
						verticalAlign: 'top',
						y: -2
					},
					credits: {
						enabled: false //取消右下角版权信息
					},
					navigation: {
						buttonOptions: {
							enabled: false //隐藏右上角功能按钮
						}
					},
					title: {
						text: '低压'
					},
					//				subtitle: {
					//					text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
					//						'thebulletin.metapress.com</a>'
					//				},
					xAxis: {
						allowDecimals: false,
						labels: {
							formatter: function() {
								return this.value; // clean, unformatted number for year
							}
						},
						//categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						categories: userHistory.data[3][1][0]["_Adate"]
					},
					yAxis: {
						title: {
							text: null
						},
						labels: {
							formatter: function() {
								return this.value + 'mmHg';
							}
						}
					},
					tooltip: {
						pointFormat: '{series.name} ： <b>{point.y:,.0f}</b>'
					},

					series: [{
						name: '低压',
						//data: [15, 10, 10, 14, 14, 18, 21, 32, 12, 10, 11, 14]
						data: userHistory.data[3][1][0]["_Bcontent"]
					}]
				});

				//================================

				//================================

				$('#container6').highcharts({
					chart: {
						type: 'area'
					},
					legend: {
						align: 'right',
						verticalAlign: 'top',
						y: -2
					},
					credits: {
						enabled: false //取消右下角版权信息
					},
					navigation: {
						buttonOptions: {
							enabled: false //隐藏右上角功能按钮
						}
					},
					title: {
						text: '脉搏'
					},
					//				subtitle: {
					//					text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
					//						'thebulletin.metapress.com</a>'
					//				},
					xAxis: {
						allowDecimals: false,
						labels: {
							formatter: function() {
								return this.value; // clean, unformatted number for year
							}
						},
						//categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
						categories: userHistory.data[3][1][0]["_Adate"]
					},
					yAxis: {
						title: {
							text: null
						},
						labels: {
							formatter: function() {
								return this.value + 'mmHk/kPa';
							}
						}
					},
					tooltip: {
						pointFormat: '{series.name} ： <b>{point.y:,.0f}</b>'
					},

					series: [{
						name: '脉搏',
						//data: [15, 10, 10, 14, 14, 18, 21, 32, 12, 10, 11, 14]
						data: userHistory.data[3][1][0]["_Ccontent"]
					}]
				});

				//================================

			}, 500);

		});
	});