angular.module('App')
	.controller('BabyWeightHisCtrl', function($scope, userHistory, $ionicPopup) {
		
		$scope.show = function() {

			$scope.data = {};

			// 一个精心制作的自定义弹窗
			var myPopup = $ionicPopup.show({
				template: '<input type="tel" ng-model="data.his">',
				title: 'The values of input record',
				subTitle: 'Please use normal things',
				scope: $scope,
				buttons: [{
					text: 'Cancel',

				}, {
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(e) {

						if(!$scope.data.his) {
							//don't allow the user to close unless he enters wifi password
							e.preventDefault();
						} else {
							alert($scope.data.his);
							
						}
					}
				}, ]
			});
			myPopup.then(function(res) {
				//console.log('Tapped!', res);
			});

		}
		
		$(function() {
			setTimeout(function() {

				$('#container3').highcharts({
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
						text: 'Baby Weight History'
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
						categories: userHistory.data[1][1][0]["_Adate"]
					},
					yAxis: {
						title: {
							text: null
						},
						labels: {
							formatter: function() {
								return this.value + 'kg';
							}
						}
					},
					tooltip: {
						pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
					},

					series: [{
						name: 'USA',
						//data: [45, 42, 10, 80, 52, 46, 21, 32, 70, 25, 79, 64]
						data: userHistory.data[1][1][0]["_Acontent"]
					}]
				});

			}, 500);
		});

	});