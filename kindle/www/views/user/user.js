angular.module('App').controller('User', function($scope, userArray, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer, $rootScope, $ionicLoading, $cordovaToast) {

	var uid = window.localStorage.uid;

	$scope.edit = false;
	$scope.sex = $("#user_sex").html();

	$scope.name = window.localStorage.uname;

	$scope.height = window.localStorage.uheight;

	//$("#user_litpic").attr('src', window.localStorage.ulitpic);

	$scope.litpic = window.localStorage.ulitpic;

	//资料更改状态变化标示
	$scope.change = function() {
		$scope.edit = true;
		
	};

	//提交信息，更新信息资料
	$scope.save = function() {
		
		if(!$rootScope.isOnline) {
			//无网络状态
			$cordovaToast.showShortBottom('无可用网络').then(function(success) {
				// success
			}, function(error) {
				// error
			});
			return true;
		}
		if($scope.edit) {
			$ionicLoading.show({
				template: 'Loading...'
			});
			$scope.upload($scope.litpic);
		} else {
			
			$cordovaToast.showShortBottom('没有资料更改').then(function(success) {
				// success
			}, function(error) {
				// error
			});
		}
	}

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
				$scope.seleP(index);
				return true;
			}
		});

	};

	//图像选择
	$scope.seleP = function(type) {

		if(type == 0) {
			//相册
			var options = {
				saveToPhotoAlbum: true,
				quality: 70,
				targetWidth: 250,
				targetHeight: 250,
				allowEdit: true,
				sourceType: 2,
				destinationType: Camera.DestinationType.FILE_URI,
				EncodingType: 1
			};
		} else {
			//照相
			var options = {
				saveToPhotoAlbum: true,
				quality: 70,
				targetWidth: 250,
				targetHeight: 250,
				allowEdit: true
			}
		}

		$cordovaCamera.getPicture(options).then(function(imageURI) {
			$scope.edit = true;
			//$("#user_litpic").attr('src', imageURI);
			$scope.litpic = imageURI;
			//$scope.upload(imageURI);
		}, function(err) {
			// error
		});

	}

	$scope.upload = function(filePath) {

		var server = "http://api.3eat.net/kinleeb/user_modify.php";

		var options = new FileUploadOptions();
		options.fileKey = "upfile";

		var params = {};
		params.age = 18;
		params.height = $("#set_height").val();
		params.email = "test@qq.com";
		params.uid = uid;
		params.code = "kinlee";
		params.sex = $("#set_sex").val() == "Man" ? 0 : 1;

		options.params = params;

		var headers = {
			'headerParam': 'headerValue'
		};

		options.headers = headers;

		$cordovaFileTransfer.upload(server, filePath, options)
			.then(function(result) {
				// Success!
				//alert("Success");

				var data = JSON.parse(result["response"]);

				var id = data[0]['_modifyok'];
				if(id != 0) {
					$scope.downloadPic(data[0]['_litpic'], id);
				} else {

				}
			}, function(err) {
				// Error
				//alert(err);
				alert(JSON.stringify(err));
			}, function(progress) {
				// constant progress updates
				//alert(progress);
			});

	}

	//用户数组资料更新
	$scope.upArr = function(id) {

		var len = userArray.users.length;
		
		for(var i = 0; i < len; i++) {
			
			if(userArray.users[i]["id"] == id) {
				
				userArray.users[i]["sex"] = $("#set_sex").val() == "Man" ? 0 : 1;
				//userArray.users[i]["age"]
				userArray.users[i]["height"] = $("#set_height").val();
				userArray.users[i]["litpic"] = $scope.litpic;
				$("#user_sex").html($("#set_sex").val());
				$("#user_height").html(userArray.users[i]['height']);
				window.localStorage.uheight = userArray.users[i]["height"];
				

				window.localStorage.usex = userArray.users[i]["sex"];
				window.localStorage.ulitpic = $scope.litpic;
				window.localStorage.userArray = JSON.stringify(userArray.users);
				$ionicLoading.hide();
				break;
			}
		}

	}

	$scope.downloadPic = function(litpic, id) {
		var urls = "http://api.3eat.net/kinleeb" + litpic;
		var targetPath = cordova.file.externalApplicationStorageDirectory + "userpic_" + id + ".jpg";
		var trustHosts = true;
		var options = {};

		$cordovaFileTransfer.download(urls, targetPath, options, trustHosts)
			.then(function(result) {

				//alert(result["nativeURL"]);
				$scope.upArr(id);
			}, function(err) {
				// Error

				//alert(JSON.stringify(err));
			}, function(progress) {

			});

	};

})