angular.module('App')
	.controller('TemperatureHisCtrl', function($scope, userHistory, $ionicPopup, $http, $ionicLoading, $rootScope, $cordovaToast) {

		var uid = window.localStorage.uid;

		$scope.show = function() {

			$scope.data = {};

			// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="tel" ng-model="data.his">',
				title: '请输入你要记录的数值',
				subTitle: '保存将上传到云端',
				scope: $scope,
				buttons: [{
					text: '取消',

				}, {
					text: '<b>保存</b>',
					type: 'button-positive',
					onTap: function(e) {

						if(!$scope.data.his) {
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

							$http.get("http://api.3eat.net/kinleeb/data_tiwen_post.php?code=kinlee&uid=" + uid + "&dushu=" + $scope.data.his)
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

				$('#container7').highcharts({
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
						text: '体温'
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
						categories: userHistory.data[2][1][0]["_Adate"]
					},
					yAxis: {
						title: {
							text: null
						},
						labels: {
							formatter: function() {
								return this.value + '摄氏度';
							}
						}
					},
					tooltip: {
						pointFormat: '{series.name} ： <b>{point.y:,.0f}</b>'
					},

					series: [{
						name: '体温',
						//data: [45, 42, 10, 80, 52, 46, 21, 32, 70, 25, 79, 64]
						data: userHistory.data[2][1][0]["_Acontent"]
					}]
				});

			}, 500);

		});
	});