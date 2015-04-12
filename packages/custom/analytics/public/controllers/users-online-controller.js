'use strict';
angular.module('mean.analytics').controller('UsersOnlineController', ['$scope', '$http', 'Global', 'Analytics',
  function ($scope, $http, Global, Analytics) {
    $scope.user_usage= function() {
      $scope.mask = $http({
        method: 'GET',
        url: '/acme/online?hell="gupta"',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description'}
      }).success(function (result) {
        console.log(result);
        if(result.length >0){
          $scope.totals_table=result || [];
          $scope.info_data=false;
        }else
        {
          $scope.info_data=true;
        }
      }).error(function (data, status, headers, config) {
        $scope.status_code = status;
        $scope.info_error = false;
        $scope.info_data = true;
      });
    };
    $scope.global = Global;
    $scope.package = {
      name: 'analytics'
    };
  }]);

