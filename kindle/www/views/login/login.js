angular.module('App').controller('LogCtrl', function($scope, $ionicNavBarDelegate, $http, $cordovaFileTransfer, userArray, $ionicLoading, $rootScope, $cordovaToast) {

	//	var picker = new mui.PopPicker();
	//  picker.setData([{value:'zz',text:'智子'}]);
	//  picker.show(function (selectItems) {
	//	   alert(selectItems[0].text);//智子
	//	   alert(selectItems[0].value);//zz
	//  })

	$scope.Username = '';

	$scope.password = '';

	//登录事件
	$scope.login = function() {
		
		if(!$rootScope.isOnline) {
			//无网络状态
			$cordovaToast.showShortBottom('无可用网络').then(function(success) {
				// success
			}, function(error) {
				// error
			});
			return true;
		}
		
		if($scope.Username.length && $scope.password.length) {

			$ionicLoading.show({
				template: 'Loading...'
			});

			$http.get("http://xxx/User_login.php?code=kinlee&uname=" + $scope.Username + "&pwd=" + $scope.password)
				.success(function(response) {
					//alert(JSON.stringify(response));
					var uid = response[0]["_loginok"];
					if(uid != 0) {

						var userObj = {};
						userObj.id = uid;
						userObj.name = response[0]["_uname"];
						userObj.sex = response[0]["_sex"];
						userObj.age = response[0]["_age"];
						userObj.height = response[0]["_height"];
						userObj.litpic = 'img/user.png';

						if(response[0]["_litpic"].length > 5) {
							//alert(response[0]["_litpic"]);
							$scope.downloadPic(response[0]["_litpic"], uid, userObj);
						} else {

							userArray.users.push(userObj);
							window.localStorage.userArray = JSON.stringify(userArray.users);
							$ionicLoading.hide();

							//alert(JSON.stringify(userArray.users));
							$ionicNavBarDelegate.back();
						}

					}else{
						$cordovaToast.showShortBottom('登录失败，用户名或秘密有误').then(function(success) {
							// success
						}, function(error) {
							// error
						});
						$ionicLoading.hide();
					}

				});

		} else {
			$cordovaToast.showShortBottom('请输入完整').then(function(success) {
				// success
			}, function(error) {
				// error
			});
		}

	}

	//$ionicNavBarDelegate.back();
	//头像下载
	$scope.downloadPic = function(url, uid, userObj) {
		
		if($rootScope.systemName==1){
			//ios
			var targetPath = cordova.file.dataDirectory + "userpic_" + uid + ".jpg";
		}else{
			//android
			var targetPath = cordova.file.externalApplicationStorageDirectory + "userpic_" + uid + ".jpg";
		}
		
		var urls = "http://xxx" + url;
		
		var trustHosts = true;
		var options = {};

		$cordovaFileTransfer.download(urls, targetPath, options, trustHosts)
			.then(function(result) {
				//alert("成功下载");
				//alert( JSON.stringify( result ) );

				//window.localStorage['Litpic' + uid] = result["nativeURL"];
				userObj.litpic = result["nativeURL"];
				userArray.users.push(userObj);
				window.localStorage.userArray = JSON.stringify(userArray.users);
				$ionicLoading.hide();
				//alert(JSON.stringify(userArray.users));
				$ionicNavBarDelegate.back();
			}, function(err) {
				// Error
				$ionicLoading.hide();
				//alert(JSON.stringify(err));
			}, function(progress) {
				
			});

	}

})