angular.module('App').controller('UserListCtrl', function($scope, $ionicNavBarDelegate, userArray, $location, $ionicPopup) {

	var uid = window.localStorage.uid;

	$scope.shouldShowDelete = false;
	$scope.userArr = userArray.users;

	//$ionicViewService.clearHistory();

	$scope.edit = function() {
		$scope.shouldShowDelete = !$scope.shouldShowDelete
	}

	//用户切换
	$scope.myswitch = function(id) {

		if(id == uid) {
			var confirmPopup = $ionicPopup.alert({
				title: '用户提示',
				template: '当前用户已经登录'
			});
			return true;
		}

		var len = $scope.userArr.length;
		for(var i = 0; i < len; i++) {
			if($scope.userArr[i]['id'] == id) {

				window.localStorage.uid = id;
				window.localStorage.uheight = $scope.userArr[i]['height'];
				window.localStorage.uname = $scope.userArr[i]['name'];
				window.localStorage.usex = $scope.userArr[i]['sex'];

				$("#user_litpic").attr('src', $scope.userArr[i]['litpic']);
				$("#user_name").html($scope.userArr[i]['name']);
				$("#user_sex").html($scope.userArr[i]['sex'] == 0 ? "男" : "女");
				$("#user_height").html($scope.userArr[i]['height']);
				uid = window.localStorage.uid;
				var confirmPopup = $ionicPopup.alert({
					title: '用户提示',
					template: '切换成功，当前用户为 “' + $scope.userArr[i]['name'] + '”'
				});
				break;
			}
		}
	}

	// A confirm dialog
	$scope.showConfirm = function(id, type) {

		var len = $scope.userArr.length;
		var name = '';

		for(var i = 0; i < len; i++) {
			if($scope.userArr[i]["id"] == id) {
				name = $scope.userArr[i]["name"];
				break;
			}
		}

		if(type == 1) {
			//删除用户

			if($scope.shouldShowDelete) {
				//用来阻止事件的传播
				var confirmPopup = $ionicPopup.confirm({
					title: '用户提示',
					template: '你确定要删除 “' + name + '” 这个用户信息吗?'
				});

				confirmPopup.then(function(res) {
					if(res) {
						//console.log('You are sure');
						$scope.dele(id);
					} else {
						//console.log('You are not sure');
					}
				});

			}

		} else {
			//切换用户

			if(!$scope.shouldShowDelete) {

				//用来阻止事件的传播
				var confirmPopup2 = $ionicPopup.confirm({
					title: '用户提示',
					template: '你确定要切换到 “' + name + '” 这个用户吗?'
				});

				confirmPopup2.then(function(res) {
					if(res) {
						//console.log('You are sure');
						$scope.myswitch(id);
					} else {
						//console.log('You are not sure');
					}
				});
			}
		}

	};

	$scope.dele = function(id) {

		var len = $scope.userArr.length;

		for(var i = 0; i < len; i++) {
			if($scope.userArr[i]["id"] == id) {

				$scope.userArr.splice(i, 1);
				userArray.users = $scope.userArr;
				window.localStorage.userArray = JSON.stringify(userArray.users);
				if(id == uid) {

					$location.url('/tour');

					break;
				}

				break;
			}
		}

	}

})