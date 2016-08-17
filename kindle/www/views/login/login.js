angular.module('App').controller('LogCtrl', function($scope, $ionicNavBarDelegate, $http) {
	
	
//	var picker = new mui.PopPicker();
//  picker.setData([{value:'zz',text:'智子'}]);
//  picker.show(function (selectItems) {
//	   alert(selectItems[0].text);//智子
//	   alert(selectItems[0].value);//zz
//  })
	
	
	//注册事件
	$scope.register = function() {
		
		
		
		$http.get("http://api.3eat.net/kinleeb/user_reg.php?code=kinlee&height=170&age=20&sex=0&uname=bmi666&pwd=66666666")
			.success(function(response) {
				alert(response);
				alert(JSON.stringify(response));
			});

	}

	//$ionicNavBarDelegate.back();

})