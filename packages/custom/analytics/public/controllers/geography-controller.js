'use strict';
angular.module('mean.analytics').controller('GeographyController', ['$scope', '$http', 'Global', 'Analytics',
  function ($scope, $http, Global, Analytics) {

    $scope.start_date = moment().subtract('days',6).format('YYYY-MM-DD');
    $scope.end_date = moment().format('YYYY-MM-DD');
    $scope.info_data=false;
    $('#date_picker').daterangepicker(
      {
        startDate: moment().subtract('days', 6),
        endDate: moment(),
        format: 'DD/MM/YYYY',
        maxDate: moment(),
        ranges: {
          'Today':[moment()],
          'Last 7 Days': [moment().subtract('days', 6), moment()],
          '1 Month': [moment().subtract('month', 1), moment()],
          '3 Month': [moment().subtract('month', 3), moment()],
          'Year to Date':[moment().startOf('year'),moment()]
        }},
      function (start, end, label) {
        $scope.start_date = start.format('YYYY-MM-DD');
        $scope.end_date = end.format('YYYY-MM-DD');
        $scope.refresh_table();
        $scope.date_range = moment($scope.start_date).format('MMM DD, YYYY') + ' - ' + moment($scope.end_date).format('MMM DD, YYYY');
      }
    );

    $scope.refresh_table = function(){
      $scope.date_range = moment($scope.start_date).format('MMM DD, YYYY') + ' - ' + moment($scope.end_date).format('MMM DD, YYYY');
      $scope.tenant_usage($scope.start_date,$scope.end_date );
    };

    $scope.tenant_usage= function(start_date,end_date) {
      $scope.mask = $http({
        method: 'GET',
        url: '/acme/geography?from='+start_date+'&to='+end_date+'&tz=Asia/Calcutta',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description'}
      }).success(function (result) {
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
    $scope.refresh_table();
    $scope.global = Global;
    $scope.package = {
      name: 'analytics'
    };
  }]);
