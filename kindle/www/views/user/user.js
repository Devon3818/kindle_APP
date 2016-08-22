angular.module('App').controller('User', function($scope, userArray, $ionicActionSheet) {

	var uid = window.localStorage.uid;

	$scope.sex = $("#user_sex").html();

	$scope.name = window.localStorage.uname;

	$scope.height = window.localStorage.uheight;

	// Triggered on a button click, or some other target
	$scope.show = function() {

		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			buttons: [{
				text: '<i class="icon ion-images"></i> 相册'
			}, {
				text: '<i class="icon ion-camera"></i> 拍照'
			}],
			titleText: '更改头像',
			cancelText: '取消',
			cancel: function() {
				// add cancel code..
				hideSheet();
			},
			buttonClicked: function(index) {
				alert(index);
				return true;
			}
		});

	};

})