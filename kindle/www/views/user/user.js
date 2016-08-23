angular.module('App').controller('User', function($scope, userArray, $ionicActionSheet, $cordovaCamera, $cordovaFileTransfer) {

	var uid = window.localStorage.uid;

	$scope.sex = $("#user_sex").html();

	$scope.name = window.localStorage.uname;

	$scope.height = window.localStorage.uheight;

	$("#user_litpic").attr('src', window.localStorage.ulitpic);

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
			$("#user_litpic").attr('src', imageURI);
			$scope.upload(imageURI);
		}, function(err) {
			// error
		});

	}

	$scope.upload = function(filePath) {

		var server = "http://api.3eat.net/kinleeb/user_modify.php";

		alert(filePath.substr(filePath.lastIndexOf('/') + 1));
		var options = new FileUploadOptions();
		options.fileKey = "upfile";

		var params = {};
		params.age = 22;
		params.height = 158;
		params.email = "test@qq.com";
		params.uid = uid;
		params.code = "kinlee";
		params.sex = 0;

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
				alert(err);
				alert(JSON.stringify(err));
			}, function(progress) {
				// constant progress updates
				//alert(progress);
			});

	}

	$scope.downloadPic = function(litpic, id) {
		var urls = "http://api.3eat.net/kinleeb" + litpic;
		var targetPath = cordova.file.externalApplicationStorageDirectory + "userpic_" + id + ".jpg";
		var trustHosts = true;
		var options = {};

		$cordovaFileTransfer.download(urls, targetPath, options, trustHosts)
			.then(function(result) {

				alert(result["nativeURL"]);

			}, function(err) {
				// Error

				alert(JSON.stringify(err));
			}, function(progress) {

			});

	};

})