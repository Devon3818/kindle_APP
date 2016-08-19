angular.module('App').controller('RegCtrl', function($scope, $ionicNavBarDelegate, $http, userArray, $ionicLoading) {

	//	var picker = new mui.PopPicker();
	//  picker.setData([{value:'zz',text:'智子'}]);
	//  picker.show(function (selectItems) {
	//	   alert(selectItems[0].text);//智子
	//	   alert(selectItems[0].value);//zz
	//  })

	$scope.username = '';

	$scope.password = '';

	$scope.height = '';

	$scope.sex = 'Man';

	//注册事件
	$scope.register = function() {

		if($scope.username.length && $scope.password.length && $scope.height.length) {
			if($scope.sex = "Man") {
				var sex = 0;
			} else {
				var sex = 1;
			}

			$ionicLoading.show({
				template: 'Loading...'
			});

			$http.get("http://api.3eat.net/kinleeb/user_reg.php?code=kinlee&height=" + $scope.height + "&age=20&sex=" + sex + "&uname=" + $scope.username + "&pwd=" + $scope.password)
				.success(function(response) {
					//alert(response);
					//alert(JSON.stringify(response));

					if(response[0]["_regok"]) {
												
						var userObj = {};
						userObj.id = response[0]["_regok"];
						userObj.name = response[0]["_uname"];
						userObj.sex = response[0]["_sex"];
						userObj.age = response[0]["_age"];
						userObj.height = response[0]["_height"];
						userObj.litpic = 'img/user.png';

						userArray.users.push(userObj);
						
						window.localStorage.userArray = JSON.stringify(userArray.users);
						$ionicLoading.hide();
						
						$ionicNavBarDelegate.back();

					} else {
						alert("注册失败，用户名重复或其他问题");
					}

				});
		} else {
			alert("请输入完整");
			return true;
		}

	}

	//$ionicNavBarDelegate.back();

})