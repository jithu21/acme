'use strict';

/* jshint -W098 */
angular.module('mean.analytics').controller('AnalyticsController', ['$scope', 'Global', 'Analytics',
  function($scope, Global, Analytics) {
    $scope.global = Global;
    $scope.package = {
      name: 'analytics'
    };
  }
]);
