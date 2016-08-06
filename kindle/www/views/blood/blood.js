angular.module('App')
.controller('BloodController', function ($scope) {
  $scope.reservation = {
    checkin: new Date(),
    checkout: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    room: 156,
    rate: 121,
    wifi: 'resortwifi'
  };
  $scope.load = function(){
  	
  }
  $scope.load();
});
