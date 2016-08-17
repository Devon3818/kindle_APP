angular.module('App').controller('TourCtrl', function($scope, $location, $ionicPopup, userArray) {
	
	//用户数组
	$scope.userList = userArray.users;
	
	//用户组是否存在用户，或是否超出最大用户数量（ 最多5个 ）
	$scope.isOver = $scope.userList.length > 0 ? true : false;
	
	//注册
	$scope.register = function() {

		//localStorage.setItem('firstVisit', '1');
		$location.url('/register');

	}
	
	//登录
	$scope.login = function() {

		//localStorage.setItem('firstVisit', '1');
		$location.url('/login');

	}
	
	$scope.login2 = function() {

		//localStorage.setItem('firstVisit', '1');
		$location.url('/');

		return true;

		$ionicPopup.prompt({
			title: 'Login',
			inputPlaceholder: 'Enter reservation code',
			okText: 'Login'
		}).then(function(code) {
			// Login with code
			localStorage.setItem('firstVisit', '1');
			$location.url('/');
		});
	}

});