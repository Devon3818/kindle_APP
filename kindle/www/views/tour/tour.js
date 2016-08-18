angular.module('App').controller('TourCtrl', function($scope, $location, userArray) {
	
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
	
	$scope.login2 = function( uid ) {
		
		var len = $scope.userList.length;
		for(var i=0; i<len; i++){
			if( $scope.userList[i]['id'] == uid ){
				alert($scope.userList[i]['id']);
				
				$("#user_litpic").attr('src',$scope.userList[i]['litpic']);
				$("#user_name").html($scope.userList[i]['name']);
				$("#user_sex").html($scope.userList[i]['sex']==0?"Man":"Woman");
				$("#user_height").html($scope.userList[i]['height']);
				
				
				break;
			}
		}
		
		//localStorage.setItem('firstVisit', '1');
		$location.url('/');
	}

});