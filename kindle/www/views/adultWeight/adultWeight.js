angular.module('App')
	.controller('AdultWeightController', function($scope) {

		$scope.load = function() {

		}
		$scope.load();
		
		$scope.$on("$ionicView.beforeLeave", function(event, data){
		   // handle event
		   alert("State Params: ", data.stateParams);
		});
		
		$scope.$on("$ionicView.afterEnter", function(event, data){
		   // handle event
		   alert("$ionicView.afterEnter: ", data.stateParams);
		});
		
	});